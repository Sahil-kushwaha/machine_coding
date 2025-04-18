import React, { useState ,useRef, useEffect} from "react";

const App  = ()=>{

    const SIZE_OF_OTP = 5;
    const [inputVal, setInputVal] = useState(new Array(SIZE_OF_OTP).fill(""))
    const inputArrRef= useRef([]);
    
   // on first render focus on first input box
   useEffect(()=>{
      inputArrRef.current[0].focus()
   },[])

    const handleInputChange= (value,index)=>{
        // if value is not a number it return i.e do not change input state
        if(isNaN(value)){
          alert("Only number allowed")
          return;   
        }
        const newArr = [...inputVal]
        // i do trim so that space is being avoid and slice ensures only one last digit
        newArr[index] = value.trim().slice(-1);
        setInputVal(newArr);
        // when index is 4 (hence accessing element at 4+1 =5 out of bound where not input element found .focus throw error that why i use option chaining)
        inputArrRef.current[index+1]?.focus()
    }

    const handleKeyUP = (e,index)=>{
           if(e.key === "Backspace" ){
              inputArrRef.current[index-1]?.focus()
           }
    }

    return(
        <div >
            <div className="input-container">
                <h1>Validate OTP</h1>
                  {inputVal.map((number , index)=>(
                         <input 
                         className="input-box"
                         key={index}
                         type='text'
                         value={number}
                         ref={(inputNode)=>inputArrRef.current[index]=inputNode}
                         onChange={(e)=>handleInputChange(e.target.value,index)}
                         onKeyUp={(e)=>handleKeyUP(e,index)}
                         /> 
                  ))}
            </div>
        </div>
       
    )
}

export default App;