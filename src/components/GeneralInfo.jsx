import { useState } from 'react';


export default function GeneralInfo({ generalInfo, handleChange }) {
    const [isEditing, setIsEditing] = useState(true);

    function handleEdit() {
      
        setIsEditing(!isEditing);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsEditing(false);
    }
  return (
    <>
        <h2>General Information</h2>
        {isEditing ? (
  <form onSubmit={handleSubmit}>
    <label htmlFor="name">Name:</label>
    <input
      type="text"
      id="name"
      name="name"
      value={generalInfo.name}
      onChange={handleChange}
    />

    <label htmlFor="email">Email:</label>
    <input
      type="email"
      id="email"
      name="email"
      value={generalInfo.email}
      onChange={handleChange}
    />

    <label htmlFor="phone">Phone:</label>
    <input
      type="tel"
      id="phone"
      name="phone"
      value={generalInfo.phone}
      onChange={handleChange}
    />
    <button type="submit">Submit</button>
  </form>
) : (
  <div>
    <p>Name: {generalInfo.name}</p>
    <p>Email: {generalInfo.email}</p>
    <p>Phone: {generalInfo.phone}</p>

    <button onClick={() => setIsEditing(true)}>
      Edit
    </button>
  </div>
)}
  
    </>
     
      
    
  );
}