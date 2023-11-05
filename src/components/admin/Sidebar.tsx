import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { RootState } from '../../redux/store'

import '../../styles/sidebar.scss'

const AdminSidebar = () => {
  const { userData } = useSelector((state: RootState) => state.users)

  return (
    <aside className="sidebar-body">
      <nav className="menu">
        <ul>
          <Link className="span" to={`/dashboard/${userData?.role}/profile`}>
            <header className="avatar">
              <img
                src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                alt="Avatar"
              />
              <h2>
                {userData?.firstName} {userData?.lastName}
              </h2>
              <h4>{userData?.role}</h4>
            </header>
          </Link>

          {userData?.role === 'admin' ? (
            <>
              <Link className="span" to="/dashboard/admin/products">
                <li className="icon-products">Products</li>
              </Link>
              <Link className="span" to="/dashboard/admin/categories">
                <li className="icon-categories">Categories</li>
              </Link>
              <Link className="span" to="/dashboard/admin/userslist">
                <li className="icon-users">Users</li>
              </Link>
              <Link className="span" to="/dashboard/admin/orders">
                <li className="icon-orders">Orders</li>
              </Link>
            </>
          ) : (
            <Link className="span" to="/dashboard/user/orders">
              <li className="icon-order">Orders</li>
            </Link>
          )}
        </ul>
      </nav>
    </aside>
  )
}

export default AdminSidebar
