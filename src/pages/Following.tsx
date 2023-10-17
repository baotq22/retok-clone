import "../styles/css/videos.css"
import "../styles/css/sidebar.css"
import NavBar from "../components/NavBar/navbar"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../library/fontawesome/css/all.min.css"
import { useSelector } from "react-redux";
import RightBottomActionButton from "../components/PageComponents/RightBottomActionButton";
import { videoApis } from "../api/axios-instance";
import VideoListFollowing from "../components/PageComponents/VideoListFollowing";
import MainSidebar from "../components/Sidebar/MainSidebar";

const ForYou = () => {
    const [videoList, setVideoList] = useState([])
    const fetchVideos = async () => {
        try {
            const res = await videoApis.get("videos");
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

    return (
        <div id="followingPage">
            {userLogged ? (
                <div id="userNotLogin">
                    <div className="userContainer">
                        <div className="userVideo">
                            {
                                videoList.map((user, index) =>
                                    <div className="userInfo" key={index}>
                                        <Link to={`/userFollow/${user.id}`}>
                                            <img src={user?.imgVideo} className="imgUser" />
                                        </Link>
                                        <div className="userFollow">
                                            <Link to={`/userFollow/${user.id}`} style={{ textDecoration: "0", color: "#fff" }}>
                                                <img src={user?.avatar} className="avatarUser" />
                                                <h3 className="user"><b>{user?.username}</b></h3>
                                                <h4 className="user">{user?.fullname}</h4>
                                            </Link>
                                            <button className="followBtn">Follow</button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <RightBottomActionButton />
                    </div>
                </div>
            ) : (
                <div id="foryou">
                    <div id="video">
                        <VideoListFollowing userId={user_id} />
                        <RightBottomActionButton />
                    </div>
                </div>
            )
            }
            <div id="nav">
                <MainSidebar />
            </div>
            <NavBar />
        </div>
    )
}

export default ForYou