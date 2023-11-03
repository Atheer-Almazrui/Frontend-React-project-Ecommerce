import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

import {
  Product,
  addProduct,
  fetchProducts,
  removeProduct,
  updateProduct
} from '../../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../../redux/store'

import AdminSidebar from './AdminSidebar'
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

  const [product, setProduct] = useState<Product>(initialProductState)
  const [isAdding, setIsAdding] = useState(false)
  const [newProductID, setNewProductID] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [editedID, setEditedID] = useState(0)
  const [editedProduct, setEditedProduct] = useState<Product>(product)
  const [tooltipContent, setTooltipContent] = useState('')

  const { products, isLoading, error } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    const isList = name === 'categories' || name === 'variants' || name === 'sizes'

    if (isEditing) {
      if (isList) {
        setEditedProduct({
          ...editedProduct,
          [name]: value.split(',')
        })
        return
      }

      setEditedProduct({
        ...editedProduct,
        [name]: value
      })
    } else {
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
  }

  const handleAddClick = () => {
    setNewProductID(+new Date())
    setIsAdding(true)
  }

  const handleEditClick = (product: Product) => {
    setEditedProduct(product)
    setEditedID(product.id)
    setIsEditing(true)
  }

  const handleUpdateProduct = () => {
    dispatch(updateProduct({ editedProduct: editedProduct }))
    setIsEditing(false)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsAdding(false)

    product.id = newProductID

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
      <div className="admin-container">
        <h1 className="title">Products</h1>
        <button className="floating-button" onClick={handleAddClick}>
          +
        </button>
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
                    <Td
                      className="td-id"
                      data-tooltip-id="show-full-id-tooltip"
                      onMouseEnter={() => setTooltipContent('ID: ' + newProductID)}>
                      <Tooltip id="show-full-id-tooltip" place="right" content={tooltipContent} />
                      {newProductID}
                    </Td>
                    <Td>
                      <input
                        className="input-field"
                        type="text"
                        name="image"
                        onChange={handleChange}
                      />
                    </Td>
                    <Td>
                      <input
                        className="input-field"
                        type="text"
                        name="name"
                        onChange={handleChange}
                      />
                    </Td>
                    <Td>
                      <input
                        className="input-field"
                        type="text"
                        name="description"
                        onChange={handleChange}
                      />
                    </Td>
                    <Td>
                      <input
                        className="input-field"
                        type="text"
                        name="categories"
                        onChange={handleChange}
                      />
                    </Td>
                    <Td>
                      <input
                        className="input-field"
                        type="text"
                        name="variants"
                        onChange={handleChange}
                      />
                    </Td>
                    <Td>
                      <input
                        className="input-field"
                        type="text"
                        name="sizes"
                        onChange={handleChange}
                      />
                    </Td>
                    <Td>
                      <input
                        className="input-field"
                        type="text"
                        name="price"
                        onChange={handleChange}
                      />
                    </Td>
                    <Td>
                      <button className="save-update-buttons" type="submit">
                        Save
                      </button>
                    </Td>
                  </Tr>
                )}
                {products.map((product) => (
                  <Fragment key={product.id}>
                    {isEditing && editedID == product.id && (
                      <Tr>
                        <Td
                          className="td-id"
                          data-tooltip-id="show-full-id-tooltip"
                          onMouseEnter={() => setTooltipContent('ID: ' + editedProduct.id)}>
                          <Tooltip
                            id="show-full-id-tooltip"
                            place="right"
                            content={tooltipContent}
                          />
                          {editedProduct.id}
                        </Td>
                        <Td>
                          <input
                            className="input-field"
                            type="text"
                            name="image"
                            value={editedProduct.image}
                            onChange={handleChange}
                          />
                        </Td>
                        <Td>
                          <input
                            className="input-field"
                            type="text"
                            name="name"
                            value={editedProduct.name}
                            onChange={handleChange}
                          />
                        </Td>
                        <Td>
                          <input
                            className="input-field"
                            type="text"
                            name="description"
                            value={editedProduct.description}
                            onChange={handleChange}
                          />
                        </Td>
                        <Td>
                          <input
                            className="input-field"
                            type="text"
                            name="categories"
                            value={editedProduct.categories.join(',')}
                            onChange={handleChange}
                          />
                        </Td>
                        <Td>
                          <input
                            className="input-field"
                            type="text"
                            name="variants"
                            value={editedProduct.variants.join(',')}
                            onChange={handleChange}
                          />
                        </Td>
                        <Td>
                          <input
                            className="input-field"
                            type="text"
                            name="sizes"
                            value={editedProduct.sizes.join(',')}
                            onChange={handleChange}
                          />
                        </Td>
                        <Td>
                          <input
                            className="input-field"
                            type="text"
                            name="price"
                            value={editedProduct.price}
                            onChange={handleChange}
                          />
                        </Td>
                        <Td>
                          <button
                            className="save-update-buttons"
                            type="button"
                            onClick={handleUpdateProduct}>
                            Update
                          </button>
                        </Td>
                      </Tr>
                    )}
                    <Tr>
                      <Td
                        className="td-id"
                        data-tooltip-id="show-full-id-tooltip"
                        onMouseEnter={() => setTooltipContent('ID: ' + product.id)}>
                        {product.id}
                        <Tooltip id="show-full-id-tooltip" place="right" content={tooltipContent} />
                      </Td>

                      <Td className="td-image">
                        <img src={product.image} alt={product.name} />
                      </Td>
                      <Td>{product.name}</Td>
                      <Td>{product.description}</Td>
                      <Td>{product.categories.join(', ')}</Td>
                      <Td>{product.variants.join(', ')}</Td>
                      <Td>{product.sizes.join(', ')}</Td>
                      <Td>${product.price}</Td>
                      <Td>
                        <i
                          className="fa fa-pencil action-icons"
                          onClick={() => handleEditClick(product)}></i>
                        <i
                          className="fa fa-window-close action-icons"
                          onClick={() => dispatch(removeProduct({ productId: product.id }))}></i>
                      </Td>
                    </Tr>
                  </Fragment>
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
