
import logo from '../aidet-images/TextVision.ai.png'
import './App.css'
import Center from './components/Center'
import magnifier from '../aidet-images/magnifier with wooden handle.png'
import { Button } from '@mui/material'

function App() {
  

  return (
    <>
      <div className='navbar'><img src={logo} className='logo'></img>
      <img src={magnifier} className='magnifier'></img>
      <Button variant={'outlined'}sx={{position:'absolute',right:'4rem',top:'2rem',color:'orange',borderColor:'orange'}}>Developer</Button>
      </div>
      <Center></Center>
     
    </>
  )
}

export default App
