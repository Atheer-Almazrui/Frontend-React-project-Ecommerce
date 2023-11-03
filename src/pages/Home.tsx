import { ChangeEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  Product,
  fetchProducts,
  searchProductByName,
  sortProducts
} from '../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../redux/store'

import HeroSection from '../components/HeroSection'
import '../styles/home.scss'

const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { searchWord, products, isLoading, error } = useSelector(
    (state: RootState) => state.products
  )

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  if (isLoading) {
    return <h1>Products are loading...</h1>
  }
  if (error) {
    return <h1>{error}</h1>
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value
    dispatch(searchProductByName(searchTerm))
  }

  const searchedProducts = searchWord
    ? products.filter(
        (product) => product.name.toLowerCase().includes(searchWord.toLowerCase()) === true
      )
    : products

  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    const sortedType = event.target.value
    dispatch(sortProducts(sortedType))
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
        <div className="grid">
          {searchedProducts.length > 0 &&
            searchedProducts.map((product: Product) => (
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
