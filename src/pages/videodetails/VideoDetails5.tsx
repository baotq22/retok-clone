import { useState, useEffect } from "react";
import avatar5 from '../../assets/avatar/908.jpg'
import Video5 from '../../assets/videos/5.mp4'
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import '../../library/fontawesome/css/all.min.css'
import '../styles/videodetails.css'
import Comments from '../../components/comments/Comments'

const getReactionStatus5 = () => {
    const storedStatus5 = localStorage.getItem('video-reaction5');
    return storedStatus5 === 'liked5';
}

const setReactionStatus5 = (isLiked5) => {
    localStorage.setItem('video-reaction5', isLiked5 ? 'liked5' : 'not-liked5')
}

const getFollowStatus5 = () => {
    const storedStatus5 = localStorage.getItem('video-follow5');
    return storedStatus5 === 'followed5';
}

const setFollowStatus5 = (isFollowed5) => {
    localStorage.setItem('video-follow5', isFollowed5 ? 'followed5' : 'not-followed5')
}

const VideoDetails5 = () => {
    
    const escapeBack = () => {
        navigate(`/`)
    }
    const previousVideo = () => {
        navigate(`/videoDetails/4`)
    }
    const likeVideoByKey = () => {
        handleLikeClick5()
    }
    useEffect(() => {
        const keyDownHandler = event => {
            // console.log(event.key)
            if (event.key === 'Escape') {
                escapeBack();
            }

            if (event.key === 'ArrowUp') {
                previousVideo();
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

    const [isLiked5, setIsLiked5] = useState(getReactionStatus5());
    const [isFollowed5, setIsFollowed5] = useState(getFollowStatus5());

    const handleLikeClick5 = () => {
        if (isLiked5) {
            setIsLiked5(false);
            setReactionStatus5(false);
        } else {
            setIsLiked5(true);
            setReactionStatus5(true);
        }
    };

    const handleFollowClick5 = () => {
        if (isFollowed5) {
            setIsFollowed5(false);
            setFollowStatus5(false);
        } else {
            setIsFollowed5(true);
            setFollowStatus5(true);
        }
    }

    useEffect(() => {
        setIsLiked5(getReactionStatus5());
        setIsFollowed5(getReactionStatus5());
    }, [])

    return (
        <div id='videoDetailsContainer'>
            <div className="videoInfo">
                <div>
                    <button style={{
                        left: '0',
                        position: 'absolute',
                        margin: '15px 0 0 15px',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        border: '0',
                        fontSize: '30px',
                        cursor: 'pointer'
                    }}
                        onClick={() => navigate(`/`)}><i className="fa-solid fa-arrow-left"></i></button>
                </div>
                <div>
                    <button style={{
                        right: '35%',
                        bottom: '50%',
                        position: 'absolute',
                        margin: '15px 0 0 15px',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        border: '0',
                        fontSize: '30px',
                        cursor: 'pointer'
                    }}
                        onClick={() => navigate(`/videoDetails/4`)}><i className="fa-solid fa-chevron-up"></i></button>
                </div>
                <video loop controls autoPlay className='videoDetailsPage'>
                    <source src={Video5} type='video/webm' />
                </video>
            </div>
            <div className='videoInfo'>
                <div className='video_info_container'>
                    <div className='info-container'>
                        <div>
                            {/* <Link to={`/users/${userId}`}> */}
                            <img src={avatar5} className='avatarDetails' />
                            {/* </Link> */}
                        </div>
                        <div className='infoContainer'>
                            <button className='followBttn'
                                style={{
                                    float: 'right',
                                    width: '80px',
                                    height: '40px',
                                    backgroundColor: isFollowed5 ? '#252525' : '#f22459',
                                    border: isFollowed5 ? '1px solid #2f2f2f' : '1px solid transparent',
                                    borderRadius: '5px',
                                    marginRight: '10px',
                                    fontFamily: 'inherit',
                                    cursor: 'pointer'
                                }} onClick={handleFollowClick5}>{isFollowed5 ? 'Following' : 'Follow'}</button>
                            {/* <Link to={`/users/${userId}`} style={{ textDecoration: '0', color: '#fff' }}> */}
                            <span><b>Terrell_OKeefe3</b></span>
                            <div>Krystal Heller V<span style={{ margin: '0px 4px' }}> · </span>  <span>1h ago</span></div>
                            {/* </Link> */}
                            <div className='descVid'>The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design</div>
                        </div>
                    </div>
                    <div className='actionContainer'>
                        <div className='videoActions'>
                            <button className='action_btn' onClick={handleLikeClick5}>
                                <span>
                                    {isLiked5 ? <i className="fa-solid fa-heart" style={{ color: '#fe2c55' }}></i> : <i className="fa-solid fa-heart"></i>}
                                </span>
                            </button>
                            <div className='actionAmount'>
                                {isLiked5 ? <strong>73</strong> : <strong>72</strong>}
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

export default VideoDetails5