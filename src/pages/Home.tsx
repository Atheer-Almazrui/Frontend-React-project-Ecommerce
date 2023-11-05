import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Product, searchProductByName, sortProducts } from '../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../redux/store'

import HeroSection from '../components/HeroSection'
import '../styles/home.scss'

const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { searchWord, products, isLoading, error } = useSelector(
    (state: RootState) => state.products
  )
  const { categories } = useSelector((state: RootState) => state.categories)
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])

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
    ? products.filter(
        (product) => product.name.toLowerCase().includes(searchWord.toLowerCase()) === true
      )
    : products

  const filteredProducts =
    selectedCategories.length > 0
      ? searchedProducts.filter((product) =>
          product.categories.some((category) => selectedCategories.includes(category))
        )
      : searchedProducts

  if (isLoading) {
    return <h1>Products are loading...</h1>
  }
  if (error) {
    return <h1>{error}</h1>
  }

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
          {filteredProducts.length > 0 &&
            filteredProducts.map((product: Product) => (
              <div className="card" key={product.id}>
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                </Link>

                <h3>{product.name}</h3>
                <span>{product.description}</span>
                <h2>${product.price}</h2>
                <button>Add to Cart</button>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Home
