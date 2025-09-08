import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
// import MyFunctions from './functions/MyFunctions.jsx'
import MyPromises from './functions/MyPromises.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <MyFunctions /> */}
    <MyPromises />
  </StrictMode>,
)

