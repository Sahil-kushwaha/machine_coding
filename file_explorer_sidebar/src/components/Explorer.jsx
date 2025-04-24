import React, { useState } from 'react'
import { BsFolderPlus  } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiFilePlus } from "react-icons/fi";
import explorer_data from '../explorerData.json'

//nested file/folder structure (hint: recursion)
// expand and collapse button for folder
const List = ({explorer ,handleAddNode,handleDeleteNode})=>{

  const [isExpanded ,setIsExpanded] =useState({})
  

  const handleExpandButton=(nodeName)=>{
  
    setIsExpanded(prev=>{
      return{
         ...prev,
          [nodeName]:!prev[nodeName]
      }
    })
}
     
  return(
      <div className='explorer-container'>
        {explorer.map((node)=>{
           return (
              
                <div key={node.id} className='node'>
                    {node?.isFolder && <span onClick={()=>{handleExpandButton(node.name)}}>{isExpanded[node.name]?"-":"+"}&nbsp;</span>}
                    <span>{node.name}</span>
                    {node?.isFolder && <span onClick={()=>{handleAddNode(node.id,true)}}> <BsFolderPlus /> </span> }
                    {node?.isFolder && <span onClick={()=>{handleAddNode(node.id ,false)}}> <FiFilePlus /></span> }
                     <span onClick={()=>{handleDeleteNode(node.id)}}> <RiDeleteBin6Line /></span> 
                    {(node?.children && isExpanded[node.name]) && <List explorer={node.children} handleAddNode={handleAddNode} handleDeleteNode={handleDeleteNode}/>}
                </div>
          )
        })}
      </div>
  )
}


export default function Explorer() {
  
     const [explorer ,setExplorer] = useState(explorer_data)
     
     function handleAddNode(nodeId ,nodeType){
       const nodeName = prompt(`Enter ${nodeType?"folder":"file"} name`)
        // nodesList => list of trees (one folder/file represent one tree in explorer)
        const updateexplorer = (nodesList)=>{
        // map iterate through all the trees node
        const ans = nodesList.map((node)=>{
              // modify the node (an object )
              if(node.id===nodeId){
                 return {...node ,children:[...node.children ,{id:Date.now().toString() ,name:nodeName,isFolder:nodeType ,children:[]} ]}
              }
              // now search in children node recursively
              if(node.children){
                  console.log("inside children")
                  console.log(node.children)
                  return {...node ,children:updateexplorer(node.children)}
                
              }
              return node
            })

        return ans;
     }

    setExplorer(prev => updateexplorer(prev))
}

  const handleDeleteNode =(nodeId) =>{
            
         function updateexplorer(nodeList){
               return nodeList
               .filter((node)=>node.id!=nodeId)
               .map(node=>{
                 if(node.children){
                    return {...node , children:updateexplorer(node.children)}
                 }    
                 return node;
               }) 
         }
         setExplorer((prev)=>updateexplorer(prev))
  }

  return (
    <div>
        <h1 style={{"textAlign":"center" }}>File/Folder Explorer</h1>
        <List explorer={explorer} handleAddNode={handleAddNode} handleDeleteNode={handleDeleteNode} />
    </div>

  )
}
