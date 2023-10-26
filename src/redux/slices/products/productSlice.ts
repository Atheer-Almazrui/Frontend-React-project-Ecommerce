import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
  const response = await api.get('/mock/e-commerce/products.json')
  return response.data
})

export type Product = {
  id: number
  name: string
  image: string
  description: string
  categories: number[]
  variants: string[]
  sizes: string[]
  price: number
}

export type ProductState = {
  products: Product[]
  error: null | string
  isLoading: boolean
  searchWord: string
  singleProduct: Product
}

const initialState: ProductState = {
  products: [],
  error: null,
  isLoading: false,
  searchWord: '',
  singleProduct: {} as Product
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    findProudctDetails: (state, action) => {
      const id = action.payload
      const foundProduct = state.products.find((product) => product.id === id)
      if (foundProduct) state.singleProduct = foundProduct
    },
    searchProductByName: (state, action) => {
      state.searchWord = action.payload
    },
    sortProducts: (state, action) => {
      const sortingCriteria = action.payload
      switch (sortingCriteria) {
        case 'nameASC':
          state.products.sort((a, b) => a.name.localeCompare(b.name))
          break
        case 'nameDESC':
          state.products.sort((a, b) => b.name.localeCompare(a.name))
          break
        case 'priceASC':
          state.products.sort((a, b) => a.price - b.price)
          break
        case 'priceDESC':
          state.products.sort((a, b) => b.price - a.price)
          break
      }
    },
    // for Admins
    addProduct: (state, action: { payload: { product: Product } }) => {
      // let's append the new product to the beginning of the array
      state.products = [action.payload.product, ...state.products]
    },
    removeProduct: (state, action: { payload: { productId: number } }) => {
      const filteredItems = state.products.filter(
        (product) => product.id !== action.payload.productId
      )
      state.products = filteredItems
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.isLoading = false
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'There is an error'
      })
  }
})
export const { sortProducts, searchProductByName, findProudctDetails, removeProduct, addProduct } =
  productSlice.actions

export default productSlice.reducer
