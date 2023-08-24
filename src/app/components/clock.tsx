'use client'

import { useEffect, useState } from 'react'

function getTime(dateTimeString: string) {
  const timeZoneSign = dateTimeString.includes('+') ? 1 : -1
  const dateSplit = dateTimeString.split(timeZoneSign === 1 ? '+' : '-')
  const [timeZoneHours, timeZoneMinutes] = dateSplit[dateSplit.length - 1].split(':').map(Number)
  const timeZoneOffset = timeZoneSign * (timeZoneHours * 60 + timeZoneMinutes) 
  const currentDate = new Date()
  let time = (currentDate.getUTCHours() * 60 + currentDate.getUTCMinutes()) + timeZoneOffset
  if (time < 0) time += 24 * 60
  const hours = Math.floor(time / 60)
  const minutes = time % 60
  const hoursString = `${hours > 9 ? '' : '0'}${hours}`
  const minutesString = `${minutes > 9 ? '' : '0'}${minutes}`
  return { hours: hoursString, minutes: minutesString }
}

export default function Clock({ locationName, dateTimeString }: { locationName: string, dateTimeString: string }) {
  const [time, setTime] = useState(getTime(dateTimeString))

  useEffect(() => {
    setTimeout(() => setTime(getTime(dateTimeString)), 60 * 1000)
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