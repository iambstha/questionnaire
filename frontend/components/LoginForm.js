import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Check for saved email in localStorage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem('loggedInEmail');
    if (storedEmail) {
      setEmail(storedEmail);
      setSuccess(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    }
    if (name === 'email') {
      setEmail(value);
    }
  };

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
      const response = await axios.post(
        'http://localhost/questionnaire/backend/fetchlogic/login.php',
        {
          name: name,
          email: email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        handleLoginSuccess();
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      setError('An error occurred while fetching data.');
    }
  };

  return (
    <div className='flex justify-center items-center w-full'>
      <div className='flex flex-col gap-2 w-1/2'>
        {success && (
          <div>
            <p>Welcome, {name}!</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
        {!success && (
          <form action='' method='post' onSubmit={handleSubmit}>
            {error && <p className='text-red-600'>{error}</p>}
            <label htmlFor='name'>Full Name</label>
            <input
              type='text'
              name='name'
              className='border p-2 rounded outline-none border-slate-600'
              value={name}
              onChange={handleChange}
            />

            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              name='email'
              className='border p-2 rounded outline-none border-slate-600'
              value={email}
              onChange={handleChange}
            />

            <input
              type='submit'
              value='Submit'
              name='submit'
              className='border border-blue-600 bg-blue-600 p-2 px-4 text-white rounded-md'
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
