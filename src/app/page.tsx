"use client"

import { Header } from "@/components/layout/header"
import { ProductsGrid } from "@/components/products/products-grid"
import { Box, Container } from "@mui/material"

export default function Home() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Header />

      <Container>
        <ProductsGrid />
      </Container>


    </Box>
  )
}
