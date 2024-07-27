import { NextRequest, NextResponse } from 'next/server'

import { getPlace } from '@/googleApi'

export async function POST(request: NextRequest) {
  const { textQuery } = await request.json()
  try {
    getPlace(textQuery)
  } catch (error) {
    console.error(error)
    return NextResponse.json({}, { status: 500 })
  }
}