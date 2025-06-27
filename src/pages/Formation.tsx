
import React, { Suspense } from 'react';
import { PageLoader } from '@/components/common/PageLoader';
import { usePagePerformance } from '@/hooks/usePagePerformance';

// Lazy load de tous les composants
const LandingHeader = React.lazy(() => 
  import('@/components/landing/LandingHeader').then(module => ({ default: module.LandingHeader }))
);
const LandingFooter = React.lazy(() => 
  import('@/components/landing/LandingFooter')
);
const FormationHero = React.lazy(() => 
  import('@/components/formation/FormationHero').then(module => ({ default: module.FormationHero }))
);
const FormationCourses = React.lazy(() => 
  import('@/components/formation/FormationCourses').then(module => ({ default: module.FormationCourses }))
);
const FormationMethods = React.lazy(() => 
  import('@/components/formation/FormationMethods').then(module => ({ default: module.FormationMethods }))
);
const FormationCTA = React.lazy(() => 
  import('@/components/formation/FormationCTA').then(module => ({ default: module.FormationCTA }))
);

const Formation = React.memo(() => {
  const { measureOperation } = usePagePerformance('Formation');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <Suspense fallback={<PageLoader type="skeleton" rows={1} />}>
        <LandingHeader />
      </Suspense>
      
      <Suspense fallback={<PageLoader type="skeleton" rows={3} />}>
        <FormationHero />
      </Suspense>
      
      <Suspense fallback={<PageLoader type="skeleton" rows={4} />}>
        <FormationCourses />
      </Suspense>
      
      <Suspense fallback={<PageLoader type="skeleton" rows={3} />}>
        <FormationMethods />
      </Suspense>
      
      <Suspense fallback={<PageLoader type="skeleton" rows={2} />}>
        <FormationCTA />
      </Suspense>
      
      <Suspense fallback={<PageLoader type="skeleton" rows={2} />}>
        <LandingFooter />
      </Suspense>
    </div>
  );
});

Formation.displayName = 'Formation';
export default Formation;
