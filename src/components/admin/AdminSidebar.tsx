import { Link } from 'react-router-dom'

import '../../styles/sidebar.scss'

const AdminSidebar = () => {
  return (
    <aside className="sidebar-body">
      <nav className="menu" tabIndex={0}>
        <div className="smartphone-menu-trigger"></div>
        <header className="avatar">
          <img
            src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
            alt="Avatar"
          />
          <h2>John D.</h2>
        </header>
        <ul>
          <Link className="span" to="/dashboard/admin/products">
            <li className="icon-products">Products</li>
          </Link>

          <Link className="span" to="/dashboard/admin/categories">
            <li className="icon-categories">Categories</li>
          </Link>

          <Link className="span" to="/dashboard/admin/userslist">
            <li className="icon-users">Users</li>
          </Link>
        </ul>
      </nav>

      {/* <main className="main">
        <div className="helper"></div>
      </main> */}
    </aside>
  )
}

export default AdminSidebar
