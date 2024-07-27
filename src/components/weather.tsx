'use client'

import Image from 'next/image'

import { useEffect, useState } from 'react'

import WeatherType from '../types/weather'

async function getWeather(tripId: number): Promise<WeatherType> {
  try {
    const response = await fetch(`/api/weather/${tripId}`)
    if ((response.status >= 300) || (response.status < 200)) throw response.statusText
    return await response.json()
  } catch (error) {
    return new Promise((_, reject) => reject(error))
  }
}

export default function Weather({ locationName, tripId }: { locationName: string, tripId: number }) {
  const [state, setState] = useState<{loading: boolean, weather: WeatherType | undefined}>({ loading: true, weather: undefined })

  useEffect(() => {
    getWeather(tripId).then((weather: WeatherType) => {
      setState({ loading: false, weather })
    }).catch(() => {
      setState({ loading: false, weather: undefined })
    })
  }, [tripId])

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
          <Image className="weather-icon" width={96} height={96} src={`https:${state.weather.current.condition.icon}`} alt="" />
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