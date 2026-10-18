import { useState } from 'react';
import './App.css';
import GeneralInfo from './components/GeneralInfo';
import Education from './components/Education';
import Experience from './components/Experience';


function App() {
  const [generalInfo, setGeneralInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);

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
      <Education education={education} setEducation={setEducation} />
      <pre>{JSON.stringify(education, null, 2)}</pre>
      <Experience experience={experience} setExperience={setExperience} />
      <pre>{JSON.stringify(experience, null, 2)}</pre>
    </main>
  );
}




export default App;
