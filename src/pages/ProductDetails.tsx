import { useParams } from 'react-router-dom'
import '../styles/productDetails.scss'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { useEffect } from 'react'
import { findProudctDetails } from '../redux/slices/products/productSlice'

const ProductDetails = () => {
  const { id } = useParams()

  const dispatch = useDispatch<AppDispatch>()
  const { singleProduct, isLoading, error } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    dispatch(findProudctDetails(Number(id)))
  }, [])

  if (isLoading) {
    return <h1>Product is loading...</h1>
  }
  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <div className="product-page">
      <div className="product-card">
        {singleProduct && (
          <>
            <div className="product-image">
              <img src={singleProduct.image} alt="Product" />
            </div>
            <div className="product-details">
              <h2 className="product-name">{singleProduct.name}</h2>
              <p className="product-description">{singleProduct.description}</p>
              <p>Categories : </p>
              <div className="product-categories">
                <span className="category">
                  {singleProduct.categories && singleProduct.categories.join(' , ')}
                </span>
              </div>
              <p>Variants : </p>
              <div className="product-variants">
                <span className="variant">
                  {singleProduct.variants && singleProduct.variants.join(' , ')}
                </span>
              </div>
              {singleProduct.sizes && (
                <>
                  <p>Sizes: </p>
                  <div className="product-sizes">
                    <span className="size">{singleProduct.sizes.join(' , ')}</span>
                  </div>
                </>
              )}
              <p className="product-price">${singleProduct.price}</p>
              <button className="add-to-cart-btn">Add to Cart</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ProductDetails
