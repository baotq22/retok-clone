import "../styles/css/videos.css"
import "../styles/css/sidebar.css"
import NavBar from "../components/NavBar/navbar"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VideoList from "../components/PageComponents/VideoList";
import RightBottomActionButton from "../components/PageComponents/RightBottomActionButton";
import { videoApis } from "../api/axios-instance";
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
    const user_id = userLogin?.id;

    return (
        <div id="foryouPage">
            <NavBar />
            <div id="foryou">
                <div id="video">
                    <VideoList userId={user_id} />
                    <RightBottomActionButton />
                </div>
            </div>
            <div id="nav">
                <MainSidebar />
            </div>
        </div>

    )
}

export default ForYou