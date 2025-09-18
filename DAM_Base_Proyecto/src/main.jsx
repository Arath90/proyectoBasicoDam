import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MyFunctions from './functions/MyFunctions.jsx'
import MyPromises from './functions/MyPromises.jsx'
import MyPromisesAll from './functions/MyPromisesAll'
import MyPromisesRace from './functions/MyPromisesRace.jsx'
import MyDataTypes from './methods/MyDataTypes.jsx'
import MyObjects from './methods/MyObjects' 
import { Contador } from './components/Contador.jsx'
import MyFetchBlob from 'MyFetchBlob.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <MyFunctions /> */}
    {/* <MyPromises /> */}
    {/* <MyPromisesAll /> */}
    {/* <MyPromisesRace /> */}
    {/* <MyDataTypes /> */}
    {/* <MyObjects /> */}
    {/* <Contador /> */}
    <MyFetchBlob>
      
  </StrictMode>,
)

