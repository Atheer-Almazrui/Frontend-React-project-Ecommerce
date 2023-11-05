import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AppDispatch } from '../redux/store'
import { addUser, fetchUsers } from '../redux/slices/users/userSlice'

import '../styles/login.scss'

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user',
    ban: false
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
      if (
        formData.email === '' ||
        formData.password === '' ||
        formData.firstName === '' ||
        formData.lastName === ''
      ) {
        toast.error('You have to enter data')
        return
      } else {
        const newUser = { id: new Date().getTime(), ...formData }
        dispatch(fetchUsers()).then(() => dispatch(addUser(newUser)))
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }

    // Reset form fields
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'user',
      ban: false
    })
  }
  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
        <label>
          First Name :
          <input
            className="form-input"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name :
          <input
            className="form-input"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>
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
          Sign up
        </button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Signup
