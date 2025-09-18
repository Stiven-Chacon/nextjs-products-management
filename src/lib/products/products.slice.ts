import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { Product, ProductsState } from "./products.types"
import { initialProducts } from "./product-data"

const initialState: ProductsState = {
  products: initialProducts,
  filteredProducts: initialProducts,
  selectedCategory: "Todas",
  searchTerm: "",
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Omit<Product, "id">>) => {
      const newProduct: Product = {
        ...action.payload,
        id: Date.now().toString(),
      }
      state.products.unshift(newProduct)
      productsSlice.caseReducers.filterProducts(state)
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((product) => product.id === action.payload.id)
      if (index !== -1) {
        state.products[index] = action.payload
        productsSlice.caseReducers.filterProducts(state)
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((product) => product.id !== action.payload)
      productsSlice.caseReducers.filterProducts(state)
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload
      productsSlice.caseReducers.filterProducts(state)
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
      productsSlice.caseReducers.filterProducts(state)
    },
    filterProducts: (state) => {
      let filtered = state.products

      if (state.selectedCategory !== "Todas") {
        filtered = filtered.filter((product) => product.categoria === state.selectedCategory)
      }

      if (state.searchTerm) {
        filtered = filtered.filter(
          (product) =>
            product.nombre.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            product.descripcion.toLowerCase().includes(state.searchTerm.toLowerCase()),
        )
      }

      state.filteredProducts = filtered
    },
  },
})

export const { addProduct, updateProduct, deleteProduct, setSelectedCategory, setSearchTerm } =
  productsSlice.actions

export default productsSlice.reducer
