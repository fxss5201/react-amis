import { Link, Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <>
      <div style={{padding: '15px'}}>
        <Link to="/test">test</Link>
        <Link to="/about" style={{marginLeft: '15px'}}>about</Link>
      </div>
      <Outlet />
    </>
  )
}

export default Layout;
