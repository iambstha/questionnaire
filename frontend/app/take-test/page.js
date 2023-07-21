"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);

  const apiEndpointURL = 'http://localhost/questionnaire/backend/fetchlogic/fetchquestions.php';

  const fetchDataFromServer = async () => {
    try {
      const response = await axios.post(apiEndpointURL);
      setData(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching data from server:', error);
      setError('An error occurred while fetching data.');
    }
  };

  useEffect(() => {
    fetchDataFromServer();
  }, []);

  // Check for saved email in localStorage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem('loggedInEmail');
    if (storedEmail) {
      setEmail(storedEmail);
      setSuccess(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setSuccess(true);
    localStorage.setItem('loggedInEmail', email); // Store the email in localStorage
  };

  const handleLogout = () => {
    setSuccess(false);
    setEmail('');
    localStorage.removeItem('loggedInEmail'); // Clear the stored email in localStorage
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      // Collect the answers data from radio inputs
      const answersData = data.map((question) => {
        const selectedOption = document.querySelector(`input[name="option_for_${question.id}"]:checked`);
        return {
          question_id: question.id,
          answer: selectedOption ? selectedOption.value : null,
        };
      });

      // Send the form data to the backend
      const response = await axios.post('http://localhost/questionnaire/backend/submit.php', {
        id: id,
        name: name,
        email: email,
        answers: JSON.stringify(answersData), // Serialize answers data as JSON string
      });

      if (response.data.success) {
        handleLoginSuccess();
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      setError('An error occurred while submitting data.');
    }
  };

  return (
    <div>
      <div className='flex justify-center items-center w-full'>
        {success && (
          <div  className='flex flex-col gap-2 w-full border justify-center items-center'>
            <h1>Hello {email}</h1>
            <form action="" method="post" className='w-3/4' onSubmit={handleSubmit}>
              {data.map((question) => (
                <div key={question.id} className='border p-4'>
                  <p className='text-lg text-slate-950'>{question.question_text}</p>
                  <div className='p-2'>
                    <input type="radio" name={`option_for_${question.id}`} id={`option_for_${question.id}_1`} className='mr-4' value={question.option1} />
                    <label htmlFor={`option_for_${question.id}_1`} className='text-lg text-slate-600'>{question.option1}</label>
                  </div>
                  <div className='p-2'>
                    <input type="radio" name={`option_for_${question.id}`} id={`option_for_${question.id}_2`} className='mr-4' value={question.option2} />
                    <label htmlFor={`option_for_${question.id}_2`} className='text-lg text-slate-600'>{question.option2}</label>
                  </div>
                  <div className='p-2'>
                    <input type="radio" name={`option_for_${question.id}`} id={`option_for_${question.id}_3`} className='mr-4' value={question.option3} />
                    <label htmlFor={`option_for_${question.id}_3`} className='text-lg text-slate-600'>{question.option3}</label>
                  </div>
                  <div className='p-2'>
                    <input type="radio" name={`option_for_${question.id}`} id={`option_for_${question.id}_4`} className='mr-4' value={question.option4} />
                    <label htmlFor={`option_for_${question.id}_4`} className='text-lg text-slate-600'>{question.option4}</label>
                  </div>
                </div>
              ))}
              <button type="submit" className='py-2 px-4 mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded'>
                Submit Answers
              </button>
            </form>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
