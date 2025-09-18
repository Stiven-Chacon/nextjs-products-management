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
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { ProductCard } from "../cards/product-card"
import { EditProductModal } from "./edit-product-modal"
import { Product } from "@/lib/products/products.types"
import { deleteProduct, updateProduct } from "@/lib/products/products.slice"


const PRODUCTS_PER_PAGE = 12

export function ProductsGrid() {
  const { filteredProducts, selectedCategory, searchTerm } = useAppSelector((state) => state.products)
  const dispatch = useAppDispatch()
  const [currentPage, setCurrentPage] = useState(1)

  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null)

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIndex = startIndex + PRODUCTS_PER_PAGE
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
  }

  const handleSaveEdit = (updatedProduct: Product) => {
    dispatch(updateProduct(updatedProduct))
    setEditingProduct(null)
  }


  const handleDelete = (productId: string) => {
    setDeletingProductId(productId)
  }


  const handleConfirmDelete = () => {
    if (deletingProductId) {
      dispatch(deleteProduct(deletingProductId))
      setDeletingProductId(null)
    }
  }


  return (
    <>
      {filteredProducts.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            No se encontraron productos
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {searchTerm
              ? `No hay productos que coincidan con "${searchTerm}"`
              : selectedCategory !== "Todas"
                ? `No hay productos en la categoría "${selectedCategory}"`
                : "No hay productos disponibles"}
          </Typography>
        </Box>
      ) : (
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
          <Grid container spacing={3} sx={{ mb: 4, width: "100%", mx: 0, display: "flex", alignItems: "center" }}>
            {currentProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} sx={{ display: "flex", justifyContent: { xs: "center", sm: "flex-start" } }}>
                <ProductCard product={product} onEdit={handleEdit} onDelete={handleDelete} />
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

          <EditProductModal
            open={!!editingProduct}
            product={editingProduct}
            onClose={() => setEditingProduct(null)}
            onSave={handleSaveEdit}
          />

          <Dialog open={!!deletingProductId} onClose={() => setDeletingProductId(null)} maxWidth="sm">
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogContent>
              <Typography>¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeletingProductId(null)}>Cancelar</Button>
              <Button onClick={handleConfirmDelete} variant="contained" color="error">
                Eliminar
              </Button>
            </DialogActions>
          </Dialog>

        </Box>
      )}
    </>
  )
}
