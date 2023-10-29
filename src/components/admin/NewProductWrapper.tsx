import { useState, ChangeEvent, FormEvent } from 'react'
import { useDispatch } from 'react-redux'

import { addProduct, Product } from '../../redux/slices/products/productSlice'
import { AppDispatch } from '../../redux/store'

import '../../styles/adminManager.scss'

const initialProductState: Product = {
  id: 0,
  name: '',
  image: '',
  description: '',
  categories: [],
  variants: [],
  sizes: [],
  price: 0
}

export function NewProductWrapper() {
  const dispatch = useDispatch<AppDispatch>()
  const [product, setProduct] = useState<Product>(initialProductState)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    const isList = name === 'categories' || name === 'variants' || name === 'sizes'

    if (isList) {
      setProduct({
        ...product,
        [name]: value.split(',')
      })
      return
    }

    setProduct({
      ...product,
      [name]: value
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Send the product data to your backend or in this case send it to Redux
    console.log('New product data:', product)
    // let's add Id property to the object (usually IDs are generated automatically on the backend)
    product.id = +new Date()
    console.log('product:', product)

    dispatch(addProduct({ product }))
    // Reset the form
    setProduct(initialProductState)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="product-form">
        <h1>Add a new product</h1>
        <div className="product-form__group">
          <label htmlFor="name" className="product-form__label">
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={product.name}
            onChange={handleChange}
            className="product-form__input"
          />
        </div>
        <div className="product-form__group">
          <label htmlFor="image" className="product-form__label">
            Image URL:
          </label>
          <input
            type="text"
            name="image"
            id="image"
            value={product.image}
            onChange={handleChange}
            className="product-form__input"
          />
        </div>
        <div className="product-form__group">
          <label htmlFor="description" className="product-form__label">
            Description:
          </label>
          <textarea
            name="description"
            id="description"
            value={product.description}
            onChange={handleChange}
            className="product-form__input"
          />
        </div>
        <div className="product-form__group">
          <label htmlFor="categories" className="product-form__label">
            Categories: (use comma , to create multiple)
          </label>
          <input
            type="text"
            name="categories"
            id="categories"
            value={product.categories.join(',')}
            onChange={handleChange}
            className="product-form__input"
          />
        </div>
        <div className="product-form__group">
          <label htmlFor="variants" className="product-form__label">
            Variants: (use comma , to create multiple)
          </label>
          <input
            type="text"
            name="variants"
            id="variants"
            value={product.variants.join(',')}
            onChange={handleChange}
            className="product-form__input"
          />
        </div>
        <div className="product-form__group">
          <label htmlFor="sizes" className="product-form__label">
            Sizes: (use comma , to create multiple)
          </label>
          <input
            type="text"
            name="sizes"
            id="sizes"
            value={product.sizes.join(',')}
            onChange={handleChange}
            className="product-form__input product-form__input--wide"
          />
        </div>
        <button type="submit" className="product-form__button product-form__button--primary">
          Add Product
        </button>
      </form>
    </div>
  )
}
