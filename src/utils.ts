import { Step } from '@prisma/client'

export function dateHasPassed(dateString: string) {
  const now = (new Date()).getTime()
  const date = Date.parse(dateString)
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
  let index
  for (index = 0; index < items.length; index++) {
    const item = items[index];
    if (!dateHasPassed(item.time)) break
  }
  return items[index > 0 ? index - 1 : index]
}

export function getNextStep(step: Step, steps: Step[]) {
  const index = steps.indexOf(step)
  if ((index > -1) && (index < steps.length - 1)) return steps[index + 1]
  return step
}