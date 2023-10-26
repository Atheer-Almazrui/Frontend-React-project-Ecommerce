import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchCategories = createAsyncThunk('category/fetchCategories', async () => {
  const response = await api.get('/mock/e-commerce/categories.json')
  return response.data
})

export type Category = {
  id: number
  name: string
}

export type CategoryState = {
  categories: Category[]
  error: null | string
  isLoading: boolean
}

const initialState: CategoryState = {
  categories: [],
  error: null,
  isLoading: false
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    // for Admins
    addCategory: (state, action: { payload: { category: Category } }) => {
      state.categories = [action.payload.category, ...state.categories]
    },
    removeCategory: (state, action: { payload: { categoryId: number } }) => {
      const filteredItems = state.categories.filter(
        (category) => category.id !== action.payload.categoryId
      )
      state.categories = filteredItems
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.isLoading = false
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'There is an error'
      })
  }
})
export const { removeCategory, addCategory } = categorySlice.actions

export default categorySlice.reducer
