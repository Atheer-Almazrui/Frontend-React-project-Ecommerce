import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchProducts, removeProduct } from '../../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../../redux/store'

import { NewProductWrapper } from './NewProductWrapper'
import AdminSidebar from './AdminSidebar'
import '../../styles/adminOperations.scss'

const Products = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { products, isLoading, error } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  if (isLoading) {
    return <h1>Products are loading...</h1>
  }
  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <div className="container">
      <AdminSidebar />
      <div className="form-container">
        <NewProductWrapper />
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
              </div>
              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price}</p>
                <div className="button-container">
                  <button
                    className="delete-button"
                    onClick={() => dispatch(removeProduct({ productId: product.id }))}>
                    Delete
                  </button>
                  <button className="edit-button">Edit</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products
