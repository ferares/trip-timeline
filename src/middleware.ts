import { withAuth } from 'next-auth/middleware'

export default withAuth(function middleware() {}, {
  callbacks: {
    authorized: ({ req, token }) => ((token !== null) || (!req.nextUrl.pathname.startsWith('/admin'))),
  },
})