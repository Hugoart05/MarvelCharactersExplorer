
import './App.css'

import Header from './components/Header'
import { Outlet } from 'react-router-dom'



//configurando rotas do app


function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
      
      <Outlet/>
   </div>
  )
}

export default App
