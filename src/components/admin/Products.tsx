import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import Collapsible from 'react-collapsible'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

import {
  Product,
  addProduct,
  fetchProducts,
  removeProduct
} from '../../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../../redux/store'

import AdminSidebar from './AdminSidebar'
// import AdminForm from './AdminForm'
import '../../styles/adminOperations.scss'

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

const Products = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [isAdding, setIsAdding] = useState(false)
  const [tooltipContent, setTooltipContent] = useState('')
  const { products, isLoading, error } = useSelector((state: RootState) => state.products)

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

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  const handleAddClick = () => {
    setIsAdding(true)
  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsAdding(false)
    // Send the product data to your backend or in this case send it to Redux
    console.log('New product data:', product)
    // let's add Id property to the object (usually IDs are generated automatically on the backend)
    product.id = +new Date()
    console.log('product:', product)

    dispatch(addProduct({ product }))
    // Reset the form
    setProduct(initialProductState)
  }

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
        {!isAdding && (
          <button className="floating-button" onClick={handleAddClick}>
            +
          </button>
        )}
        <div className="table-container">
          <form onSubmit={handleSubmit}>
            <Table className="table">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Image</Th>
                  <Th>Name</Th>
                  <Th>Description</Th>
                  <Th>Categories</Th>
                  <Th>Variants</Th>
                  <Th>Sizes</Th>
                  <Th>Price</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {isAdding && (
                  <Tr>
                    <Td>
                      <input
                        className="input-field"
                        type="text"
                        name="id"
                        value={+new Date()}
                        onChange={handleChange}
                        disabled
                      />
                    </Td>
                    <Td>
                      <input
                        className="input-field"
                        type="text"
                        name="image"
                        value={product.image}
                        onChange={handleChange}
                      />
                    </Td>
                    <Td>
                      <input
                        className="input-field"
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                      />
                    </Td>
                    <Td>
                      <input
                        className="input-field"
                        type="text"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                      />
                    </Td>
                    <Td>
                      <input
                        className="input-field"
                        type="text"
                        name="categories"
                        value={product.categories.join(',')}
                        onChange={handleChange}
                      />
                    </Td>
                    <Td>
                      <input
                        className="input-field"
                        type="text"
                        name="variants"
                        value={product.variants.join(',')}
                        onChange={handleChange}
                      />
                    </Td>
                    <Td>
                      <input
                        className="input-field"
                        type="text"
                        name="sizes"
                        value={product.sizes.join(',')}
                        onChange={handleChange}
                      />
                    </Td>
                    <Td>
                      <input
                        className="input-field"
                        type="text"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                      />
                    </Td>
                    <Td>
                      <button className="add-button" type="submit">
                        Save
                      </button>
                    </Td>
                  </Tr>
                )}
                {products.map((product) => (
                  <>
                    <Tr key={product.id}>
                      <Td
                        className="td-id"
                        data-tooltip-id="show-full-id-tooltip"
                        onMouseEnter={() => setTooltipContent('ID: ' + product.id)}>
                        {product.id}
                        <Tooltip id="show-full-id-tooltip" place="right" content={tooltipContent} />
                      </Td>

                      <Td>
                        <img src={product.image} alt={product.name} />
                      </Td>
                      <Td>{product.name}</Td>
                      <Td>{product.description}</Td>
                      <Td>{product.categories.join(', ')}</Td>
                      <Td>{product.variants.join(', ')}</Td>
                      <Td>{product.sizes.join(', ')}</Td>
                      <Td>${product.price}</Td>
                      <Td>
                        <i className="fa fa-pencil"></i>
                        <i
                          className="fa fa-window-close"
                          onClick={() => dispatch(removeProduct({ productId: product.id }))}></i>
                      </Td>
                    </Tr>
                  </>
                ))}
              </Tbody>
            </Table>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Products
