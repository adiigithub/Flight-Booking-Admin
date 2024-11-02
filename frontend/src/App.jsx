import { useState } from 'react';
import BookingHistory from './components/BookingHistory';
import FlightList from './components/FlightList';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [userId, setUserId] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="container mx-auto">
      {!userId ? (
        isLogin ? (
          <>
            <Login setUserId={setUserId} />
            <p className="text-center mt-4">
              Don't have an account?{' '}
              <button
                className="text-blue-500"
                onClick={() => setIsLogin(false)}
              >
                Register here
              </button>
            </p>
          </>
        ) : (
          <>
            <Register />
            <p className="text-center mt-4">
              Already have an account?{' '}
              <button
                className="text-blue-500"
                onClick={() => setIsLogin(true)}
              >
                Login here
              </button>
            </p>
          </>
        )
      ) : (
        <>
          <FlightList userId={userId} />
          <BookingHistory userId={userId} />
        </>
      )}
    </div>
  );
}

export default App;
