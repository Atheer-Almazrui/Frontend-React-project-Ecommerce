import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'
import { banUser, removeUser } from '../../redux/slices/users/userSlice'

import Sidebar from './Sidebar'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table'

const UsersList = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { users, isLoading, error } = useSelector((state: RootState) => state.users)

  if (isLoading) {
    return <h1>Users are loading...</h1>
  }
  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <div className="container">
      <Sidebar />
      <div className="sidebar-container">
        <h1 className="title">Users</h1>
        <div className="table-container">
          <Table className="table">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Email</Th>
                <Th>role</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => {
                if (user.role !== 'admin') {
                  return (
                    <Tr key={user.id}>
                      <Td>{user.id}</Td>
                      <Td>{user.firstName}</Td>
                      <Td>{user.lastName}</Td>
                      <Td>{user.email}</Td>
                      <Td>{user.role}</Td>
                      <Td>
                        <i
                          className={
                            user.ban ? 'fas fa-lock ban-icon' : 'fas fa-lock-open unban-icon'
                          }
                          onClick={() => dispatch(banUser({ userId: user.id }))}></i>
                        <i
                          className="fa fa-window-close action-icons"
                          onClick={() => dispatch(removeUser({ userId: user.id }))}></i>
                      </Td>
                    </Tr>
                  )
                }
              })}
            </Tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default UsersList
