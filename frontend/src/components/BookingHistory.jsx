import { useState, useEffect } from 'react';

const BookingHistory = ({ userId }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/flights/${userId}/history`)
      .then(res => res.json())
      .then(data => setHistory(data));
  }, [userId]);

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-8">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Booking History</h2>
        <ul className="divide-y divide-gray-200">
          {history.length > 0 ? (
            history.map((flight) => (
              <li key={flight._id} className="py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold">{flight.airline} - {flight.flightNumber}</p>
                    <p className="text-gray-600">From: {flight.origin} &rarr; To: {flight.destination}</p>
                    <p className="text-gray-600">Seat:{flight.seatsAvailable}</p>
                    <p className="text-gray-600">Departure: {new Date(flight.departureTime).toLocaleString()}</p>
                    <p className="text-gray-600">price:{flight.price}</p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-center">No booking history available</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default BookingHistory;
