import React from "react";
const Setting = ({formData ,setFormData}) => {
      console.log(formData)
    const handleChange = (e)=>{
             setFormData((prev)=>(
                  {
                    ...prev,
                    setting:e.target.value
                  }
             ))
    }
    return (
      <div className="Setting-container">
        <div>
          <label>Dark</label>
          <input 
           type="radio" 
           name="theme"
           value="dark"
           checked={formData.setting==="dark"}
           onChange={(e)=>{handleChange(e)}}
           />
        </div>
        <div>
          <label>light</label>
          <input 
           type="radio" 
           name="theme"
           value="light"
           checked={formData.setting==="light"}
           onChange={(e)=>{handleChange(e)}} 
         />
        </div>
      </div>
    );
  };
  
  export default Setting;
  