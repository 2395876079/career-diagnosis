import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '终将上岸导航 - AI未来发展诊断',
  description: '3分钟，看见更适合你的未来',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        {children}
      </body>
    </html>
  )
}
