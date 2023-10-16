import { useEffect, useState } from "react";
import Video1 from '../assets/videos/1.mp4'
import { Link, useNavigate, useParams } from "react-router-dom";
import { videoApis } from "../axios-instance";
import '../library/fontawesome/css/all.min.css'
import '../styles/css/videodetails.css'
import Comments from '../components/comments/Comments'
import axios from "axios";


const VideoDetails = () => {
    
    const escapeBack = () => {
        navigate(`/`)
        
    }
    useEffect(() => {
        const keyDownHandler = event => {
            console.log(event.key)
            if (event.key === 'Escape') {
                escapeBack();
            }
        }

        document.addEventListener('keydown', keyDownHandler);
        
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        }
    }, [])

    const [video, setVideo] = useState();

    const params = useParams();
    const userId = params.userId;
    const navigate = useNavigate();

    useEffect(() => {
        videoApis.get(`/videos/${userId}`).then(res => {
            setVideo(res.data)
        }).catch(e => console.log(e));
    }, [])
    const [isReacted, setIsReacted] = useState(false);
    const reactionAction = () => {
        setIsReacted(current => !current);
    }

    const [isFollowing, setIsFollowing] = useState(false);

    const followUser = async (userId: string | undefined) => {
        try {
            await axios.post(`/${userId}`)
        } catch (e) {
            console.log('')
        }
    }

    const unfollowUser = async (userId: string | undefined) => {
        try {
            await axios.delete(`/${userId}`)
        } catch (e) {
            console.log('')
        }
    }

    useEffect(() => {
        const storedStatus = localStorage.getItem('isFollowing');
        if (storedStatus) {
            setIsFollowing(JSON.parse(storedStatus));
        }
    }, [])

    const handleFollowClick = () => {
        if (isFollowing) {
            unfollowUser(userId);
        } else {
            followUser(userId);
        }
        setIsFollowing(!isFollowing);
        localStorage.setItem('isFollowing', JSON.stringify(!isFollowing))
    }

    return (
        <div id="videoDetailsContainer">
            <div className='videoInfo'>
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
                <video loop controls autoPlay className='videoDetailsPage'>
                    <source src={Video1} type='video/webm' />
                </video>
            </div>
            <div className='videoInfo'>
                <div className='video_info_container'>
                    <div className='info-container'>
                        <div>
                            <Link to={`/users/${userId}`}>
                                <img src={video?.avatar} className='avatarDetails' />
                            </Link>
                        </div>
                        <div className='infoContainer'>
                            <button className='followBttn'
                                style={{
                                    float: 'right',
                                    width: '80px',
                                    height: '40px',
                                    backgroundColor: isFollowing ? '#252525' : '#f22459',
                                    border: isFollowing ? '1px solid #2f2f2f' : '1px solid transparent',
                                    borderRadius: '5px',
                                    marginRight: '10px',
                                    fontFamily: 'inherit',
                                    cursor: 'pointer'
                                }} onClick={handleFollowClick}>{isFollowing ? 'Following' : 'Follow'}</button>
                            <Link to={`/users/${userId}`} style={{ textDecoration: '0', color: '#fff' }}>
                                <span><b>{video?.username}</b></span>
                                <div>{video?.fullname}<span style={{ margin: '0px 4px' }}> · </span>  <span>1h ago</span></div>
                            </Link>
                            <div className='descVid'>{video?.description}</div>
                        </div>
                    </div>
                    <div className='actionContainer'>
                        <div className='videoActions'>
                            <button className='action_btn' onClick={reactionAction}>
                                <span>
                                    {isReacted ? <i className="fa-solid fa-heart" style={{ color: '#fe2c55' }}></i> : <i className="fa-solid fa-heart"></i>}
                                </span>
                            </button>
                            <div className='actionAmount'>
                                {isReacted ? <strong>{video?.reactAmount + 1}</strong> : <strong>{video?.reactAmount}</strong>}
                            </div>

                            <button className='action_btn'>
                                <span>
                                    <i className="fa-solid fa-comment-dots" style={{ fontSize: '20px' }}></i>
                                </span>
                            </button>
                            <div className='actionAmount'><strong>{video?.commentAmount}</strong></div>

                            <button className='action_btn'>
                                <span>
                                    <i className="fa-solid fa-bookmark" style={{ fontSize: '20px' }}></i>
                                </span>
                            </button>
                            <div className='actionAmount'><strong>{video?.savedAmount}</strong></div>
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
                    <h2>Comments ({video?.commentAmount})</h2>
                    <Comments currentUserId='1'/>
                </div>
            </div>
        </div>
    )
}

export default VideoDetails