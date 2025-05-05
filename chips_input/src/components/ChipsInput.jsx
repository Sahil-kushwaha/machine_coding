import React, { useState } from "react";

function ChipsInput() {
  const [chips, setChips] = useState([])
  const [chipsInput ,setChipsInput] =useState('')

  const handleChips = (e,value) => { 
    const temp = value.trim()
    if(e.key=="Enter" && temp ){
      setChips((prev) => {
      return [...prev, temp]
     })
    }
   
  }

  const handleDelete = (item,index) => {
    setChips((prev) => {
       prev.splice(index,1);
       const temp = [...prev]
      return temp;
    })
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "40px 0" }}>
      <h2>Chips Input</h2>
      <input
        type="text"
        placeholder="Type a chip and press tag"
        style={{ padding: "8px", width: "200px" }}
        value={chipsInput}
        onChange={(e) => { setChipsInput(e.target.value) }}
        onKeyDown={(e)=>{handleChips(e,chipsInput)}}
        onFocus={()=>setChipsInput("")}
      />
      <div className = "chips-contianer">
        {chips.map((item,index) => (

          <span key={index}>
            {item}
            <span
              role="button"
              className="del-btn"
              onClick={() => handleDelete(item,index)}
            > X
            </span>
          </span>
          
        ))
       } 
      </div>
    </div>
  );
}

export default ChipsInput;