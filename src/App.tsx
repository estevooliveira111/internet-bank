import './styles/index.css'
import { CustomerProvider } from './context/customer'
import { Application } from './Application'

export function App() {
  return (
    <>
      <CustomerProvider>
        <Application />
      </CustomerProvider>
    </>
  )
}
