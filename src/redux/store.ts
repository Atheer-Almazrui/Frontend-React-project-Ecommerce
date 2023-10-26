import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/products/productSlice'
import categoryReducer from './slices/categories/categorySlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoryReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
