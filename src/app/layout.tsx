import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { MuiThemeProvider } from "@/providers/mui-theme-provider"
import { Suspense } from "react"
import "./globals.css"
import { ReduxProvider } from "@/providers/redux-provider"

export const metadata: Metadata = {
  title: "Gestión de Productos",
  description: "Aplicación profesional para gestión de productos con Next.js, Redux y Material UI",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <ReduxProvider>
            <MuiThemeProvider>{children}</MuiThemeProvider>
          </ReduxProvider>
        </Suspense>
      </body>
    </html>
  )
}
