import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Product, searchProductByName, sortProducts } from '../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../redux/store'

import HeroSection from '../components/HeroSection'
import '../styles/home.scss'
import { addToCart } from '../redux/slices/cart/cartSlice'

const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { searchWord, products, isLoading, error } = useSelector(
    (state: RootState) => state.products
  )
  const { categories } = useSelector((state: RootState) => state.categories)

  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 3

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value
    dispatch(searchProductByName(searchTerm))
  }

  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    const sortedType = event.target.value
    dispatch(sortProducts(sortedType))
  }

  const handleCategoryFilter = (categoryId: number) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    } else {
      setSelectedCategories([...selectedCategories, categoryId])
    }
  }

  const searchedProducts = searchWord
    ? products.filter((product) => product.name.toLowerCase().includes(searchWord.toLowerCase()))
    : products

  const filteredProducts =
    selectedCategories.length > 0
      ? searchedProducts.filter((product) =>
          product.categories.some((category) => selectedCategories.includes(category))
        )
      : searchedProducts

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
  }

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
    toast.success('Item added to cart ✨🛒')
  }

  if (isLoading) {
    return <h1>Products are loading...</h1>
  }
  if (error) {
    return <h1>{error}</h1>
  }

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  return (
    <div>
      <HeroSection />
      <div className="grid-container">
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="🔎  Discover Amazing Products.."
            value={searchWord}
            onChange={handleSearch}
          />
          <select className="select" name="sort" id="sort" onChange={handleSort}>
            <option hidden>Sort by</option>
            <option value="priceASC">Price: Low to High</option>
            <option value="priceDESC">Price: High to Low</option>
            <option value="nameASC">Name: A to Z</option>
            <option value="nameDESC">Name: Z to A</option>
          </select>
        </div>
        <div className="category-buttons">
          <button
            className={selectedCategories.length === 0 ? 'active' : ''}
            onClick={() => setSelectedCategories([])}>
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={selectedCategories.includes(category.id) ? 'active' : ''}
              onClick={() => handleCategoryFilter(category.id)}>
              {category.name}
            </button>
          ))}
        </div>
        <div className="grid">
          {currentProducts.length > 0 &&
            currentProducts.map((product: Product) => (
              <div className="card" key={product.id}>
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                </Link>

                <h3>{product.name}</h3>
                <span>{product.description}</span>
                <h2>${product.price}</h2>
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            ))}
          {currentProducts.length === 0 && <h2>No products found.</h2>}
        </div>
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={handlePrevPage}
            className="pagination-button">
            Previous
          </button>
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
          <button
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
            className="pagination-button">
            Next
          </button>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  )
}

export default Home
