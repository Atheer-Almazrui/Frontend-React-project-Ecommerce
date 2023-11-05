import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api'

export const fetchOrders = createAsyncThunk('order/fetchOrders', async () => {
  const response = await api.get('/mock/e-commerce/orders.json')
  return response.data
})

export type Order = {
  id: number
  productId: number
  userId: number
  purchasedAt: string
}

export type OrderState = {
  orders: Order[]
  error: null | string
  isLoading: boolean
}

const initialState: OrderState = {
  orders: [],
  error: null,
  isLoading: false
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    removeOrder: (state, action: { payload: { orderId: number } }) => {
      const filteredItems = state.orders.filter((order) => order.id !== action.payload.orderId)
      state.orders = filteredItems
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.isLoading = false
        state.orders = action.payload
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'There is an error'
      })
  }
})

export const { removeOrder } = orderSlice.actions

export default orderSlice.reducer
