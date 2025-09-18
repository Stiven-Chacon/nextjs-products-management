"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material"
import { useAppDispatch } from "@/lib/hooks"
import { addProduct } from "@/lib/products/products.slice"

interface AddProductFormProps {
  open: boolean
  onClose: () => void
}

const categories = ["Electrónicos", "Audio", "Muebles", "Hogar", "Deportes"]

export function AddProductForm({ open, onClose }: AddProductFormProps) {
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nombre || !formData.descripcion || !formData.precio || !formData.categoria) {
      return
    }


    dispatch(
      addProduct({
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: Number.parseFloat(formData.precio),
        categoria: formData.categoria,
      }),
    )

    setFormData({
      nombre: "",
      descripcion: "",
      precio: "",
      categoria: "",
    })
    onClose()
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Agregar Nuevo Producto
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
            <TextField
              label="Nombre del producto"
              value={formData.nombre}
              onChange={(e) => handleChange("nombre", e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Descripción"
              value={formData.descripcion}
              onChange={(e) => handleChange("descripcion", e.target.value)}
              required
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              label="Precio"
              type="number"
              value={formData.precio}
              onChange={(e) => handleChange("precio", e.target.value)}
              required
              fullWidth
              inputProps={{ step: "0.01", min: "0" }}
            />
            <FormControl required fullWidth>
              <InputLabel>Categoría</InputLabel>
              <Select
                value={formData.categoria}
                label="Categoría"
                onChange={(e) => handleChange("categoria", e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button onClick={onClose} color="inherit">
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            Agregar Producto
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
