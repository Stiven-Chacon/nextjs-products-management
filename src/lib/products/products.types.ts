export interface Product {
  id: string
  nombre: string
  descripcion: string
  precio: number
  categoria: string
}

export interface ProductsState {
  products: Product[]
  filteredProducts: Product[]
  selectedCategory: string
  searchTerm: string
}
