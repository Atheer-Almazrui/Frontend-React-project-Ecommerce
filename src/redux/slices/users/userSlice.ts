import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api'

export const fetchUsers = createAsyncThunk('category/fetchUsers', async () => {
  const response = await api.get('/mock/e-commerce/users.json')
  return response.data
})

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
}

export type UserState = {
  users: User[]
  error: null | string
  isLoading: boolean
  isLoggedIn: boolean
  userData: User | null
}

const data =
  localStorage.getItem('loginData') !== null
    ? JSON.parse(String(localStorage.getItem('loginData')))
    : []

const initialState: UserState = {
  users: [],
  error: null,
  isLoading: false,
  isLoggedIn: data.isLoggedIn,
  userData: data.userData
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeUser: (state, action: { payload: { userId: number } }) => {
      const filteredItems = state.users.filter((user) => user.id !== action.payload.userId)
      state.users = filteredItems
    },
    login: (state, action) => {
      state.isLoggedIn = true
      state.userData = action.payload
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        })
      )
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.userData = null
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        })
      )
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.isLoading = false
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'There is an error'
      })
  }
})

export const { removeUser, login, logout } = userSlice.actions

export default userSlice.reducer
