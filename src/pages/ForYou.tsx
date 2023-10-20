import "../styles/css/videos.css"
import "../styles/css/sidebar.css"
import NavBar from "../components/NavBar/navbar"
import VideoList from "../components/PageComponents/VideoList"
import RightBottomActionButton from "../components/PageComponents/RightBottomActionButton"
import MainSidebar from "../components/Sidebar/MainSidebar"

const ForYou = () => {
    const user_id = localStorage.getItem("id")

    return (
        <div id="foryouPage">
            <NavBar />
            <div id="foryou">
                <div id="video">
                    <VideoList userId={user_id} />
                </div>
            </div>
            <div id="nav">
                <MainSidebar />
            </div>
            <RightBottomActionButton />
        </div>
    )
}

export default ForYou
