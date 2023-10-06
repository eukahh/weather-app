import React from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const inputValue = (event.target as HTMLInputElement).value;

      if (!inputValue || inputValue.length === 0) {
        alert("Enter a city's name");
        return;
      }

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=`
        );

        const weather = response.data;

        const cityElement = document.querySelector("#city");
        const dateElement = document.querySelector("#date");
        const tempElement = document.querySelector("#temp");
        const weatherElement = document.querySelector("#weather");
        const minMaxElement = document.querySelector("#min-max");

        if (cityElement) cityElement.innerHTML = `${weather.name}, ${weather.sys.country}`;
        if (dateElement) {
          const dataAtual = new Date();
          const horaLocal = new Date(dataAtual.getTime() + weather.timezone * 1000);
          const offset = horaLocal.getTimezoneOffset() / 60;
          const horaLocalAjustada = new Date(horaLocal.getTime() + offset * 60 * 60 * 1000);
          dateElement.innerHTML = `${horaLocalAjustada.toLocaleTimeString("en-US", {
            hour: '2-digit',
            minute: '2-digit',
            weekday: 'long',
            day: 'numeric',
          })}`;
        }
        if (tempElement) tempElement.innerHTML = `${Math.round(weather.main.temp)} Cº`;
        if (weatherElement) weatherElement.innerHTML = weather.weather[0].main;
        if (minMaxElement)
          minMaxElement.innerHTML = `Min ${Math.round(weather.main.temp_min)} Cº / Max ${Math.round(
            weather.main.temp_max
          )} Cº`;
      } catch (error) {
        alert("City not found");
      }
    }
  };

  return (
    <>
      <div className='section'>
        <input
          type='text'
          id='search-bar'
          onKeyDown={handleKeyDown}
          placeholder='Enter a city'
        ></input>
        <div className='info'>
          <h3 id='city'></h3>
          <h3 id='date'></h3>
          <h3 id='temp'></h3>
          <h3 id='weather'></h3>
          <h3 id='min-max'></h3>
        </div>
      </div>
    </>
  );
}

export default App;
