import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const redirect = sessionStorage.getItem('spa:redirect')
if (redirect) {
  sessionStorage.removeItem('spa:redirect')
  window.history.replaceState(null, '', import.meta.env.BASE_URL + redirect.replace(/^\//, ''))
}

createRoot(document.getElementById('root')!).render(<App />)
