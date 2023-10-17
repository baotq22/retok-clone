import { Link, useLocation } from "react-router-dom";
import FollowingSideBar from "./FollowingSideBar";
import AboutSidebar from "./AboutSidebar";

const MainSidebar = () => {
    const location = useLocation();
    const url = location.pathname;

    const preventFailedScreen = () => {
        window.location.reload(false);
    }

    let content;

    if (url == '/') {
        content = (
            <>
                <li className='itemLink' onClick={preventFailedScreen}>
                    <Link to={`/`} className='mainLink'>
                        <div className="nav selected">
                            <i className='icon fa-solid fa-home'></i><span>For you</span>
                        </div>
                    </Link>
                </li>
                <li className='itemLink' onClick={preventFailedScreen}>
                    <Link to={`/following`} className='mainLink'>
                        <div className="nav">
                            <i className="icon fa-solid fa-user-group"></i><span>Following</span>
                        </div>
                    </Link>
                </li>
            </>
        )
    } else if (url == '/following') {
        content = (
            <>
                <li className='itemLink' onClick={preventFailedScreen}>
                    <Link to={`/`} className='mainLink'>
                        <div className="nav">
                            <i className='icon fa-solid fa-home'></i><span>For you</span>
                        </div>
                    </Link>
                </li>
                <li className='itemLink' onClick={preventFailedScreen}>
                    <Link to={`/following`} className='mainLink'>
                        <div className="nav selected">
                            <i className="icon fa-solid fa-user-group"></i><span>Following</span>
                        </div>
                    </Link>
                </li>
            </>
        )
    } else {
        content = (
            <>
                <li className='itemLink' onClick={preventFailedScreen}>
                    <Link to={`/`} className='mainLink'>
                        <div className="nav">
                            <i className='icon fa-solid fa-home'></i><span>For you</span>
                        </div>
                    </Link>
                </li>
                <li className='itemLink' onClick={preventFailedScreen}>
                    <Link to={`/following`} className='mainLink'>
                        <div className="nav">
                            <i className="icon fa-solid fa-user-group"></i><span>Following</span>
                        </div>
                    </Link>
                </li>
            </>
        )
    }

    return (
        <>
            <ul className='itemLinkAll'>
                {content}
                <li className='itemLink'>
                    <Link to={`/#`} className='mainLink'>
                        <div className="nav">
                            <i className='icon fa-solid fa-compass'></i><span>Explore</span><span id='badge'>New</span>
                        </div>
                    </Link>
                </li>
                <li className='itemLink'>
                    <Link to={`/#`} className='mainLink'>
                        <div className="nav">
                            <i className='icon fa-solid fa-video'></i><span>LIVE</span>
                        </div>
                    </Link>
                </li>
            </ul>
            <FollowingSideBar />
            <AboutSidebar />
        </>
    )
}

export default MainSidebar