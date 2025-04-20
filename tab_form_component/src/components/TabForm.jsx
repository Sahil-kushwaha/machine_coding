
import React, { useState } from "react";
import Interest from "./Interest";
import Profile from "./Profile";
import Setting from "./Setting";

const TabForm = ()=>{

     // it hold the activeComponentIndex component of form section (tab) by index
  const [activeComponentIndex, setActiveComponentIndex] = useState(0);
  const [formData, setFormData] = useState({
      name: "",
      email: "",
      age: 0,
      interest: [],
      setting: "dark",
    });
  const [error ,setError] = useState({})
  // config for component which make scalable i.e we can add more component in future easly

  const tab = [
    {
      name: "profile",
      component: Profile,
      validate:()=>{
        const err ={}
        if(formData.name.length <2) 
            {
                err.name ="enter vaid name"
            }
        if(formData.age < 18 || formData.age > 90) {
                err.age="enter valid age"
            } 
        const emailRegix = /^[\w+%.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(!emailRegix.test(formData.email))
          {
             err.email="enter valid email"
               
          }
          setError(err)   
          return err.age || err.name || err.email ?  false : true
      }
    },
    {
      name: "interest",
      component: Interest,
      validate:()=>{
        const err ={}
        if(formData.interest.length == 0) 
            {
                err.interest ="atleat choose one"
            }
          setError(err)   
          return err.interest? false : true
      }
    },
    {
      name: "setting",
      component: Setting,
      validate:()=>{
          return true;
      }
    },
  ];
    
 

  const ActiveComponent = tab[activeComponentIndex].component;

 const handleNext = ()=>{
     if(tab[activeComponentIndex].validate())
       setActiveComponentIndex(prev=> prev=prev+1)
    }
 const handlePrev = ()=>{
    if(tab[activeComponentIndex].validate())
     setActiveComponentIndex(prev=> prev=prev-1)

 }


  return (
    <div className="App">
      <div className="form-container">
        <div className="tab-container">
          {tab.map((item, index) => (
            <div
              key={index}
              className="form-tab"
              onClick={() => {
                tab[activeComponentIndex].validate() && setActiveComponentIndex(index);
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div className="form-tab-body">
          <ActiveComponent formData={formData} setFormData={setFormData} error={error} />
          <div className="btn-container">
            {activeComponentIndex > 0 && <button onClick={handlePrev}>prev</button>}
            {activeComponentIndex < tab.length-1 && <button onClick={handleNext}>next</button>}
         </div>
        </div> 
        { activeComponentIndex == tab.length -1 && <button type="submit"> submit</button>}
      </div>
    </div>
  );

}

export default TabForm;