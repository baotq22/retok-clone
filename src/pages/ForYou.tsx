import '../styles/css/videos.css'
import '../styles/css/sidebar.css'
import NavBar from "../components/NavBar/navbar"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VideoList from "../components/PageComponents/VideoList";
import RightBottomActionButton from "../components/PageComponents/RightBottomActionButton";
import { videoApis } from "../api/axios-instance";
import AboutSidebar from "../components/Sidebar/AboutSidebar";
import FollowingSideBar from "../components/Sidebar/FollowingSideBar";

const ForYou = () => {
    const [videoList, setVideoList] = useState([])

    const fetchVideos = async () => {
        try {
            const res = await videoApis.get('videos');
            setVideoList(res.data)
        } catch (e) {
            if (e.response && e.response.status == 429) {
                const retryDelay = 500;
                setTimeout(() => fetchVideos(), retryDelay)
            } else {
                console.log("fail")
            }
        }
    }
    useEffect(() => {
        fetchVideos();
    }, [])

    const userLogin = useSelector(state => state.userLogin)
    const user_id = userLogin?.id;

    const preventFailedScreen = () => {
        window.location.reload(false);
    }

    return (

        <div id='foryouPage'>
            <NavBar />
            <div id='foryou'>
                <div id='video'>
                    <VideoList userId={user_id} />
                    <RightBottomActionButton />
                </div>
            </div>
            <div id='nav'>
                <ul className='itemLinkAll'>
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
            </div>
        </div>

    )
}

export default ForYou