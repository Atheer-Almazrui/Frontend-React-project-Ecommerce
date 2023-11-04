import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { fetchUsers } from './redux/slices/users/userSlice'
import { AppDispatch } from './redux/store'

import Index from './routes/Index'
import '@fortawesome/fontawesome-free/css/all.css'

function App() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  return (
    <div>
      <Index />
    </div>
  )
}

export default App
