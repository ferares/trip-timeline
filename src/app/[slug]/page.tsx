import { redirect } from 'next/navigation'

import { prisma } from '../../../prisma/prismaClient'

import { getCurrentTimelineStep, getNextStep } from '@/utils'

import Timeline from '../../components/timeline'
import Clock from '../../components/clock'
import Weather from '../../components/weather'
import Photos from '../../components/photos'
import Header from '../../includes/header'
import Theme from '../../components/theme'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const trip = await prisma.trip.findFirst({ where: { slug: params.slug } })
  if (!trip) return redirect('/')
  return {
    title: trip.title,
    description: trip.description,
    openGraph: {
      title: trip.title,
      description: trip.description,
      type: 'website',
    },
  }
}

export default async function Home({ params }: { params: { slug: string } }) {
  const trip = await prisma.trip.findFirst({ where: { slug: params.slug } })
  if (!trip) return redirect('/')
  const steps = await prisma.step.findMany({ where: { tripId: trip.id }, orderBy: {  order: 'asc' } })
  const current = getCurrentTimelineStep(steps)
  const dateTimeString = current.type === 'transit' ? getNextStep(current, steps).time : current.time
  return (
    <>
      <Theme colors={trip.colors} />
      <Header title={trip.title} />
      <main className="main">
        <Timeline trip={trip} steps={steps} currentId={current.id} />
        <div className="columns">
          <Photos title={trip.title} albumURL={trip.albumURL} />
          <Weather locationName={current.locationEs} />
          <Clock locationName={current.locationEs} dateTimeString={dateTimeString} />
        </div>
      </main>
    </>
  )
}
