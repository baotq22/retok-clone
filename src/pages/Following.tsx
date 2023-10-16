import '../styles/css/videos.css'
import '../styles/css/sidebar.css'
import NavBar from "../components/NavBar/navbar"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import '../library/fontawesome/css/all.min.css'
import { useSelector } from "react-redux";
import RightBottomActionButton from "../components/PageComponents/RightBottomActionButton";
import { videoApis } from "../api/axios-instance";
import AboutSidebar from "../components/Sidebar/AboutSidebar";
import FollowingSideBar from "../components/Sidebar/FollowingSideBar";
import VideoListFollowing from "../components/PageComponents/VideoListFollowing";

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
    const userLogged = !userLogin?.username;

    const user_id = userLogin?.id;

    const preventFailedScreen = () => {
        window.location.reload(false);
    }

    return (
        <div id='followingPage'>
            {userLogged ? (
                <div id='userNotLogin'>
                    <div className='userContainer'>
                        <div className='userVideo'>
                            {
                                videoList.map((user, index) =>
                                    <div className='userInfo' key={index}>
                                        <Link to={`/userFollow/${user.id}`}>
                                            <img src={user?.imgVideo} className='imgUser' />
                                        </Link>
                                        <div className='userFollow'>
                                            <Link to={`/userFollow/${user.id}`} style={{ textDecoration: '0', color: '#fff' }}>
                                                <img src={user?.avatar} className='avatarUser' />
                                                <h3 className='user'><b>{user?.username}</b></h3>
                                                <h4 className='user'>{user?.fullname}</h4>
                                            </Link>
                                            <button className='followBtn'>Follow</button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <RightBottomActionButton />
                    </div>
                </div>
            ) : (
                <div id='foryou'>
                    <div id='video'>
                        <VideoListFollowing userId={user_id} />
                        <RightBottomActionButton />
                    </div>
                </div>
            )
            }
            <div id='nav'>
                <ul className='itemLinkAll'>
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
            <NavBar />
        </div>
    )
}

export default ForYou