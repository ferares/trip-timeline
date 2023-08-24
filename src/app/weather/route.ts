import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

import { getCurrentTimelineItem } from '@/utils'

import Weather from '../types/weather'

const prisma = new PrismaClient()

async function getWeather(location: string): Promise<Weather> {
  const queryParams = new URLSearchParams()
  queryParams.set('q', location)
  queryParams.set('key', process.env.WEATHER_API_KEY || '')
  queryParams.set('lang', 'es')
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?${queryParams.toString()}`, { next: { revalidate: 1800000 }, headers: { 'Content-Type': 'application/json' } })
  return await response.json()
}

async function getCurrentWeather() {
  const items = await prisma.step.findMany({ orderBy: { order: 'desc' } })
  const current = getCurrentTimelineItem(items)
  let weather
  try {
    weather = await getWeather(current.locationEn)
  } catch (error) {
    console.error('Weather error', error)
  }
  return weather
}

export async function GET() {
  try {
    const weather = await getCurrentWeather()
    return NextResponse.json(weather)
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}