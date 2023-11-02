import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../redux/store'
import { fetchProducts, findProudctDetails } from '../redux/slices/products/productSlice'
import { fetchCategories } from '../redux/slices/categories/categorySlice'

import '../styles/productDetails.scss'

const ProductDetails = () => {
  const { id } = useParams()

  const dispatch = useDispatch<AppDispatch>()
  const { singleProduct, isLoading, error } = useSelector((state: RootState) => state.products)
  const { categories } = useSelector((state: RootState) => state.categories)
  useEffect(() => {
    dispatch(fetchProducts())
      .then(() => dispatch(findProudctDetails(Number(id))))
      .then(() => dispatch(fetchCategories()))
  }, [])

  if (isLoading) {
    return <h1>Product is loading...</h1>
  }
  if (error) {
    return <h1>{error}</h1>
  }

  const getCategoryName = (categoryId: number) => {
    const category = categories.find((category) => category.id === categoryId)
    return category ? category.name : 'category not foumd'
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
                {singleProduct.categories &&
                  singleProduct.categories.map((categoryId: number) => (
                    <span className="category" key={categoryId}>
                      {getCategoryName(categoryId)}
                    </span>
                  ))}
              </div>
              <p>Variants : </p>
              <div className="product-variants">
                {singleProduct.variants &&
                  singleProduct.variants.map((variant: string) => (
                    <span className="variant" key={variant}>
                      {variant}
                    </span>
                  ))}
              </div>
              {singleProduct.sizes?.length > 0 && (
                <>
                  <p>Sizes: </p>
                  <div className="product-sizes">
                    {singleProduct.sizes.map((size: string) => (
                      <span className="size" key={size}>
                        {size}
                      </span>
                    ))}
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
