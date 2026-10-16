export default function GeneralInfo({ generalInfo, handleChange }) {
  return (
    <section>
      <h2>General Information</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={generalInfo.name} onChange={handleChange} />
        <br />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={generalInfo.email} onChange={handleChange} />
        <br />
        <label htmlFor="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" value={generalInfo.phone} onChange={handleChange} />
      </form>
      <button type="submit">Submit</button>
    </section>
    
  );
}