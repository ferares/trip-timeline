import moment from 'moment-timezone'

import { Step } from '@prisma/client'

export function dateHasPassed(dateString: string) {
  const now = (new Date()).getTime()
  const date = Date.parse(dateString)
  return (date <= now)
}

export function getTimeInTimeZone(dateTimeString: string) {
  const timeZoneSign = dateTimeString.includes('+') ? 1 : -1
  const dateSplit = dateTimeString.split(timeZoneSign === 1 ? '+' : '-')
  const [timeZoneHours, timeZoneMinutes] = dateSplit[dateSplit.length - 1].split(':').map(Number)
  const timeZoneOffset = timeZoneSign * (timeZoneHours * 60 + timeZoneMinutes)
  const currentDate = new Date()
  let time = currentDate.getUTCHours() * 60 + currentDate.getUTCMinutes() + timeZoneOffset
  if (time < 0) time += 24 * 60
  const hours = Math.floor(time / 60)
  const minutes = time % 60
  const hoursString = `${hours > 9 ? '' : '0'}${hours}`
  const minutesString = `${minutes > 9 ? '' : '0'}${minutes}`
  return { hours: hoursString, minutes: minutesString }
}

export function timeZoneOffsetToString(timeZoneOffset: number) {
  const timeZoneSign = timeZoneOffset > 0 ? 1 : -1
  const hours = timeZoneSign * Math.floor(timeZoneOffset / 60)
  const minutes = timeZoneSign * timeZoneOffset % 60
  const hoursString = `${hours > 9 ? '' : '0'}${hours}`
  const minutesString = `${minutes > 9 ? '' : '0'}${minutes}`
  return `UTC${timeZoneOffset > 0 ? '-' : '+' }${hoursString}:${minutesString}`
}

export function dateToString(dateString: string, local: boolean = true) {
  moment.locale('es-uy')
  const dateTime = moment(dateString)
  if (local) return dateTime.format('MMM. D - HH:mm')
  return dateTime.parseZone().format('MMM. D - HH:mm')
}

export function getCurrentTimelineStep(items: Step[]) {
  let index
  for (index = 0; index < items.length; index++) {
    const item = items[index]
    if (!dateHasPassed(item.time)) break
  }
  return items[index > 0 ? index - 1 : index]
}

export function getNextStep(step: Step, steps: Step[]) {
  const index = steps.indexOf(step)
  if ((index > -1) && (index < steps.length - 1)) return steps[index + 1]
  return step
}