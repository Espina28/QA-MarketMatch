import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);


    if (countdown === 0) {
      navigate('/');
    }


    return () => clearInterval(timer);
  }, [countdown, navigate]);


  const handleGoBack = () => {
    navigate('/home');
  };

  return (
    <div style={{ backgroundColor: '#7b0000', color: '#fff', textAlign: 'center', padding: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>Redirecting to the home page in {countdown} seconds...</p>
      <button
        onClick={handleGoBack}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          color: '#fff',
          backgroundColor: '#c9a600',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Go Back to Home
      </button>
    </div>
  );
}

export default NotFound;
