import { redirect } from 'next/navigation'

import { Session, getServerSession } from 'next-auth'

import { prisma } from '../../../../prisma/prismaClient'

import { getCurrentTimelineStep } from '@/utils'
import { authOptions } from '../../api/auth/[...nextauth]/route'

import Timeline from '../../../components/timeline'
import Clock from '../../../components/clock'
import Weather from '../../../components/weather'
import Photos from '../../../components/photos'
import Header from '../../../includes/header'
import Theme from '../../../components/theme'
import SignOutBtn from '@/components/signOutBtn'

export default async function Admin({ params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions) as Session
  const userId = session.user.id
  const user = await prisma.user.findFirst({ where: { id: userId } })
  if (!user) return redirect('/')
  const tripQuery: { where: { slug: string, user?: { some: { id: string } } } } = { where: { slug: params.slug } }
  if (!user.admin) tripQuery.where.user = { some: { id: userId } }
  const trip = await prisma.trip.findFirst(tripQuery)
  if (!trip) return redirect('/')
  const steps = await prisma.step.findMany({ where: { tripId: trip.id }, orderBy: {  order: 'asc' } })
  const current = getCurrentTimelineStep(steps)
  return (
    <>
      <Theme colors={trip.colors} />
      <Header title={trip.title} />
      <SignOutBtn />
      <main className="main">
        <Timeline trip={trip} steps={steps} currentId={current.id} />
        <div className="columns">
          <Photos title={trip.title} albumURL={trip.albumURL} />
          <Weather locationName={current.locationEs} />
          <Clock locationName={current.locationEs} dateTimeString={current.time} />
        </div>
      </main>
    </>
  )
}
