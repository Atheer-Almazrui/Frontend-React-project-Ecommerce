import { createSlice } from '@reduxjs/toolkit'
import { Product } from '../products/productSlice'

const data =
  localStorage.getItem('cart') !== null ? JSON.parse(String(localStorage.getItem('cart'))) : []

export type CartState = {
  cartItems: Product[]
}

const initialState: CartState = {
  cartItems: data
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload)
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    },
    removeItem: (state, action: { payload: { itemId: number } }) => {
      const filteredItems = state.cartItems.filter((item) => item.id !== action.payload.itemId)
      state.cartItems = filteredItems
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    },
    removeAllItem: (state) => {
      state.cartItems = []
      localStorage.removeItem('cart')
    }
  }
})

export const { addToCart, removeItem, removeAllItem } = cartSlice.actions

export default cartSlice.reducer
