import React , {useState} from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import PrivateRoutes from '../Routes/Routes'

const Wrapper = () => {
  const [sideBarToggle , setSideBarToggle] = useState(false);

  // dispatch()

  return (
    <>
    <div style={{ width: "auto !important" }} >
    <Header setSideBarToggle={setSideBarToggle} sideBarToggle={sideBarToggle}/>
    <div className={sideBarToggle ? 'sidebar-enable vertical-collpsed' :  ''}><Sidebar />
    <PrivateRoutes/>
    <Footer/></div>
    
    </div>
    </>
  )
}

export default Wrapper