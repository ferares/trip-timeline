import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '../../../../../prisma/prismaClient'

import { getCurrentTimelineStep } from '@/utils'

import Weather from '../../../../types/weather'

async function getCurrentWeather(tripId: number): Promise<Weather> {
  const items = await prisma.step.findMany({ where: { tripId }, orderBy: { order: 'asc' } })
  const current = getCurrentTimelineStep(items)
  const queryParams = new URLSearchParams()
  queryParams.set('q', current.locationEn)
  queryParams.set('key', process.env.WEATHER_API_KEY || '')
  queryParams.set('lang', 'es')
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?${queryParams.toString()}`, { next: { revalidate: 1800 }, headers: { 'Content-Type': 'application/json' } })
    const weather = await response.json()
    return weather
  } catch (error) {
    return new Promise((_, reject) => reject(error))
  }
}

export async function GET(_: NextRequest, { params }: { params: { tripId: string } }) {
  try {
    const { tripId } = params
    const weather = await getCurrentWeather(Number(tripId))
    return NextResponse.json(weather)
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}