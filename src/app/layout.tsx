import '../styles/main.scss'

import React from 'react'

import Footer from './components/footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <meta property="og:image" content="/favicon.png" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body className="body">
        {children}
        <Footer />
      </body>
    </html>
  )
}
