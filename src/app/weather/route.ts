import { NextResponse } from 'next/server'

import { prisma } from '../../../prisma/prismaClient'

import { getCurrentTimelineItem } from '@/utils'

import Weather from '../../types/weather'

async function getCurrentWeather(): Promise<Weather> {
  const items = await prisma.step.findMany({ orderBy: { order: 'desc' } })
  const current = getCurrentTimelineItem(items)
  const queryParams = new URLSearchParams()
  queryParams.set('q', current.locationEn)
  queryParams.set('key', process.env.WEATHER_API_KEY || '')
  queryParams.set('lang', 'es')
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?${queryParams.toString()}`, { next: { revalidate: 1800 }, headers: { 'Content-Type': 'application/json' } })
    return await response.json()
  } catch (error) {
    return new Promise((_, reject) => reject(error))
  }
}

export async function GET() {
  try {
    const weather = await getCurrentWeather()
    return NextResponse.json(weather)
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}