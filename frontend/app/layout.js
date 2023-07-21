import Nav from '@/components/Nav'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Questionnaire App',
  description: 'A simple questionnaire app for taking tests.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className=' p-2 '>
        <Nav />
        {children}
        </div>
      </body>
    </html>
  )
}
