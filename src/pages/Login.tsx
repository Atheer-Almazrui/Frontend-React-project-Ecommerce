import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { fetchUsers, login } from '../redux/slices/users/userSlice'

import '../styles/login.scss'
const Login = ({ pathName }: { pathName: string }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { users } = useSelector((state: RootState) => state.users)

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const foundUser = users.find((userData) => userData.email === formData.email)
      if (foundUser && foundUser.password === formData.password) {
        dispatch(login(foundUser))
        foundUser.role === 'admin'
          ? navigate(pathName ? pathName : '/dashboard/admin/profile')
          : navigate(pathName ? pathName : '/')
      } else {
        toast.error('Wrong email or password 😟')
      }

      console.log('Email:', formData.email)
      console.log('Password:', formData.password)
    } catch (error) {
      console.log(error)
    }

    // Reset form fields
    setFormData({
      email: '',
      password: ''
    })
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            className="login-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            className="login-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button className="login-button" type="submit">
          Log in
        </button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login
