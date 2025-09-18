"use client"

import React from "react"
import {
  Grid,
  Typography,
  Box,
  Pagination,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material"
import { useState } from "react"
import { useAppSelector } from "@/lib/hooks"
import { ProductCard } from "../cards/product-card"


const PRODUCTS_PER_PAGE = 12

export function ProductsGrid() {
  const { filteredProducts, } = useAppSelector((state) => state.products)
  const [currentPage, setCurrentPage] = useState(1)


  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIndex = startIndex + PRODUCTS_PER_PAGE
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }


  return (
    <Box>
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Mostrando {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} de {filteredProducts.length}{" "}
          productos
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Página {currentPage} de {totalPages}
        </Typography>
      </Box>

      {/* Grid de productos */}
      <Grid container spacing={3} sx={{mb: 4, width: "100%", mx: 0,  display: "flex", justifyContent: "space-between", alignItems: "center"  }}>
        {currentProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} sx={{ display: "flex",  justifyContent: { xs: "center", sm: "flex-start" } }}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>




      {totalPages > 1 && (
        <Stack spacing={2} alignItems="center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
            sx={{
              "& .MuiPaginationItem-root": {
                fontWeight: 500,
              },
              "& .Mui-selected": {
                bgcolor: "primary.main",
                color: "primary.contrastText",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              },
            }}
          />
        </Stack>
      )}

    </Box>
  )
}
