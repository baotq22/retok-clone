import { useState, useEffect } from "react";
import avatar4 from '../../assets/avatar/756.jpg'
import Video4 from '../../assets/videos/4.mp4'
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import '../../library/fontawesome/css/all.min.css'
import '../../styles/css/videodetails.css'
import Comments from '../../components/comments/Comments'

const getReactionStatus4 = () => {
    const storedStatus4 = localStorage.getItem('video-reaction4');
    return storedStatus4 === 'liked4';
}

const setReactionStatus4 = (isLiked4: boolean) => {
    localStorage.setItem('video-reaction4', isLiked4 ? 'liked4' : 'not-liked4')
}

const getFollowStatus4 = () => {
    const storedStatus4 = localStorage.getItem('video-follow4');
    return storedStatus4 === 'followed4';
}

const setFollowStatus4 = (isFollowed4: boolean) => {
    localStorage.setItem('video-follow4', isFollowed4 ? 'followed4' : 'not-followed4')
}

const VideoDetails4 = () => {

    const escapeBack = () => {
        navigate(`/`)
    }
    const previousVideo = () => {
        navigate(`/videoDetails/3`)
    }
    const nextVideo = () => {
        navigate(`/videoDetails/5`)
    }
    const likeVideoByKey = () => {
        handleLikeClick4()
    }
    useEffect(() => {
        const keyDownHandler = event => {
            if (event.key === 'Escape') {
                escapeBack();
            }

            if (event.key === 'ArrowUp') {
                previousVideo();
            }

            if (event.key === 'ArrowDown') {
                nextVideo();
            }

            if (event.key === 'L' || event.key === 'l') {
                likeVideoByKey();
            }
        }

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        }
    }, [])

    const navigate = useNavigate();
    const storedIdLogin = localStorage.getItem('id');

    const [isLiked4, setIsLiked4] = useState(getReactionStatus4());
    const [isFollowed4, setIsFollowed4] = useState(getFollowStatus4());

    const handleLikeClick4 = () => {
        if (isLiked4) {
            setIsLiked4(false);
            setReactionStatus4(false);
        } else {
            setIsLiked4(true);
            setReactionStatus4(true);
        }
    };

    const handleFollowClick4 = () => {
        if (isFollowed4) {
            setIsFollowed4(false);
            setFollowStatus4(false);
        } else {
            setIsFollowed4(true);
            setFollowStatus4(true);
        }
    }

    useEffect(() => {
        setIsLiked4(getReactionStatus4());
        setIsFollowed4(getFollowStatus4());
    }, [])

    return (
        <div id='videoDetailsContainer'>
            <div className="videoInfo">
                <div>
                    <button onClick={() => navigate(`/`)} className='btnClose'><i className="fa-solid fa-arrow-left"></i></button>
                </div>
                <div>
                    <button onClick={() => navigate(`/videoDetails/3`)} className='btnUp'><i className="fa-solid fa-chevron-up"></i></button>
                </div>
                <div>
                    <button onClick={() => navigate(`/videoDetails/5`)} className='btnDown'><i className="fa-solid fa-chevron-down"></i></button>
                </div>
                <video loop controls autoPlay className='videoDetailsPage'>
                    <source src={Video4} type='video/webm' />
                </video>
            </div>
            <div className='videoInfo'>
                <div className='video_info_container'>
                    <div className='info-container'>
                        <div>
                            {/* <Link to={`/users/${userId}`}> */}
                            <img src={avatar4} className='avatarDetails' />
                            {/* </Link> */}
                        </div>
                        <div className='infoContainer'>
                            <button className='followBttn'
                                style={{
                                    float: 'right',
                                    width: '80px',
                                    height: '40px',
                                    backgroundColor: isFollowed4 ? '#252525' : '#f22459',
                                    border: isFollowed4 ? '1px solid #2f2f2f' : '1px solid transparent',
                                    borderRadius: '5px',
                                    marginRight: '10px',
                                    fontFamily: 'inherit',
                                    cursor: 'pointer'
                                }} onClick={handleFollowClick4}>{isFollowed4 ? 'Following' : 'Follow'}</button>
                            {/* <Link to={`/users/${userId}`} style={{ textDecoration: '0', color: '#fff' }}> */}
                            <span><b>Jonathon_Kuvalis18</b></span>
                            <div>Harold Daugherty<span style={{ margin: '0px 4px' }}> · </span>  <span>1h ago</span></div>
                            {/* </Link> */}
                            <div className='descVid'>The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients</div>
                        </div>
                    </div>
                    <div className='actionContainer'>
                        <div className='videoActions'>
                            <button className='action_btn' onClick={handleLikeClick4}>
                                <span>
                                    {isLiked4 ? <i className="fa-solid fa-heart" style={{ color: '#fe2c55' }}></i> : <i className="fa-solid fa-heart"></i>}
                                </span>
                            </button>
                            <div className='actionAmount'>
                                {isLiked4 ? <strong>73</strong> : <strong>72</strong>}
                            </div>

                            <button className='action_btn'>
                                <span>
                                    <i className="fa-solid fa-comment-dots" style={{ fontSize: '20px' }}></i>
                                </span>
                            </button>
                            <div className='actionAmount'><strong>25</strong></div>

                            <button className='action_btn'>
                                <span>
                                    <i className="fa-solid fa-bookmark" style={{ fontSize: '20px' }}></i>
                                </span>
                            </button>
                            <div className='actionAmount'><strong>16</strong></div>
                        </div>
                        <div className='shareBtnContainer'>
                            <button className='action_btn'>
                                <span>
                                    <i className="fa-solid fa-code"></i>
                                </span>
                            </button>
                            <button className='action_btn'>
                                <span>
                                    <i className="fa-solid fa-paper-plane"></i>
                                </span>
                            </button>
                            <button className='action_btn'>
                                <span>
                                    <i className="fa-brands fa-facebook" style={{ color: '#0075fa' }}></i>
                                </span>
                            </button>
                            <button className='action_btn'>
                                <span>
                                    <i className="fa-brands fa-whatsapp" style={{ color: '#25d366' }}></i>
                                </span>
                            </button>
                            <button className='action_btn'>
                                <span>
                                    <i className="fa-brands fa-twitter" style={{ color: '#1da1f2' }}></i>
                                </span>
                            </button>
                            <button className='action_btn'>
                                <span>
                                    <i className="fa-solid fa-share"></i>
                                </span>
                            </button>
                        </div>
                    </div>
                    <h2>Comments (25)</h2>
                    <Comments currentUserId='1' />
                </div>
            </div>
        </div>
    )
}

export default VideoDetails4