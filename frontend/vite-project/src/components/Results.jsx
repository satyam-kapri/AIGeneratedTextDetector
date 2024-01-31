import React from 'react'
import CircularProgressWithLabel from './CircularProgressWithLabel';
import '../css/results.css'
import report from '../../aidet-images/paper page with pie chart and text.png'
function Results({result}) {
 
  return (
    <div className='resultouter'>
      <div className='analysisheading'><img src={report} style={{width:'100px'}}></img>&nbsp;Analysis</div>
    <div id='results'>
      <div>
       <span>* According to perplexity analysis </span>
      <div className='highlighted-text' dangerouslySetInnerHTML={{ __html: result.hightext }} >
      
      </div>
      </div>
      <div>
      <span>* According to model based predictions</span>
      <div className='predictions'>
        
        <span style={{fontSize:'2rem'}}>{result.probab>=60?"AI GENERATED":(result.probab<=45?"HUMAN GENERATED":"MIXTURE OF AI AND HUMAN")} </span>
        <div className='circularbar-outer'>
            <div style={{display:'flex',flexDirection:'column'}}>
            <CircularProgressWithLabel value={100-result.probab} c={'#68f102'}></CircularProgressWithLabel>
            <span>Likely Human</span>
            </div>
            <div style={{display:'flex',flexDirection:'column'}}>
            <CircularProgressWithLabel value={result.probab} c={'#ff9900'}></CircularProgressWithLabel>
            <span>Likely AI</span>
            </div>
        </div>
        <div>

        </div>
      </div>
      </div>
    </div>
    </div>
  )
}

export default Results
