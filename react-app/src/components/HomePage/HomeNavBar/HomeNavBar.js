
import HomeButton from './HomeButton'
import ServerList from './ServerList'
import AddServerButton from './AddServerButton/AddServerButton'
import ExploreServersButton from './ExploreServersButton'

const HomeNavBar = () => {
  return(
    <>
      <nav className="home-nav-bar">
        <ul>
          <div>
            <HomeButton/>
          </div>
          <div>
            <ServerList/>
          </div>
          <div>
            <AddServerButton/>
          </div>
          <div>
            <ExploreServersButton/>
          </div>
        </ul>
      </nav>
    </>
  )
}

export default HomeNavBar
