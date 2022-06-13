
import HomeButton from './HomeButton'
import ServerList from './ServerList'
import AddServerButton from './AddServerButton/AddServerButton'
import ExploreServersButton from './ExploreServersButton'

const HomeNavBar = () => {
  return(
    <>
      <nav className="home-nav-bar">
        <ul>
          <div className='home-nav-bar-home-button'>
            <HomeButton/>
          </div>
          <div className='home-nav-bar-item'>
            <ServerList/>
          </div>
          <div className='home-nav-bar-item'>
            <AddServerButton/>
          </div>
          <div className='home-nav-bar-item'>
            <ExploreServersButton/>
          </div>
        </ul>
      </nav>
    </>
  )
}

export default HomeNavBar
