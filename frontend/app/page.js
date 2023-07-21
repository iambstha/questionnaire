"use client"
import LoginForm from '@/components/LoginForm';
import { useState } from 'react';

export default function Home() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');


  const fetchDataFromServer = async () => {
    try {
      const response = await axios.post('http://localhost/questionnaire/backend/fetchlogic/index.php');
      setData(response.data);
      console.log(response)
      setError('');
    } catch (error) {
      console.error('Error fetching data from server:', error);
      setError('An error occurred while fetching data.');
    }
  };

  return (
   <div>
    <h1>Questionnaire</h1>
    <div>
      <LoginForm />
    </div>
   </div>
  )
}
