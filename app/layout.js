import Modal from '@/components/Modal'
import './globals.css'

export const metadata = {
  title: 'Trello Clone',
  description: 'Created by Ilyas El Mabrouki',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='bg-[#F5F6F8]'>
        {children}
        <Modal/>
      </body>
    </html>
  )
}
