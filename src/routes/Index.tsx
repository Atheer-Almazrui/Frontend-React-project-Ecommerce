import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import UserProfile from '../pages/UserProfile'
import UserDashboard from '../pages/UserDashboard'
import ProductDetails from '../pages/ProductDetails'
import Error from '../pages/Error'

import Header from '../components/Header'
import Products from '../components/admin/Products'
import AdminProfile from '../components/admin/AdminProfile'
import Categories from '../components/admin/Categories'
import UsersList from '../components/admin/UsersList'

import ProtectedRoute from './ProtectedRoute'
import AdminRoute from './AdminRoute'

const Index = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login pathName={''} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="*" element={<Error />} />

        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin/profile" element={<AdminProfile />} />
          <Route path="admin/categories" element={<Categories />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/userslist" element={<UsersList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Index
