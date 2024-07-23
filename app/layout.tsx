import { Providers } from '@/Providers'
import { Flex } from '@chakra-ui/react'
import type { Metadata } from 'next'
import './globals.css'
import NavBar from './NavBar'


export const metadata: Metadata = {
  title: 'WreckIt'
}

const RootLayout = ({ children, }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <NavBar />
          <Flex justifyContent='center' width='100%' padding={4} minH='calc(100vh - 72px)'>
            {children}
          </Flex>
        </Providers>
      </body>
    </html>
  )
}
export default RootLayout
