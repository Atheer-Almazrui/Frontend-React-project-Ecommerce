import AdminSidebar from './AdminSidebar'
import { ProductsManager } from './ProductsManager'

const Products = () => {
  return (
    <div className="container">
      <AdminSidebar />
      <ProductsManager />
    </div>
  )
}

export default Products
