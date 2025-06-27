
import { createRoot } from 'react-dom/client'
import { enableMapSet } from 'immer'
import App from './App.tsx'
import './index.css'

// Initialiser le plugin MapSet pour Immer
enableMapSet()

createRoot(document.getElementById("root")!).render(<App />);
