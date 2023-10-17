import { useState, useEffect } from "react";
import avatar1 from "../../assets/avatar/245.jpg"
import Video1 from "../../assets/videos/1.mp4"
import { useNavigate } from "react-router-dom";
import "../../library/fontawesome/css/all.min.css"
import "../../styles/css/videodetails.css"
import Comments from "../../components/comments/Comments"

const getReactionStatus1 = () => {
    const storedStatus1 = localStorage.getItem("video-reaction1");
    return storedStatus1 === "liked1";
}

const setReactionStatus1 = (isLiked1) => {
    localStorage.setItem("video-reaction1", isLiked1 ? "liked1" : "not-liked1")
}

const getFollowStatus1 = () => {
    const storedStatus1 = localStorage.getItem("video-follow1");
    return storedStatus1 === "followed1";
}

const setFollowStatus1 = (isFollowed1) => {
    localStorage.setItem("video-follow1", isFollowed1 ? "followed1" : "not-followed1")
}

const VideoDetails1 = () => {

    const escapeBack = () => {
        navigate(`/`)
    }
    const nextVideo = () => {
        navigate(`/videoDetails/2`)
    }
    const likeVideoByKey = () => {
        handleLikeClick1()
    }
    useEffect(() => {
        const keyDownHandler = event => {
            console.log(event.key)
            if (event.key === "Escape") {
                escapeBack();
            }

            if (event.key === "ArrowDown") {
                nextVideo();
            }

            if (event.key === "L" || event.key === "l") {
                likeVideoByKey();
            }
        }

        document.addEventListener("keydown", keyDownHandler);

        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        }
    }, [])

    const navigate = useNavigate();
    const storedIdLogin = localStorage.getItem("id");

    const [isLiked1, setIsLiked1] = useState(getReactionStatus1());
    const [isFollowed1, setIsFollowed1] = useState(getFollowStatus1());

    const handleLikeClick1 = () => {
        if (isLiked1) {
            setIsLiked1(false);
            setReactionStatus1(false);
        } else {
            setIsLiked1(true);
            setReactionStatus1(true);
        }
    };

    const handleFollowClick1 = () => {
        if (isFollowed1) {
            setIsFollowed1(false);
            setFollowStatus1(false);
        } else {
            setIsFollowed1(true);
            setFollowStatus1(true);
        }
    }

    useEffect(() => {
        setIsLiked1(getReactionStatus1());
        setIsFollowed1(getFollowStatus1());
    }, [])

    return (
        <div id="videoDetailsContainer">
            <div className="videoInfo">
                <div>
                    <button className="btnClose" onClick={() => navigate(`/`)}><i className="fa-solid fa-arrow-left"></i></button>
                </div>
                <div>
                    <button onClick={() => navigate(`/videoDetails/2`)} className="btnDown"><i className="fa-solid fa-chevron-down"></i></button>
                </div>
                <video loop controls autoPlay className="videoDetailsPage">
                    <source src={Video1} type="video/webm" />
                </video>
            </div>
            <div className="videoInfo">
                <div className="video_info_container">
                    <div className="info-container">
                        <div>
                            {/* <Link to={`/users/${userId}`}> */}
                            <img src={avatar1} className="avatarDetails" />
                            {/* </Link> */}
                        </div>
                        <div className="infoContainer">
                            <button className="followBttn"
                                style={{
                                    float: "right",
                                    width: "80px",
                                    height: "40px",
                                    backgroundColor: isFollowed1 ? "#252525" : "#f22459",
                                    border: isFollowed1 ? "1px solid #2f2f2f" : "1px solid transparent",
                                    borderRadius: "5px",
                                    marginRight: "10px",
                                    fontFamily: "inherit",
                                    cursor: "pointer",
                                    color: "#fff",
                                }} onClick={handleFollowClick1}>{isFollowed1 ? "Following" : "Follow"}</button>
                            {/* <Link to={`/users/${userId}`} style={{ textDecoration: "0", color: "#fff" }}> */}
                            <span><b>Andre57</b></span>
                            <div>Manuel Rogahn<span style={{ margin: "0px 4px" }}> · </span>  <span>1h ago</span></div>
                            {/* </Link> */}
                            <div className="descVid">The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients</div>
                        </div>
                    </div>
                    <div className="actionContainer">
                        <div className="videoActions">
                            <button className="action_btn" onClick={handleLikeClick1}>
                                <span>
                                    {isLiked1 ? <i className="fa-solid fa-heart" style={{ color: "#fe2c55" }}></i> : <i className="fa-solid fa-heart"></i>}
                                </span>
                            </button>
                            <div className="actionAmount">
                                {isLiked1 ? <strong>73</strong> : <strong>72</strong>}
                            </div>

                            <button className="action_btn">
                                <span>
                                    <i className="fa-solid fa-comment-dots" style={{ fontSize: "20px" }}></i>
                                </span>
                            </button>
                            <div className="actionAmount"><strong>25</strong></div>

                            <button className="action_btn">
                                <span>
                                    <i className="fa-solid fa-bookmark" style={{ fontSize: "20px" }}></i>
                                </span>
                            </button>
                            <div className="actionAmount"><strong>16</strong></div>
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
                    <Comments currentUserId={storedIdLogin} />
                </div>
            </div>
        </div>
    )
}

export default VideoDetails1