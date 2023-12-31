import '../styles/main.scss'

import { Metadata } from 'next'

import React from 'react'

import Footer from '../includes/footer'

const title = 'Nuestro viaje'
const description = 'Compartí nuestro viaje'

export const metadata: Metadata = { title, description, metadataBase: new URL(process.env.BASE_URL || '') }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </head>
      <body className="body">
        {children}
        <Footer />
      </body>
    </html>
  )
}
