import React, { useEffect, useState } from 'react';
import './Style.css';

function Home() {
  const [inputSelector, setInputSelector] = useState('');
  const [wthrArray, setWthrArray] = useState([]);

  useEffect(() => {
    if (inputSelector !== '') {
      runFetch();
    }
  }, [inputSelector]);

  const selected = (e) => {
    setInputSelector(e.target.value);
  };

  const runFetch = async () => {
    try {
      const data = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=3def0588de354cfcbd4233340243011&q=${inputSelector}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const result = await data.json();
      console.log(result.forecast.forecastday[0].hour);
      setWthrArray(result.forecast.forecastday[0].hour); // Array of hourly data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <div className='page'>
        <select value={inputSelector} className='select' onChange={selected}>
          <option value="">Select Cities</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Aizwal">Aizwal</option>
          <option value="Nagpur">Nagpur</option>
          <option value="Pune">Pune</option>
        </select>
        <div className="mid">
        <div className="label">
          <ul>
            {wthrArray.map((value, index) => (
              index % 2 === 0 ?
              <>
                <li key={index}>
                  <span className="time">{value.time}</span>
                  <span className="temp">{value.feelslike_c}°C</span>
                  <br />
                  <img src={value.condition.icon} alt="weather icon" />
                </li>
              
              </>
              :
              <> 
              
              </>
               
            ))}
          </ul>
        </div>
      </div>
      </div>
    </>
  );
}

export default Home;
