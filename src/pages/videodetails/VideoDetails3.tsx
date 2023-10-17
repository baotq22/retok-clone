import { useState, useEffect } from "react"
import avatar3 from "../../assets/avatar/583.jpg"
import Video3 from "../../assets/videos/3.mp4"
import { useNavigate } from "react-router-dom"
import "../../library/fontawesome/css/all.min.css"
import "../../styles/css/videodetails.css"
import Comments from "../../components/comments/Comments"

const getReactionStatus3 = () => {
    const storedStatus3 = localStorage.getItem("video-reaction3")
    return storedStatus3 === "liked3"
}

const setReactionStatus3 = (isLiked3) => {
    localStorage.setItem("video-reaction3", isLiked3 ? "liked3" : "not-liked3")
}

const getFollowStatus3 = () => {
    const storedStatus3 = localStorage.getItem("video-follow3")
    return storedStatus3 === "followed3"
}

const setFollowStatus3 = (isFollowed3) => {
    localStorage.setItem("video-follow3", isFollowed3 ? "followed3" : "not-followed3")
}

const VideoDetails3 = () => {
    const escapeBack = () => {
        navigate(`/`)
    }
    const previousVideo = () => {
        navigate(`/videoDetails/2`)
    }
    const nextVideo = () => {
        navigate(`/videoDetails/4`)
    }
    const likeVideoByKey = () => {
        handleLikeClick3()
    }
    useEffect(() => {
        const keyDownHandler = (event) => {
            if (event.key === "Escape") {
                escapeBack()
            }

            if (event.key === "ArrowUp") {
                previousVideo()
            }

            if (event.key === "ArrowDown") {
                nextVideo()
            }

            if (event.key === "L" || event.key === "l") {
                likeVideoByKey()
            }
        }

        document.addEventListener("keydown", keyDownHandler)

        return () => {
            document.removeEventListener("keydown", keyDownHandler)
        }
    }, [])

    const navigate = useNavigate()
    const storedIdLogin = localStorage.getItem("id")

    const [isLiked3, setIsLiked3] = useState(getReactionStatus3())
    const [isFollowed3, setIsFollowed3] = useState(getFollowStatus3())

    const handleLikeClick3 = () => {
        if (isLiked3) {
            setIsLiked3(false)
            setReactionStatus3(false)
        } else {
            setIsLiked3(true)
            setReactionStatus3(true)
        }
    }

    const handleFollowClick3 = () => {
        if (isFollowed3) {
            setIsFollowed3(false)
            setFollowStatus3(false)
        } else {
            setIsFollowed3(true)
            setFollowStatus3(true)
        }
    }

    useEffect(() => {
        setIsLiked3(getReactionStatus3())
        setIsFollowed3(getFollowStatus3())
    }, [])

    return (
        <div id="videoDetailsContainer">
            <div className="videoInfo">
                <div>
                    <button onClick={() => navigate(`/`)} className="btnClose">
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                </div>
                <div>
                    <button onClick={() => navigate(`/videoDetails/2`)} className="btnUp">
                        <i className="fa-solid fa-chevron-up"></i>
                    </button>
                </div>
                <div>
                    <button onClick={() => navigate(`/videoDetails/4`)} className="btnDown">
                        <i className="fa-solid fa-chevron-down"></i>
                    </button>
                </div>
                <video loop controls autoPlay className="videoDetailsPage">
                    <source src={Video3} type="video/webm" />
                </video>
            </div>
            <div className="videoInfo">
                <div className="video_info_container">
                    <div className="info-container">
                        <div>
                            {/* <Link to={`/users/${userId}`}> */}
                            <img src={avatar3} className="avatarDetails" />
                            {/* </Link> */}
                        </div>
                        <div className="infoContainer">
                            <button
                                className="followBttn"
                                style={{
                                    float: "right",
                                    width: "80px",
                                    height: "40px",
                                    backgroundColor: isFollowed3 ? "#252525" : "#f22459",
                                    border: isFollowed3 ? "1px solid #2f2f2f" : "1px solid transparent",
                                    borderRadius: "5px",
                                    marginRight: "10px",
                                    fontFamily: "inherit",
                                    cursor: "pointer"
                                }}
                                onClick={handleFollowClick3}
                            >
                                {isFollowed3 ? "Following" : "Follow"}
                            </button>
                            {/* <Link to={`/users/${userId}`} style={{ textDecoration: "0", color: "#fff" }}> */}
                            <span>
                                <b>Grover32</b>
                            </span>
                            <div>
                                Nina Mills IV<span style={{ margin: "0px 4px" }}> · </span> <span>1h ago</span>
                            </div>
                            {/* </Link> */}
                            <div className="descVid">
                                The Football Is Good For Training And Recreational Purposes. The Football Is Good For
                                Training And Recreational Purposes
                            </div>
                        </div>
                    </div>
                    <div className="actionContainer">
                        <div className="videoActions">
                            <button className="action_btn" onClick={handleLikeClick3}>
                                <span>
                                    {isLiked3 ? (
                                        <i className="fa-solid fa-heart" style={{ color: "#fe2c55" }}></i>
                                    ) : (
                                        <i className="fa-solid fa-heart"></i>
                                    )}
                                </span>
                            </button>
                            <div className="actionAmount">{isLiked3 ? <strong>73</strong> : <strong>72</strong>}</div>

                            <button className="action_btn">
                                <span>
                                    <i className="fa-solid fa-comment-dots" style={{ fontSize: "20px" }}></i>
                                </span>
                            </button>
                            <div className="actionAmount">
                                <strong>25</strong>
                            </div>

                            <button className="action_btn">
                                <span>
                                    <i className="fa-solid fa-bookmark" style={{ fontSize: "20px" }}></i>
                                </span>
                            </button>
                            <div className="actionAmount">
                                <strong>16</strong>
                            </div>
                        </div>
                        <div className="shareBtnContainer">
                            <button className="action_btn">
                                <span>
                                    <i className="fa-solid fa-code"></i>
                                </span>
                            </button>
                            <button className="action_btn">
                                <span>
                                    <i className="fa-solid fa-paper-plane"></i>
                                </span>
                            </button>
                            <button className="action_btn">
                                <span>
                                    <i className="fa-brands fa-facebook" style={{ color: "#0075fa" }}></i>
                                </span>
                            </button>
                            <button className="action_btn">
                                <span>
                                    <i className="fa-brands fa-whatsapp" style={{ color: "#25d366" }}></i>
                                </span>
                            </button>
                            <button className="action_btn">
                                <span>
                                    <i className="fa-brands fa-twitter" style={{ color: "#1da1f2" }}></i>
                                </span>
                            </button>
                            <button className="action_btn">
                                <span>
                                    <i className="fa-solid fa-share"></i>
                                </span>
                            </button>
                        </div>
                    </div>
                    <h2>Comments (25)</h2>
                    <Comments currentUserId="1" />
                </div>
            </div>
        </div>
    )
}

export default VideoDetails3
