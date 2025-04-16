import React, { useEffect, useState } from "react";

const App = ()=>{

 const [results ,setResults] = useState([])
 const [input ,setInput] = useState("")
 const [showResult ,setShowResult] = useState(true);
 const [cache ,setCache] = useState({})
 

 const fecthData = async ()=>{
       if(cache[input]){
           console.log("CHACED DATA :"+input)
           setResults(cache[input])
           return;
       }
       try {
           const data = await fetch(`https://dummyjson.com/recipes/search?q=${input}`)
           const json = await data.json()
           setResults(json?.recipes)
           setCache((prev)=>{
              return {...prev ,[input]:json?.recipes}
           })
 
       } catch (error) {
            console.log(error.message)
       }
    }

 useEffect(()=>{

    let timer=setTimeout(()=>{
        fecthData()
    },300)
    
    return ()=>{clearTimeout(timer)} 

 },[input])

   return(
        <div className="">
            <h1>Auto completion search bar</h1>
            <input 
             className="search-box"
             type="text"
             value={input} 
             onChange={(e)=>(setInput(e.target.value))}
             onFocus={()=>(setShowResult(true))}
             onBlur={()=>(setShowResult(false))}
             />
            {showResult && <div className="result-container">
                 {results.map((r)=>(
                    <span key={r.id} className="result">
                       {r.name}
                    </span>
                 ))}
            </div>}
        </div>
    )
}

export default App;