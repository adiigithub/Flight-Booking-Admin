import { useState, useEffect } from 'react';

const FlightList = ({ userId }) => {
  const [flights, setFlights] = useState([]);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/flights')
      .then(res => res.json())
      .then(data => setFlights(data));
  }, []);

  const searchFlights = () => {
    fetch(`http://localhost:5000/api/flights/search?origin=${origin}&destination=${destination}`)
      .then(res => res.json())
      .then(data => setFlights(data))
      .catch(() => alert('No flights found'));
  };

  const bookFlight = (flightId) => {
    fetch('http://localhost:5000/api/flights/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ flightId, userId })
    }).then(() => alert('Flight booked successfully'));
  };

  const cancelFlight = (flightId) => {
    fetch('http://localhost:5000/api/flights/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ flightId, userId })
    }).then(() => alert('Flight canceled successfully'));
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-8">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Search Flights</h2>
        <div className="flex justify-between mb-6">
          <input 
            type="text" 
            placeholder="Departure" 
            className="border border-gray-300 rounded-lg p-3 w-1/2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setOrigin(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Arrival" 
            className="border border-gray-300 rounded-lg p-3 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <button 
          className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg w-full hover:bg-blue-600 transition-colors"
          onClick={searchFlights}
        >
          Search Flights
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg mt-8 p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Available Flights</h2>
        <ul>
          {flights.map((flight) => (
            <li key={flight._id} className="border-b border-gray-200 py-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">{flight.airline} - {flight.flightNumber}</p>
                  <p className="text-gray-600">From: {flight.origin} &rarr; To: {flight.destination}</p>
                  <p className="text-gray-600">Seat:{flight.seatsAvailable}</p>
                  <p className="text-gray-600">Departure: {new Date(flight.departureTime).toLocaleString()}</p>
                  <p className="text-gray-600">price:{flight.price}</p>
                </div>
                <div className="flex items-center">
                  <button 
                    className="bg-green-500 text-white py-2 px-4 rounded-lg mr-2 hover:bg-green-600 transition-colors"
                    onClick={() => bookFlight(flight._id)}
                  >
                    Book
                  </button>
                  <button 
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                    onClick={() => cancelFlight(flight._id)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FlightList;
