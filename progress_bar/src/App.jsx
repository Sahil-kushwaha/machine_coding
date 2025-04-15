import { useEffect, useState } from 'react'


function Progress ({progress}){
  const [controlProgress,setControlProgress] = useState(0)
 
  // it ensure firstly progress set 0 after mounting of component progress value set so transfromation will seen for transiton
  useEffect(()=>{
    
    setControlProgress(progress)


  },[progress])

return (
  <div className='outer-div'>
     <div className='inner-div' 
     style={{
      // width: `${progress}%`, 
     color:controlProgress<=4?"black":"white",
     transform: `translateX(${controlProgress-100}%)`
    }}
     >
        {`${controlProgress}%`}
     </div>
</div>
)

}

function App() { 

  return (
   <div>
      <Progress progress={40} />
   </div>
  )
}

export default App
