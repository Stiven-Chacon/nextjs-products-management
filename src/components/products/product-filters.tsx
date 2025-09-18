"use client"
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, InputAdornment } from "@mui/material"
import { Search } from "@mui/icons-material"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setSearchTerm, setSelectedCategory } from "@/lib/products/products.slice"

const categories = ["Todas", "Electrónicos", "Audio", "Muebles", "Hogar", "Deportes"]

export function ProductFilters() {
  const dispatch = useAppDispatch()
  const { selectedCategory, searchTerm } = useAppSelector((state) => state.products)

  const handleCategoryChange = (category: string) => {
    dispatch(setSelectedCategory(category))
  }

  const handleSearchChange = (term: string) => {
    dispatch(setSearchTerm(term))
  }

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
      <TextField
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={(e) => handleSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: "text.secondary" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          flex: 1,
          minWidth: 250,
          "& .MuiOutlinedInput-root": {
            bgcolor: "background.paper",
          },
        }}
      />
      <FormControl sx={{ minWidth: 180 }}>
        <InputLabel>Categoría</InputLabel>
        <Select
          value={selectedCategory}
          label="Categoría"
          onChange={(e) => handleCategoryChange(e.target.value)}
          sx={{ bgcolor: "background.paper" }}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
