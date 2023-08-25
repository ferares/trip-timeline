'use client'

import { useEffect, useState } from 'react'

import Weather from '../types/weather'

async function getWeather(): Promise<Weather> {
  try {
    const response = await fetch('/weather')
    if ((response.status >= 300) || (response.status < 200)) throw response.statusText
    return await response.json()
  } catch (error) {
    return new Promise((_, reject) => reject(error))
  }
}

export default function Weather({ locationName }: { locationName: string }) {
  const [state, setState] = useState<{loading: boolean, weather: Weather | undefined}>({ loading: true, weather: undefined })

  useEffect(() => {
    getWeather().then((weather: Weather) => {
      setState({ loading: false, weather })
    }).catch(() => {
      setState({ loading: false, weather: undefined })
    })
  }, [])

  let content
  if (state.loading) {
    content = (
      <div className="spinner" role="status">
        <div className="spinner__component"></div>
        <div className="spinner__component"></div>
        <div className="spinner__component"></div>
        <div className="spinner__component"></div>
      </div>
    )
  } else if (state.weather) {
    content = (
      <>
        <span className="weather-data">
          <img className="weather-icon" src={state.weather.current.condition.icon} alt="" />
          <span>{state.weather.current.condition.text}</span>
        </span>
        <span className="weather-data">
          <b>Temperatura:</b>
          <span>
            {state.weather.current.temp_c}ºC
          </span>
        </span>
        <span className="weather-data">
          <b>Sensación térmica:</b>
          <span>
            {state.weather.current.feelslike_c}ºC
          </span>
        </span>
        <span className="weather-data">
          <b>Humedad:</b>
          <span>
            {state.weather.current.humidity}%
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