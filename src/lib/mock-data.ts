import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Product {
  id: string
  nombre: string
  descripcion: string
  precio: number
  categoria: string
}

interface ProductsState {
  products: Product[]
  filteredProducts: Product[]
  selectedCategory: string
  searchTerm: string
}

const initialProducts: Product[] = [
  {
    id: "1",
    nombre: "Laptop Gaming Pro",
    descripcion: "Laptop de alto rendimiento para gaming y trabajo profesional",
    precio: 1299.99,
    categoria: "Electrónicos",
  },
  {
    id: "2",
    nombre: "Smartphone Ultra",
    descripcion: "Teléfono inteligente con cámara de 108MP y 5G",
    precio: 899.99,
    categoria: "Electrónicos",
  },
  {
    id: "3",
    nombre: "Auriculares Inalámbricos",
    descripcion: "Auriculares con cancelación de ruido activa",
    precio: 249.99,
    categoria: "Audio",
  },
  {
    id: "4",
    nombre: "Mesa de Oficina",
    descripcion: "Mesa ergonómica ajustable en altura",
    precio: 399.99,
    categoria: "Muebles",
  },
  {
    id: "5",
    nombre: "Cafetera Automática",
    descripcion: "Cafetera con molinillo integrado y programación",
    precio: 179.99,
    categoria: "Hogar",
  },
  {
    id: "6",
    nombre: "Zapatillas Deportivas",
    descripcion: "Zapatillas de running con tecnología de amortiguación",
    precio: 129.99,
    categoria: "Deportes",
  },
  {
    id: "7",
    nombre: "Monitor 4K UltraWide",
    descripcion: "Monitor de 34 pulgadas con resolución 4K y HDR",
    precio: 699.99,
    categoria: "Electrónicos",
  },
  {
    id: "8",
    nombre: "Teclado Mecánico RGB",
    descripcion: "Teclado mecánico con retroiluminación RGB programable",
    precio: 149.99,
    categoria: "Electrónicos",
  },
  {
    id: "9",
    nombre: "Silla Gamer Ergonómica",
    descripcion: "Silla con soporte lumbar ajustable y reposabrazos 4D",
    precio: 289.99,
    categoria: "Muebles",
  },
  {
    id: "10",
    nombre: "Smartwatch Pro",
    descripcion: "Reloj inteligente con GPS, sensor cardíaco y resistencia al agua",
    precio: 249.99,
    categoria: "Electrónicos",
  },
  {
    id: "11",
    nombre: "Altavoz Bluetooth Portátil",
    descripcion: "Altavoz resistente al agua con sonido envolvente",
    precio: 99.99,
    categoria: "Audio",
  },
  {
    id: "12",
    nombre: "Cámara Reflex HD",
    descripcion: "Cámara DSLR con lente de 24MP y grabación 4K",
    precio: 1199.99,
    categoria: "Electrónicos",
  },
  {
    id: "13",
    nombre: "Licuadora Profesional",
    descripcion: "Licuadora de alto rendimiento con múltiples velocidades",
    precio: 199.99,
    categoria: "Hogar",
  },
  {
    id: "14",
    nombre: "Bicicleta de Montaña",
    descripcion: "Bicicleta con suspensión delantera y cuadro de aluminio",
    precio: 599.99,
    categoria: "Deportes",
  },
  {
    id: "15",
    nombre: "Lámpara LED Inteligente",
    descripcion: "Lámpara con control por voz y ajuste de intensidad",
    precio: 59.99,
    categoria: "Hogar",
  },
]


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

export default productsSlice.reducer
