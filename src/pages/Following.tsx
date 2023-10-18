import "../styles/css/videos.css"
import "../styles/css/sidebar.css"
import NavBar from "../components/NavBar/navbar"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import "../library/fontawesome/css/all.min.css"
import { useSelector } from "react-redux"
import RightBottomActionButton from "../components/PageComponents/RightBottomActionButton"
import { videoApis } from "../api/axios-instance"
import VideoListFollowing from "../components/PageComponents/VideoListFollowing"
import MainSidebar from "../components/Sidebar/MainSidebar"
import UserFeatured from "~/components/PageComponents/UserFeatured"

const ForYou = () => {
    const userLogin = useSelector((state) => state.userLogin)
    const userLogged = !userLogin?.username
    const user_id = userLogin?.id

    return (
        <div id="foryouPage">
            {userLogged ? (
                <div id="userNotLogin">
                    <div className="userContainer">
                        <UserFeatured />
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
            )}
            <div id="nav">
                <MainSidebar />
            </div>
            <NavBar />
        </div>
    )
}

export default ForYou
