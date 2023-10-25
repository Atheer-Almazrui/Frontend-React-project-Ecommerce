import AdminSidebar from './AdminSidebar'
import '../styles/sidebar.scss' // it's already take the style from <AdminSidebar /> !! no need to call it

const Categories = () => {
  return (
    <div className="container">
      <div>Categories for Admin</div>
      <AdminSidebar />
    </div>
  )
}

export default Categories
