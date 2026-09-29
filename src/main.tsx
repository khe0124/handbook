import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import WorkspaceApp from './workspace/WorkspaceApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WorkspaceApp />
  </StrictMode>,
)
