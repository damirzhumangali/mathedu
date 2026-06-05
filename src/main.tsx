import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MathEdu from '../MathEdu'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MathEdu />
  </StrictMode>,
)
