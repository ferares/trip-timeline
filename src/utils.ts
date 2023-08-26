import { Step } from '@prisma/client'

export function dateHasPassed(dateString: string) {
  const now = new Date()
  const date = new Date(dateString)
  return (date <= now)
}

export function dateToString(dateString: string) {
  const months = ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.']
  const dateTime = new Date(dateString)
  const month = months[dateTime.getMonth()]
  const date = dateTime.getDate()
  const hours = dateTime.getHours() < 10 ? `0${dateTime.getHours()}` : dateTime.getHours()
  const minutes = dateTime.getMinutes() < 10 ? `0${dateTime.getMinutes()}` : dateTime.getMinutes()
  return `${month} ${date} - ${hours}:${minutes}`
}

export function getCurrentTimelineStep(items: Step[]) {
  let currentIndex = -1
  for (const item of items) {
    currentIndex++
    if (!dateHasPassed(item.time)) break
  }
  return items[currentIndex]
}