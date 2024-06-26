import { ClerkProvider } from "@clerk/nextjs"
import {Inter} from 'next/font/google'
import '../globals.css'
import BottomBar from "@app/components/layout/BottomBar"
import TopBar from "@app/components/layout/TopBar"
import LeftSideBar from "@app/components/layout/LeftSideBar"
import MainContainer from "@app/components/layout/MainContainer"
import RightSideBar from "@app/components/layout/RightSideBar"

export const metadata = {
  title: 'KIzu-Net',
  description: 'Generated by Next.js',
}
const inter = Inter({subsets :['latin']})

export default function RootLayout({ children }) {
 return (
  <ClerkProvider>
    <html lang="en">
      <body className={`${inter.className} bg-purple-2 text-light-1`}>
        <main className="flex flex-row">
          <LeftSideBar/>
          <MainContainer>
            {children}
          </MainContainer>
          <RightSideBar/>
        </main>
        <BottomBar/>
      </body>
    </html>
  </ClerkProvider>
  )
}
