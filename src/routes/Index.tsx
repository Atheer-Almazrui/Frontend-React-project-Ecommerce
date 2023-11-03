import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from '../pages/Home'
import ProductDetails from '../pages/ProductDetails'
import Error from '../pages/Error'
import Contact from '../pages/Contact'
import UserDashboard from '../pages/UserDashboard'

import Products from '../components/admin/Products'
import Header from '../components/Header'
import Categories from '../components/admin/Categories'
import UsersList from '../components/admin/UsersList'

const Index = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/dashboard/admin/categories" element={<Categories />} />
        <Route path="/dashboard/admin/products" element={<Products />} />
        <Route path="/dashboard/admin/userslist" element={<UsersList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Index
