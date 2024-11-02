import { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    fetch('http://localhost:5000/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.message === 'User registered successfully') {
        setMessage('Registration successful! Please log in.');
      } else {
        setMessage(data.message || 'Error registering user');
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>
        <input
          type="text"
          placeholder="Name"
          className="border border-gray-300 rounded-lg p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-lg p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded-lg p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="border border-gray-300 rounded-lg p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white font-semibold p-3 rounded-lg w-full hover:bg-blue-600 transition-colors"
          onClick={handleRegister}
        >
          Register
        </button>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
