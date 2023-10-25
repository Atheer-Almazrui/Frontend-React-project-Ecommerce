import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from '../pages/Home'
import AdminDashboard from '../pages/AdminDashboard'
import Categories from '../components/Categories'
import ProductDetails from '../pages/ProductDetails'
import Error from '../pages/Error'
import Header from '../components/Header'
import Contact from '../pages/Contact'
import UserDashboard from '../pages/UserDashboard'
import Products from '../components/Products'

const Index = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/product" element={<ProductDetails />} />
        <Route path="/dashboard/admin/categories" element={<Categories />} />
        <Route path="/dashboard/admin/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Index
