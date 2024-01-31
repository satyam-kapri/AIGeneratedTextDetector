import React from 'react'
import '../css/center.css'
import robot from '../../aidet-images/friendly robot assistant waving.png'
import msgbox from '../../aidet-images/Ellipse 1.png'
import { useState } from 'react'
import axios from 'axios';
import Results from './results'
import { Backdrop } from '@mui/material'
import { CircularProgress } from '@mui/material'
function Center() {
  const [inputValue, setInputValue] = useState();
  const [result,setresult]=useState();
  const [loading,setloading]=useState(false);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
        setloading(true);
      const response = await axios.post('http://127.0.0.1:5000/getpredictions', {
        data: inputValue,
      });
     setresult(response.data);
     setloading(false);
     window.scrollTo({
        top: 750,
        left: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error('Error:', error);
      
    }
  };
  return (
    <>
    <div className='center'>
      <div className='inputarea'>
      <div className='heading'>
        <div className='heading-text'>
        <span> AI Generated Text Detection</span>
        <span>Distinguish between ai and human written text (Min. 100 words for correct prediction)</span>
        </div>
       
        <button className='predict-btn' onClick={handleSubmit}>Detect</button>
      </div>
      <textarea rows={10} cols={10} placeholder='Paste your text here' value={inputValue} onChange={handleInputChange} ></textarea>
      </div>
      <img src={robot} className='robot'></img>
      <img src={msgbox} className='msgbox'></img>
      <span className='msg'>Put your text in here!</span>
    </div>
 
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        Analyzing...
        <CircularProgress color="inherit" />
    </Backdrop>
    {result && <Results result={result}></Results>}
    </>
  )
}

export default Center
