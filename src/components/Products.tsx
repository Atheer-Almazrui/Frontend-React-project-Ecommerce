import AdminSidebar from './AdminSidebar'
import { ProductsManager } from './ProductsManager'

const Products = () => {
  return (
    <div className="container">
      <div>
        <ProductsManager />
      </div>
      <AdminSidebar />
    </div>
  )
}

export default Products
