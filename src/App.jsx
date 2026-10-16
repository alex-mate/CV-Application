import { useState } from 'react';
import './App.css';
import GeneralInfo from './components/GeneralInfo';


function App() {
  const [generalInfo, setGeneralInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGeneralInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value
    }));
  }
  return (
    <main>
      <h1>CV Application</h1>
      <GeneralInfo generalInfo={generalInfo} handleChange={handleChange} />
      <pre>{JSON.stringify(generalInfo, null, 2)}</pre>
    </main>
  );
}

export default App;
