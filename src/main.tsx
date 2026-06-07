import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'katex/dist/katex.min.css'
import MathEdu from '../MathEdu'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MathEdu />
  </StrictMode>,
)
