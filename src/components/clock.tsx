'use client'

import { useEffect, useState } from 'react'

import { getTimeInTimeZone } from '@/utils'

export default function Clock({ locationName, dateTimeString }: { locationName: string, dateTimeString: string }) {
  const [time, setTime] = useState(getTimeInTimeZone(dateTimeString))

  useEffect(() => {
    setTimeout(() => setTime(getTimeInTimeZone(dateTimeString)), 60 * 1000)
  })
  
  return (
    <div className="section section--time">
    <h2 className="section-title">
      La hora en {locationName}
    </h2>
    <span className="time-data">
      <span>{time.hours}</span>
      <span className="time-dots">:</span>
      <span>{time.minutes}</span>
    </span>
  </div>
  )
}