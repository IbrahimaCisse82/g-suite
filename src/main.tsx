
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { enableMapSet } from 'immer'

// Initialiser le plugin MapSet pour Immer après l'import de React
enableMapSet()

createRoot(document.getElementById("root")!).render(<App />);
