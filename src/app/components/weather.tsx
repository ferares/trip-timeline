'use client'

import { useState } from 'react'

import Weather from '../types/weather'

async function getWeather() {
  const response = await fetch('/weather')
  return await response.json()
}

export default function Weather({ locationName }: { locationName: string }) {
  const [loading, setLoading] = useState(true)
  const [weather, setWeather] = useState<Weather | undefined>(undefined)

  getWeather().then((weather: Weather) => {
    setLoading(false)
    setWeather(weather)
  })

  let content
  if (loading) {
    content = (
      <div className="spinner" role="status">
        <div className="spinner__component"></div>
        <div className="spinner__component"></div>
        <div className="spinner__component"></div>
        <div className="spinner__component"></div>
      </div>
    )
  } else if (weather) {
    content = (
      <>
        <span className="weather-data">
          <img className="weather-icon" src={weather.current.condition.icon} alt="" />
          <span>{weather.current.condition.text}</span>
        </span>
        <span className="weather-data">
          <b>Temperatura:</b>
          <span>
            {weather.current.temp_c}ºC
          </span>
        </span>
        <span className="weather-data">
          <b>Sensación térmica:</b>
          <span>
            {weather.current.feelslike_c}ºC
          </span>
        </span>
        <span className="weather-data">
          <b>Humedad:</b>
          <span>
            {weather.current.humidity}%
          </span>
        </span>
      </>
    )
  } else {
    content = 'No disponible'
  }

  return (
    <div className="section section--weather">
      <h2 className="section-title">
        El tiempo en {locationName}
      </h2>
      {content}
    </div>
  )
}