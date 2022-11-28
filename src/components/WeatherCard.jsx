import React, { useState } from 'react'

const WeatherCard = ({ weather, temperature, isCelsius, changeUnitTemperature, newCallAPISearch }) => {

  const [place, setPlace] = useState("")

  const handleChangePlace = (e) => {
    setPlace(e.target.value)
  }

  return (
    <article className="weatherCard">
      <h1 className="title">Weather App</h1>
      <h3 className="subTitle">{weather.name},{weather.sys.country}</h3>
      <section className="weatherCard-body">
        <div className="img-animation">
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />
        </div>
        <ul className="data">
          <li><strong>{weather.weather[0].description}</strong></li>
          <li><strong>Wind speed:</strong> {weather.wind.speed} m/s</li>
          <li><strong>Clouds:</strong> {weather.clouds.all} %</li>
          <li><strong>Pressure:</strong> {weather.main.pressure} hPa</li>
        </ul>
      </section>
      <p>{isCelsius ? `${temperature.celsius} °C` : `${temperature.fahrenheit} °F`}</p>
      <button className="weatherCard-button" onClick={changeUnitTemperature}>Degrees °F/°C</button>

      <section className='weatherCard-footer'>
        <input className='search'
          type="text"
          value={place}
          onChange={handleChangePlace}
        />
        <button className='weatherCard-footer_button' onClick={() => newCallAPISearch(place)}>Search</button>
      </section>
    </article>
  )
}

export default WeatherCard