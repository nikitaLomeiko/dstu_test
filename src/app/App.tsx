import { LayoutApp } from 'widgets/layouts/layout-app'
import { Routing } from './providers/routing'
import './styles/index.css'
import "bootstrap/dist/js/bootstrap.bundle.min.js";
function App() {
  return (
    <LayoutApp>
      <Routing/>
    </LayoutApp>
  )
}

export default App
