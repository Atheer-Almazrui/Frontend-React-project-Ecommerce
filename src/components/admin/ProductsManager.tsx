import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchProducts, removeProduct } from '../../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../../redux/store'

import { NewProductWrapper } from './NewProductWrapper'

export function ProductsManager() {
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
    <div className="product-grid product-grid--columns-1 product-grid--columns-md-2 product-grid--full-width">
      <NewProductWrapper />
      <div className="product-card--grid product-card--gap-4">
        <ul>
          {products.map((product) => (
            <li key={product.id} className="product-item">
              <img
                src={product.image}
                alt={product.name}
                width="50"
                className="product-item__image"
              />
              <p>{product.id}</p>
              <h5>{product.name}</h5>
              <h6>{product.description}</h6>
              <button
                className="product-item__delete-button"
                onClick={() => dispatch(removeProduct({ productId: product.id }))}>
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
