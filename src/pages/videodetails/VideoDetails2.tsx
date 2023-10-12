import { useState, useEffect } from "react";
import avatar2 from '../../assets/avatar/347.jpg'
import Video2 from '../../assets/videos/2.mp4'
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import '../../library/fontawesome/css/all.min.css'
import '../styles/videodetails.css'
import Comments from '../../components/comments/Comments'

const getReactionStatus2 = () => {
    const storedStatus2 = localStorage.getItem('video-reaction2');
    return storedStatus2 === 'liked2';
}

const setReactionStatus2 = (isLiked2) => {
    localStorage.setItem('video-reaction2', isLiked2 ? 'liked2' : 'not-liked2')
}

const getFollowStatus2 = () => {
    const storedStatus2 = localStorage.getItem('video-follow2');
    return storedStatus2 === 'followed2';
}

const setFollowStatus2 = (isFollowed2) => {
    localStorage.setItem('video-follow2', isFollowed2 ? 'followed2' : 'not-followed2')
}

const VideoDetails2 = () => {
    
    const escapeBack = () => {
        navigate(`/`)
    }
    const previousVideo = () => {
        navigate(`/videoDetails/1`)
    }
    const nextVideo = () => {
        navigate(`/videoDetails/3`)
    }
    const likeVideoByKey = () => {
        handleLikeClick2()
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

    const [isLiked2, setIsLiked2] = useState(getReactionStatus2());
    const [isFollowed2, setIsFollowed2] = useState(getFollowStatus2());

    const handleLikeClick2 = () => {
        if (isLiked2) {
            setIsLiked2(false);
            setReactionStatus2(false);
        } else {
            setIsLiked2(true);
            setReactionStatus2(true);
        }
    };

    const handleFollowClick2 = () => {
        if (isFollowed2) {
            setIsFollowed2(false);
            setFollowStatus2(false);
        } else {
            setIsFollowed2(true);
            setFollowStatus2(true);
        }
    }

    useEffect(() => {
        setIsLiked2(getReactionStatus2());
        setIsFollowed2(getFollowStatus2());
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
                            onClick={() => navigate(`/videoDetails/1`)}><i className="fa-solid fa-chevron-up"></i></button>
                    </div>
                    <div>
                        <button style={{
                            right: '35%',
                            bottom: '40%',
                            position: 'absolute',
                            margin: '15px 0 0 15px',
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            border: '0',
                            fontSize: '30px',
                            cursor: 'pointer'
                        }}
                            onClick={() => navigate(`/videoDetails/3`)}><i className="fa-solid fa-chevron-down"></i></button>
                    </div>
                </div>
                <video loop controls autoPlay className='videoDetailsPage'>
                    <source src={Video2} type='video/webm' />
                </video>
            </div>
            <div className='videoInfo'>
                <div className='video_info_container'>
                    <div className='info-container'>
                        <div>
                            {/* <Link to={`/users/${userId}`}> */}
                            <img src={avatar2} className='avatarDetails' />
                            {/* </Link> */}
                        </div>
                        <div className='infoContainer'>
                            {/* <Link to={`/users/${userId}`} style={{ textDecoration: '0', color: '#fff' }}> */}
                            <button className='followBttn'
                                style={{
                                    float: 'right',
                                    width: '80px',
                                    height: '40px',
                                    backgroundColor: isFollowed2 ? '#252525' : '#f22459',
                                    border: isFollowed2 ? '1px solid #2f2f2f' : '1px solid transparent',
                                    borderRadius: '5px',
                                    marginRight: '10px',
                                    fontFamily: 'inherit',
                                    cursor: 'pointer'
                                }} onClick={handleFollowClick2}>{isFollowed2 ? 'Following' : 'Follow'}</button>
                            <span><b>Chris.Franecki48</b></span>
                            <div>Anthony Waters<span style={{ margin: '0px 4px' }}> · </span>  <span>1h ago</span></div>
                            {/* </Link> */}
                            <div className='descVid'>The Football Is Good For Training And Recreational Purposes. The Football Is Good For Training And Recreational Purposes.</div>
                        </div>
                    </div>
                    <div className='actionContainer'>
                        <div className='videoActions'>
                            <button className='action_btn' onClick={handleLikeClick2}>
                                <span>
                                    {isLiked2 ? <i className="fa-solid fa-heart" style={{ color: '#fe2c55' }}></i> : <i className="fa-solid fa-heart"></i>}
                                </span>
                            </button>
                            <div className='actionAmount'>
                                {isLiked2 ? <strong>73</strong> : <strong>72</strong>}
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

export default VideoDetails2