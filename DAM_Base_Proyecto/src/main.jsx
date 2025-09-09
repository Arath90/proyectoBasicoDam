import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
// import MyFunctions from './functions/MyFunctions.jsx'
// import MyPromises from './functions/MyPromises.jsx'
import MyPromisesAll from './functions/MyPromisesAll'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <MyFunctions /> */}
    {/* <MyPromises /> */}
    <MyPromisesAll />
  </StrictMode>,
)

