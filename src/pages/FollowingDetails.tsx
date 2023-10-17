import { Link, useParams } from "react-router-dom"
import Navbar from "../components/NavBar/navbar"
import { useSelector } from "react-redux"
import axios from "axios"
import { useState, useEffect } from "react"
import { api, videoApis } from "../api/axios-instance"
import "../styles/css/sidebar.css"
import "../styles/css/userdetails.css"
import RightBottomActionButton from "../components/PageComponents/RightBottomActionButton"
import MainSidebar from "../components/Sidebar/MainSidebar"

const followUser = async (userId: string | undefined) => {
    try {
        await axios.post(`/${userId}`)
    } catch (e) {
        console.log(e)
    }
}

const unfollowUser = async (userId: string | undefined) => {
    try {
        await axios.delete(`/${userId}`)
    } catch (e) {
        console.log(e)
    }
}

const UserFollowDetails = () => {
    const [videoList, setVideoList] = useState([])
    const fetchVideos = async () => {
        try {
            const res = await videoApis.get("videos")
            setVideoList(res.data)
        } catch (e) {
            if (e.response && e.response.status == 429) {
                const retryDelay = 500
                setTimeout(() => fetchVideos(), retryDelay)
            } else {
                console.log("fail")
            }
        }
    }
    useEffect(() => {
        fetchVideos()
    })
    const [user, setUser] = useState()

    const params = useParams()
    const userId = params.userId

    useEffect(() => {
        api.get(`/users/${userId}`)
            .then((res) => {
                setUser(res.data)
            })
            .catch((e) => console.log(e))
    }, [])
    const userLogin = useSelector((state) => state.userLogin)
    const userFollowId = userLogin?.id == params.userId

    const [isFollowing, setIsFollowing] = useState(false)

    useEffect(() => {
        const storedStatus = localStorage.getItem("isFollowing")
        if (storedStatus) {
            setIsFollowing(JSON.parse(storedStatus))
        }
    }, [])

    const handleFollowClick = () => {
        if (isFollowing) {
            unfollowUser(userId)
        } else {
            followUser(userId)
        }
        setIsFollowing(!isFollowing)
        localStorage.setItem("isFollowing", JSON.stringify(!isFollowing))
    }

    let followandEditBtn
    if (userFollowId) {
        followandEditBtn = (
            <div className="button__action">
                <button
                    className="followBtn"
                    style={{
                        marginTop: "-20px",
                        backgroundColor: "#252525",
                        borderRadius: "3px",
                        marginRight: "10px",
                        border: "1px solid #fff",
                        padding: "0.6em 0",
                        fontSize: "1em",
                        fontWeight: "500",
                        fontFamily: "inherit",
                        color: "#fff",
                        cursor: "pointer",
                        width: "210px",
                        transition: "border-color 0.25s"
                    }}
                >
                    <i className="fa-regular fa-pen-to-square" style={{ marginRight: "8px" }}></i>Edit Profile
                </button>
            </div>
        )
    } else {
        followandEditBtn = (
            <div className="button__action">
                <button
                    className="followBtn"
                    onClick={handleFollowClick}
                    style={{
                        marginTop: "-20px",
                        backgroundColor: isFollowing ? "#252525" : "#f22459",
                        borderRadius: "3px",
                        marginRight: "10px",
                        border: isFollowing ? "1px solid #f22459" : "1px solid transparent",
                        padding: "0.6em 0",
                        fontSize: "1em",
                        fontWeight: "500",
                        fontFamily: "inherit",
                        color: isFollowing ? "#f22459" : "#fff",
                        cursor: "pointer",
                        width: "210px",
                        transition: "border-color 0.25s"
                    }}
                >
                    {isFollowing ? "Following" : "Follow"}
                </button>
            </div>
        )
    }
    return (
        <div id="userDetailsPage">
            <Navbar />
            <div id="nav">
                <MainSidebar />
            </div>
            <div id="detailedUser">
                <div className="detailedUserComponents">
                    <RightBottomActionButton />
                    <div className="detailedUserInfo">
                        <div className="detailedUserName">
                            <div className="detailedUserAvatar">
                                <span className="avatarCircle">
                                    <img src={user?.image} className="avatar" />
                                </span>
                            </div>
                            <div className="detailed__username">
                                <p className="detailUsername">
                                    <b>{user?.username}</b>
                                </p>
                                <p className="detailFullname">{user?.fullname}</p>
                                {followandEditBtn}
                            </div>
                        </div>
                        <h3 className="detailedAmount">
                            <div>
                                <b>{user?.followingAmount}</b>
                                <span>Following</span>
                            </div>
                            <div>
                                <b>{user?.followersAmount}</b>
                                <span>Followers</span>
                            </div>
                            <div>
                                <b>{user?.reactAllAmount}</b>
                                <span>Likes</span>
                            </div>
                            <div className="advancedAction">
                                <span>
                                    <i className="fa-solid fa-ellipsis"></i>
                                </span>
                                <span>
                                    <i className="fa-solid fa-share"></i>
                                </span>
                            </div>
                        </h3>
                        <h2 className="user__desc">{user?.description}</h2>
                    </div>
                </div>
                <h3 className="videosHeaders">Videos</h3>
                <div className="userContainer">
                    <div className="userVideo">
                        {videoList.map((user, index) => (
                            <>
                                <div className="userInfo" key={index}>
                                    <Link to={`/userFollow/${user.id}`}>
                                        <img src={user?.imgVideo} className="imgUser" />
                                    </Link>
                                    <div className="userFollow">
                                        <Link
                                            to={`/userFollow/${user.id}`}
                                            style={{ textDecoration: "0", color: "#fff" }}
                                        >
                                            <i className="fa-solid fa-play fa-fade"></i>
                                            <span className="detailedViewers">{user?.savedAmount}</span>
                                        </Link>
                                    </div>
                                    <div className="video__desc">{user?.description}</div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserFollowDetails
