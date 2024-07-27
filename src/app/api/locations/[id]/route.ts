import { NextRequest, NextResponse } from 'next/server'

import { getPlaceDetails, getPlaceTimeZone } from '@/googleApi'

export const dynamic = 'force-dynamic' // Don't pre-render this GET method

// Text Search https://developers.google.com/maps/documentation/places/web-service/text-search
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  try {
    const details = await getPlaceDetails(id)
    const timeZoneData = await getPlaceTimeZone(details.coordinates, timestamp)
  } catch (error) {
    console.error(error)
    return NextResponse.json({}, { status: 500 })
  }
}