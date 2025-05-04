import React, { useState } from 'react'
import data_config from './data_config.json'

const Checkboxes = ({nodelist , checkboxObj ,setCheckboxObj})=>{

    const handleCheck = (e,node)=>{
        const id = e.target.id
        const isChecked = e.target.checked
        setCheckboxObj(prev=> {
           const newState= {...prev, [id]:isChecked}
          
           // recursively update children nodes of the parent node on the basis of check status
           function updateChildNode(node){
              if(node.children){

                   node.children.forEach((item)=>{
                       newState[item.id]=isChecked
                       updateChildNode(item)  
                    })
                }
           }
           updateChildNode(node)
            
           // if all children are checked mark the parent as checked
           // verify function : which check and return true if children checked or false if children are not checked
          // Now, a correct parent verification:
    function verifyParent(node, parent) {
        if (!parent) return;
        const allSiblingsChecked = parent.children.every(child => newState[child.id]);
        newState[parent.id] = allSiblingsChecked;
        verifyParent(parent, findParent(data_config, parent.id));
      }
  
      // Helper to find parent node
      function findParent(nodes, childId) {
        for (let node of nodes) {
          if (node.children && node.children.some(child => child.id === childId)) {
            return node;
          } else if (node.children) {
            const found = findParent(node.children, childId);
            if (found) return found;
          }
        }
        return null;
      }
  
      // Start verifying parents from the clicked node
      const parent = findParent(data_config, id);
      verifyParent(node, parent);
           
           return newState
        })

   }
   console.log(checkboxObj)

    return(
        <>
         {nodelist.map((node)=>(
             <div key={node.id} className='checkbox-div'>
                 <input 
                  type="checkbox" 
                  id={node.id}
                  checked={checkboxObj[node.id] || false}
                  onChange={(e)=>handleCheck(e ,node)}
                 />
                 <label htmlFor={node.id}>{node.label}</label>  
                 {node?.children && <Checkboxes nodelist ={node.children} checkboxObj={checkboxObj} setCheckboxObj={setCheckboxObj} />} 
            </div>
         ))}
        </>
    )
}


export default function App() {
    // const [nodelist ,setnodelist] = useState(data_config)
    
    const [checkboxObj ,setCheckboxObj] = useState({})

    

    return (
    <div>
        <div className='catergory-container'>
           <Checkboxes nodelist ={data_config} checkboxObj={checkboxObj} setCheckboxObj ={setCheckboxObj} />  

        </div>
    
    </div>
  )
}
