import React from "react";
const Profile = ({ formData, setFormData,error }) => {


    const handleChange = (e) => {
      const value = e.target.value;
      const input_name = e.target.name;
      setFormData((prev) => ({
        ...prev,
        [input_name]: value,
      }));
    };
    return (
      <div className="prfile-container">
        <div>
          <label>Name:</label> 
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) =>  handleChange(e)}
            required
          />
          <span className="error-box">{error.name}</span>
        </div>
        <div>
          <label>email:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange(e)}
            required
          />
         <span className="error-box">{error.email}</span>

        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={(e) => handleChange(e)}
          />
          <span className="error-box">{error.age}</span>
        </div>
      </div>
    );
  };
  
  export default Profile;
  