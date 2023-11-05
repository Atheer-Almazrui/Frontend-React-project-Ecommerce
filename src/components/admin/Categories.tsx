import { useDispatch, useSelector } from 'react-redux'
import { ChangeEvent, FormEvent, Fragment, useState } from 'react'

import { AppDispatch, RootState } from '../../redux/store'
import {
  Category,
  addCategory,
  removeCategory,
  updateCategory
} from '../../redux/slices/categories/categorySlice'

import Sidebar from './Sidebar'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table'

const initialCategoryState: Category = {
  id: 0,
  name: ''
}

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [category, setCategory] = useState<Category>(initialCategoryState)
  const [isAdding, setIsAdding] = useState(false)
  const [newCategoryID, setNewCategoryID] = useState(0)

  const [isEditing, setIsEditing] = useState(false)
  const [editedID, setEditedID] = useState(0)
  const [editedCategory, setEditedCategory] = useState<Category>(category)

  const { categories, isLoading, error } = useSelector((state: RootState) => state.categories)

  const handleAddClick = () => {
    setNewCategoryID(+new Date())
    setIsAdding(true)
  }

  const handleEditClick = (category: Category) => {
    setEditedCategory(category)
    setEditedID(category.id)
    setIsEditing(true)
  }

  const handleUpdateProduct = () => {
    dispatch(updateCategory({ editedCategory: editedCategory }))
    setIsEditing(false)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newCategoryName = event.target.value

    if (isEditing) {
      setEditedCategory({ id: editedID, name: newCategoryName })
    } else {
      setCategory({ id: newCategoryID, name: newCategoryName })
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    dispatch(addCategory({ category }))

    setIsAdding(false)
    // Reset the form
    setCategory(initialCategoryState)
  }

  if (isLoading) {
    return <h1>Categories are loading...</h1>
  }
  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <div className="container">
      <Sidebar />
      <div className="sidebar-container">
        <h1 className="title">Categories</h1>
        <button className="floating-button" onClick={handleAddClick}>
          +
        </button>
        <div className="table-container">
          <form onSubmit={handleSubmit}>
            <Table className="table">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Category Name</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {isAdding && (
                  <Tr>
                    <Td className="td-id">{newCategoryID}</Td>
                    <Td>
                      <input
                        className="input-field"
                        type="text"
                        name="name"
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
                {categories.map((category) => (
                  <Fragment key={category.id}>
                    {isEditing && editedID == category.id && (
                      <Tr>
                        <Td className="td-id">{editedCategory.id}</Td>
                        <Td>
                          <input
                            className="input-field"
                            type="text"
                            name="name"
                            value={editedCategory.name}
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
                      <Td>{category.id}</Td>
                      <Td>{category.name}</Td>
                      <Td>
                        <i
                          className="fa fa-pencil action-icons"
                          onClick={() => handleEditClick(category)}></i>
                        <i
                          className="fa fa-window-close action-icons"
                          onClick={() => dispatch(removeCategory({ categoryId: category.id }))}></i>
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

export default Categories
