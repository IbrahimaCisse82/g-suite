
import { useEffect, useRef, useState, useCallback } from 'react';

interface IntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
  triggerOnce?: boolean;
}

export function useIntersectionObserver({
  threshold = 0,
  rootMargin = '0px',
  root = null,
  triggerOnce = false
}: IntersectionObserverOptions = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setRef = useCallback((node: HTMLElement | null) => {
    if (targetRef.current && observerRef.current) {
      observerRef.current.unobserve(targetRef.current);
    }

    targetRef.current = node;

    if (node && observerRef.current) {
      observerRef.current.observe(node);
    }
  }, []);

  useEffect(() => {
    if (!window.IntersectionObserver) {
      // Fallback for browsers that don't support IntersectionObserver
      setIsIntersecting(true);
      setHasIntersected(true);
      return;
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        const isCurrentlyIntersecting = entry.isIntersecting;
        
        if (isCurrentlyIntersecting) {
          setHasIntersected(true);
        }

        if (triggerOnce && hasIntersected) {
          return;
        }

        setIsIntersecting(isCurrentlyIntersecting);
      },
      {
        threshold,
        rootMargin,
        root
      }
    );

    if (targetRef.current) {
      observerRef.current.observe(targetRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, root, triggerOnce, hasIntersected]);

  return [setRef, isIntersecting, hasIntersected] as const;
}

export function useIntersectionObserverMultiple({
  threshold = 0,
  rootMargin = '0px',
  root = null
}: Omit<IntersectionObserverOptions, 'triggerOnce'> = {}) {
  const [intersections, setIntersections] = useState<Map<Element, boolean>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<Set<Element>>(new Set());

  const observe = useCallback((element: Element) => {
    if (!element || elementsRef.current.has(element)) return;

    elementsRef.current.add(element);
    
    if (observerRef.current) {
      observerRef.current.observe(element);
    }
  }, []);

  const unobserve = useCallback((element: Element) => {
    if (!element || !elementsRef.current.has(element)) return;

    elementsRef.current.delete(element);
    setIntersections(prev => {
      const next = new Map(prev);
      next.delete(element);
      return next;
    });

    if (observerRef.current) {
      observerRef.current.unobserve(element);
    }
  }, []);

  useEffect(() => {
    if (!window.IntersectionObserver) {
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        setIntersections(prev => {
          const next = new Map(prev);
          entries.forEach(entry => {
            next.set(entry.target, entry.isIntersecting);
          });
          return next;
        });
      },
      {
        threshold,
        rootMargin,
        root
      }
    );

    // Observe existing elements
    elementsRef.current.forEach(element => {
      observerRef.current?.observe(element);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, root]);

  return {
    observe,
    unobserve,
    intersections
  };
}
