import React from "react";
const Interest = ({ formData, setFormData ,error}) => {

    const handleChange = (e) => {
      const isCheck = e.target.checked;
      const input_name = e.target.name;
      
      setFormData((prev) => {
          const interestUpdateValue = isCheck?[...prev.interest,input_name]:prev.interest.filter(i=>i!=input_name);
        return {
        ...prev,
        interest: [...interestUpdateValue],
      }});
    };
    return (
      <div className="interest-container">
        <span className="error-box">{error.interest}</span>
        <div>
          <label>Coding:</label>
          <input
            type="checkbox"
            name="coding"
            checked={formData.interest.some((item)=>item==="coding")}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div>
          <label>Design:</label>
          <input
            type="checkbox"
            name="design"
            checked={formData.interest.some((item)=>item==="design")}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div>
          <label>Marketing:</label>
          <input
            type="checkbox"
            name="marketing"
            checked={formData.interest.some((item)=>item==="marketing")}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
      </div>
    );
  };
  
  export default Interest;
  