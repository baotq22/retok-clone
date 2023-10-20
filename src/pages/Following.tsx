import "../styles/css/videos.css"
import "../styles/css/sidebar.css"
import NavBar from "../components/NavBar/navbar"
import "../library/fontawesome/css/all.min.css"
import RightBottomActionButton from "../components/PageComponents/RightBottomActionButton"
import VideoListFollowing from "../components/PageComponents/VideoListFollowing"
import MainSidebar from "../components/Sidebar/MainSidebar"
import UserFeatured from "~/components/PageComponents/UserFeatured"

const ForYou = () => {
    const userLogin = localStorage.getItem("username")
    const userLogged = !userLogin
    const user_id = localStorage.getItem("id")

    return (
        <div id="foryouPage">
            {userLogged ? (
                <div id="userNotLogin">
                    <div className="userContainer">
                        <UserFeatured />
                    </div>
                </div>
            ) : (
                <div id="foryou">
                    <div id="video">
                        <VideoListFollowing userId={user_id} />
                    </div>
                </div>
            )}
            <div id="nav">
                <MainSidebar />
            </div>
            <RightBottomActionButton />
            <NavBar />
        </div>
    )
}

export default ForYou
