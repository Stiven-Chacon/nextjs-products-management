"use client"

import { Header } from "@/components/layout/header"
import { Box } from "@mui/material"

export default function Home() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Header />
    </Box>
  )
}
