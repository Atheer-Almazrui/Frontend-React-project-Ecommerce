import { useDispatch, useSelector } from 'react-redux'
import { ChangeEvent, FormEvent, useState } from 'react'

import { AppDispatch, RootState } from '../../redux/store'
import { updateUser } from '../../redux/slices/users/userSlice'

import AdminSidebar from '../admin/Sidebar'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table'

const UserProfile = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { userData } = useSelector((state: RootState) => state.users)
  const [isEditing, setIsEditing] = useState(false)

  const [user, setUser] = useState({
    firstName: userData?.firstName,
    lastName: userData?.lastName
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }))
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const updatedUserData = { id: userData?.id, ...user }
    dispatch(updateUser(updatedUserData))

    // Reset form fields
    setUser({
      firstName: '',
      lastName: ''
    })
    setIsEditing(false)
  }

  return (
    <div className="container">
      <AdminSidebar />
      <div className="sidebar-container">
        <h1 className="title">User Profile</h1>
        <div className="table-container">
          <form onSubmit={handleSubmit}>
            <Table className="table">
              <Thead>
                <Tr>
                  <Th>Email</Th>
                  <Th>First Name</Th>
                  <Th>Last Name</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {isEditing ? (
                  <Tr>
                    <Td>{userData?.email}</Td>
                    <Td>
                      <input
                        className="input-field"
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                      />
                    </Td>
                    <Td>
                      <input
                        className="input-field"
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                      />
                    </Td>
                    <Td>
                      <button className="save-update-buttons" type="submit">
                        Update
                      </button>
                    </Td>
                  </Tr>
                ) : (
                  <Tr>
                    <Td>{userData?.email}</Td>
                    <Td>{userData?.firstName}</Td>
                    <Td>{userData?.lastName}</Td>
                    <Td>
                      <i
                        className="fa fa-pencil action-icons"
                        onClick={() => handleEditClick()}></i>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
