"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem, Box } from "@mui/material"
import { Product } from "@/lib/products/products.types"

interface EditProductModalProps {
  open: boolean
  product: Product | null
  onClose: () => void
  onSave: (product: Product) => void
}

const categorias = ["Electrónicos", "Audio", "Muebles", "Hogar", "Deportes"]

export function EditProductModal({ open, product, onClose, onSave }: EditProductModalProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
  })

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio: product.precio.toString(),
        categoria: product.categoria,
      })
    }
  }, [product])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (product && formData.nombre && formData.descripcion && formData.precio && formData.categoria) {
      onSave({
        ...product,
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: Number.parseFloat(formData.precio),
        categoria: formData.categoria,
      })
      onClose()
    }
  }

  const handleClose = () => {
    onClose()
    setFormData({ nombre: "", descripcion: "", precio: "", categoria: "" })
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Producto</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <TextField
              label="Nombre del producto"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              required
              fullWidth
            />
            <TextField
              label="Descripción"
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              required
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              label="Precio"
              type="number"
              value={formData.precio}
              onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
              required
              inputProps={{ min: 0, step: 0.01 }}
              fullWidth
            />
            <TextField
              label="Categoría"
              select
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              required
              fullWidth
            >
              {categorias.map((categoria) => (
                <MenuItem key={categoria} value={categoria}>
                  {categoria}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            Guardar Cambios
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
