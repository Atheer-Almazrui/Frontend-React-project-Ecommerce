import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { login } from '../redux/slices/users/userSlice'

import '../styles/login.scss'

const Login = ({ pathName }: { pathName: string }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { users } = useSelector((state: RootState) => state.users)

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

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
      if (formData.email === '' || formData.password === '') {
        toast.error('You have to enter data')
        return
      } else {
        const foundUser = users.find((userData) => userData.email === formData.email)

        if (!foundUser) {
          toast.error('User Not found 😶')
          return
        }

        if (foundUser.password !== formData.password) {
          toast.error('Wrong password 😟')
          return
        }

        if (foundUser.ban) {
          toast.error('Sorry Your are banned 🚫')
          return
        }

        if (foundUser && foundUser.password === formData.password) {
          dispatch(login(foundUser))
          foundUser.role === 'admin'
            ? navigate(pathName ? pathName : '/dashboard/admin/profile')
            : navigate(pathName ? pathName : '/')
        }
      }
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
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
        <label>
          Email :
          <input
            className="form-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password :
          <input
            className="form-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button className="form-button" type="submit">
          Log in
        </button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login
