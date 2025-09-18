"use client"

import { Header } from "@/components/layout/header"
import { AddProductForm } from "@/components/products/add-product-form"
import { ProductFilters } from "@/components/products/product-filters"
import { ProductsGrid } from "@/components/products/products-grid"
import { useAppSelector } from "@/lib/hooks"
import { Product } from "@/lib/mock-data"
import { Add } from "@mui/icons-material"
import { Container, Box, Button, Typography } from "@mui/material"
import { useState } from "react"

export default function Home() {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false)

  const { filteredProducts } = useAppSelector((state) => state.products)


  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Header />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 600, color: "text.primary", mb: 1 }}>
                Catálogo de Productos
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""} disponible
                {filteredProducts.length !== 1 ? "s" : ""}
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setIsAddFormOpen(true)}
              sx={{
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "primary.dark" },
                px: 3,
                py: 1.5,
                fontWeight: 500,
                textTransform: "none",
              }}
            >
              Agregar Producto
            </Button>
          </Box>

          <ProductFilters />

        </Box>

        <ProductsGrid />
      </Container>

      <AddProductForm open={isAddFormOpen} onClose={() => setIsAddFormOpen(false)} />
    </Box>
  )
}
