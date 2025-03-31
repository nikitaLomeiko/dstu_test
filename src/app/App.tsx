import { LayoutApp } from 'widgets/layouts/layout-app'
import { Routing } from './providers/routing'
import './styles/index.css'

function App() {
  return (
    <LayoutApp>
      <Routing/>
    </LayoutApp>
  )
}

export default App
