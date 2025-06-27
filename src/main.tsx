
import { createRoot } from 'react-dom/client'
import { enableMapSet } from 'immer'
import App from './App.tsx'
import './index.css'

// Activer le plugin MapSet pour Immer avant le rendu
enableMapSet()

createRoot(document.getElementById("root")!).render(<App />);
