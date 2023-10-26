import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import AdminSidebar from './AdminSidebar'
import { useEffect } from 'react'
import { fetchCategories, removeCategory } from '../../redux/slices/categories/categorySlice'

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { categories, isLoading, error } = useSelector((state: RootState) => state.categories)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  if (isLoading) {
    return <h1>Categories are loading...</h1>
  }
  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <div className="container">
      <AdminSidebar />
      <div className="product-grid product-grid--columns-1 product-grid--columns-md-2 product-grid--full-width">
        {/* <NewProductWrapper /> */}
        <div className="product-card--grid product-card--gap-4">
          <ul>
            {categories.map((category) => (
              <li key={category.id} className="product-item">
                <p>{category.id}</p>
                <h5>{category.name}</h5>
                <button
                  className="product-item__delete-button"
                  onClick={() => dispatch(removeCategory({ categoryId: category.id }))}>
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Categories
