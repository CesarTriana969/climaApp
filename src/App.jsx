import axios from 'axios'
import { useEffect, useState } from 'react'
import WeatherCard from './components/WeatherCard'

function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [isCelsius, setIsCelsius] = useState(true)

  const success = (pos) => {
    const newCoords = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCoords(newCoords)
  }

  const newCallAPISearch = (cityName) => {
    const API_KEY = "3490453d873bc0d5958c3ac89d2e19ea"
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
    axios.get(URL)
      .then(res => setWeather(res.data))
      .catch(err => alert("Not found this place"))
  }

  const changeUnitTemperature = () => setIsCelsius(!isCelsius)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  useEffect(() => {
    if (coords) {
      const API_KEY = "3490453d873bc0d5958c3ac89d2e19ea"
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
      axios.get(URL)
        .then(res => {
          const tempKelvin = res.data.main.temp
          const tempCelsius = (tempKelvin - 273.15).toFixed(1)
          const tempFahrenheit = ((tempCelsius * 9 / 5) + 32).toFixed(1)

          const newTemperature = {
            celsius: tempCelsius,
            fahrenheit: tempFahrenheit
          }

          setTemperature(newTemperature)
          setWeather(res.data)
        })
        .catch(err => console.log(err))
    }
  }, [coords])

  return (
    <div className="App">
      {
        weather ? (
          <WeatherCard
            weather={weather}
            temperature={temperature}
            changeUnitTemperature={changeUnitTemperature}
            isCelsius={isCelsius}
            newCallAPISearch={newCallAPISearch}
          />
        ) : <p>Loading...</p>
      }
    </div>
  )
}

export default App
