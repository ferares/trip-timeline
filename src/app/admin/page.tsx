import { Session, getServerSession } from 'next-auth'

import { prisma } from '../../../prisma/prismaClient'

import Header from '@/includes/header'

import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function Admin() {
  const session = await getServerSession(authOptions) as Session
  const tripQuery: { where?: { user?: { some: { id: string } } } } = {}
  if (!session.user.admin) tripQuery.where = { user: { some: { id: session.user.id } } }
  const trips = await prisma.trip.findMany(tripQuery)
  return (
    <>
      <Header title="Trip Timeline" />
      <main className="main">
        {trips ? (
          <ul>
            {trips.map((trip, index) => (
              <li key={index}>
                <a href={`/admin/${trip.slug}`}>
                  {trip.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <span>NO TRIPS</span>
        )}
      </main>
    </>
  )
}
