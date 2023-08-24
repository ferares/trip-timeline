import Head from 'next/head'
import { redirect } from 'next/navigation'

import { PrismaClient } from '@prisma/client'

import { getCurrentTimelineItem } from '@/utils'

import Timeline from '../components/timeline'
import Clock from '../components/clock'
import Weather from '../components/weather'
import Photos from '../components/photos'
import Header from '../components/header'

const prisma = new PrismaClient()

export default async function Home({ params }: { params: { slug: string } }) {
  const trip = await prisma.trip.findFirst({ where: { slug: params.slug } })
  if (!trip) return redirect('/')
  const items = await prisma.step.findMany({ where: { tripId: trip.id }, orderBy: {  order: 'asc' } })
  const current = getCurrentTimelineItem(items)
  const description = 'Compartí nuestro viaje'
  return (
    <>
      <Head>
        <title>{trip.title}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={trip.title} />
        <meta property="og:description" content={description} />
      </Head>
      <Header title={trip.title} />
      <main className="main">
        <Timeline trip={trip} items={items} currentId={current.id} />
        <div className="columns">
          <Photos title={trip.title} albumURL={trip.albumURL} />
          <Weather locationName={current.locationEs} />
          <Clock locationName={current.locationEs} dateTimeString={current.time} />
        </div>
      </main>
    </>
  )
}
