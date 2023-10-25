import { Grid, Card, CardContent, Typography, Button, Box, Container } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { productsRequest, productsSuccess } from '../redux/slices/products/productSlice'
import api from '../api'
import { AppDispatch, RootState } from '../redux/store'
// import { theme } from '../theme'
// import { ThemeProvider } from '@emotion/react/types/theming'

const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const products = state.products

  useEffect(() => {
    handleGetProducts()
  }, [])

  /**
   * If you want to keep things simple you can follow this approach on updating
   * redux state when using async requests instead of using createAsyncThunk
   */
  const handleGetProducts = async () => {
    // let's first turn the loader to true so we can have a better UX
    dispatch(productsRequest())

    // Fetching from the local files
    const res = await api.get('/mock/e-commerce/products.json')
    // At this point we have the data so let's update the store
    dispatch(productsSuccess(res.data))
  }

  return (
    <Container>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 10 }}>
        {products.items.map((product) => (
          <Grid item xs={12} sm={6} md={3} my={5} key={product.id}>
            <Card>
              <Box p={3}>
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <img src={product.image} alt={product.name} style={{ width: '50%' }} />
                  <Typography variant="body2">{product.description}</Typography>
                  <Typography variant="subtitle1">Price: $1000</Typography>
                </CardContent>

                <Button variant="contained" color="primary">
                  Add to Cart
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Home
