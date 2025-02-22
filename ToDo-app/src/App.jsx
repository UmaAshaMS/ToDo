import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ToDo from './Components/ToDo'

function App() {
  const [count, setCount] = useState(0)
  // const [val, setValue] = useState(1)


  return (
    <>
      <div>
        <ToDo/>
        
          {/* <input value = {val} onChange ={(e) => setValue(Number(e.target.value))}/>
         
      
        <p>{count}</p>
        <button onClick={() => setCount(val + count)}>Increment</button> */}
        
      </div>
    </>
  )
}

export default App
