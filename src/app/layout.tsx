import '../styles/main.scss'

import { Metadata } from 'next'

import { getServerSession } from 'next-auth'

import React from 'react'

import Footer from '../includes/footer'

import { SessionProvider } from '../components/sessionProvider'
import { authOptions } from './api/auth/[...nextauth]/route'

const title = 'Nuestro viaje'
const description = 'Compartí nuestro viaje'

export const metadata: Metadata = { title, description, metadataBase: new URL(process.env.BASE_URL || '') }

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="es">
      <head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </head>
      <body className="body">
        <SessionProvider session={session}>
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}
