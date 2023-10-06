/* eslint-disable react-hooks/rules-of-hooks */
import './styles/videos.css'
import './styles/sidebar.css'
import NavBar from "../components/navbar"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import LoginModal from "../components/LoginModal";
import '../library/fontawesome/css/all.min.css'
import avatar1 from '../assets/avatar/583.jpg'
import avatar2 from '../assets/avatar/518.jpg'
import avatar3 from '../assets/avatar/867.jpg'
import avatar4 from '../assets/avatar/66.jpg'
import avatar5 from '../assets/avatar/859.jpg'
import Video1 from '../assets/videos/1.mp4'
import Video2 from '../assets/videos/2.mp4'
import Video3 from '../assets/videos/3.mp4'
import Video4 from '../assets/videos/4.mp4'
import Video5 from '../assets/videos/5.mp4'
import { api, videoApis } from "../axios-instance";
import axios from "axios";
import { useSelector } from "react-redux";
import LoginInputModal from "../components/LoginInputModal";
import RightBottomActionButton from "../components/RightBottomActionButton";

type UserType = {
    username: string
    fullname: string
    image: string
    imageMain: string
}

type VideoType = {
    username: string
    fullname: string
    description: string
    reactAmount: number
    commentAmount: number
    savedAmount: number
    shareAmount: number
    avatar: string
}

const AutoPlayVideo = () => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleScroll = () => {
        const videoElement = videoRef.current;
        const rect = videoElement.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        if (isVisible && !isPlaying) {
            videoElement.play();
            setIsPlaying(true);
        } else if (!isVisible && isPlaying) {
            videoElement.pause();
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <video ref={videoRef} muted controls className='videos' src={Video1} />
        </>
    )
}

// video 1
const getReactionStatus1 = (userId) => {
    const storedStatus1 = localStorage.getItem(`video-reaction1-fl-${userId}`);
    return storedStatus1 === 'liked1';
}

const setReactionStatus1 = (userId, isLiked1) => {
    localStorage.setItem(`video-reaction1-fl-${userId}`, isLiked1 ? 'liked1' : 'not-liked1')
}

const getFollowStatus1 = (userId) => {
    const storedStatus1 = localStorage.getItem(`video-follow1-${userId}`);
    return storedStatus1 === 'followed1';
}

const setFollowStatus1 = (userId, isFollowed1) => {
    localStorage.setItem(`video-follow1-${userId}`, isFollowed1 ? 'followed1' : 'not-followed1')
}

// video 2
const getReactionStatus2 = (userId) => {
    const storedStatus2 = localStorage.getItem(`video-reaction2-fl-${userId}`);
    return storedStatus2 === 'liked2';
}

const setReactionStatus2 = (userId, isLiked2) => {
    localStorage.setItem(`video-reaction2-fl-${userId}`, isLiked2 ? 'liked2' : 'not-liked2')
}

const getFollowStatus2 = (userId) => {
    const storedStatus2 = localStorage.getItem(`video-follow2-${userId}`);
    return storedStatus2 === 'followed2';
}

const setFollowStatus2 = (userId, isFollowed2) => {
    localStorage.setItem(`video-follow2-${userId}`, isFollowed2 ? 'followed2' : 'not-followed2')
}

// video 3
const getReactionStatus3 = (userId) => {
    const storedStatus3 = localStorage.getItem(`video-reaction3-fl-${userId}`);
    return storedStatus3 === 'liked3';
}

const setReactionStatus3 = (userId, isLiked3) => {
    localStorage.setItem(`video-reaction3-fl-${userId}`, isLiked3 ? 'liked3' : 'not-liked3')
}

const getFollowStatus3 = (userId) => {
    const storedStatus3 = localStorage.getItem(`video-follow3-${userId}`);
    return storedStatus3 === 'followed3';
}

const setFollowStatus3 = (userId, isFollowed3) => {
    localStorage.setItem(`video-follow3-${userId}`, isFollowed3 ? 'followed3' : 'not-followed3')
}

// video 4
const getReactionStatus4 = (userId) => {
    const storedStatus4 = localStorage.getItem(`video-reaction4-fl-${userId}`);
    return storedStatus4 === 'liked4';
}

const setReactionStatus4 = (userId, isLiked4) => {
    localStorage.setItem(`video-reaction4-fl-${userId}`, isLiked4 ? 'liked4' : 'not-liked4')
}

const getFollowStatus4 = (userId) => {
    const storedStatus4 = localStorage.getItem(`video-follow4-${userId}`);
    return storedStatus4 === 'followed4';
}

const setFollowStatus4 = (userId, isFollowed4) => {
    localStorage.setItem(`video-follow4-${userId}`, isFollowed4 ? 'followed4' : 'not-followed4')
}

// video 5
const getReactionStatus5 = (userId) => {
    const storedStatus5 = localStorage.getItem(`video-reaction5-fl-${userId}`);
    return storedStatus5 === 'liked5';
}

const setReactionStatus5 = (userId, isLiked5) => {
    localStorage.setItem(`video-reaction5-fl-${userId}`, isLiked5 ? 'liked5' : 'not-liked5')
}

const getFollowStatus5 = (userId) => {
    const storedStatus5 = localStorage.getItem(`video-follow5-${userId}`);
    return storedStatus5 === 'followed5';
}

const setFollowStatus5 = (userId, isFollowed5) => {
    localStorage.setItem(`video-follow5-${userId}`, isFollowed5 ? 'followed5' : 'not-followed5')
}

function Video({ userId }) {
    //video 1
    const [isLiked1, setIsLiked1] = useState(getReactionStatus1(userId));
    const [isFollowed1, setIsFollowed1] = useState(getFollowStatus1(userId));

    const handleLikeClick1 = () => {
        if (isLiked1) {
            setIsLiked1(false);
            setReactionStatus1(userId, false);
        } else {
            setIsLiked1(true);
            setReactionStatus1(userId, true);
        }
    };

    const handleFollowClick1 = () => {
        if (isFollowed1) {
            setIsFollowed1(false);
            setFollowStatus1(userId, false);
        } else {
            setIsFollowed1(true);
            setFollowStatus1(userId, true);
        }
    }

    useEffect(() => {
        setIsLiked1(getReactionStatus1(userId));
        setIsFollowed1(getFollowStatus1(userId));
    }, [userId])

    //video 2
    const [isLiked2, setIsLiked2] = useState(getReactionStatus2(userId));
    const [isFollowed2, setIsFollowed2] = useState(getFollowStatus2(userId));

    const handleLikeClick2 = () => {
        if (isLiked2) {
            setIsLiked2(false);
            setReactionStatus2(userId, false);
        } else {
            setIsLiked2(true);
            setReactionStatus2(userId, true);
        }
    };

    const handleFollowClick2 = () => {
        if (isFollowed2) {
            setIsFollowed2(false);
            setFollowStatus2(userId, false);
        } else {
            setIsFollowed2(true);
            setFollowStatus2(userId, true);
        }
    }

    useEffect(() => {
        setIsLiked2(getReactionStatus2(userId));
        setIsFollowed2(getFollowStatus2(userId));
    }, [userId])

    //video 3
    const [isLiked3, setIsLiked3] = useState(getReactionStatus3(userId));
    const [isFollowed3, setIsFollowed3] = useState(getFollowStatus3(userId));

    const handleLikeClick3 = () => {
        if (isLiked3) {
            setIsLiked3(false);
            setReactionStatus3(userId, false);
        } else {
            setIsLiked3(true);
            setReactionStatus3(userId, true);
        }
    };

    const handleFollowClick3 = () => {
        if (isFollowed3) {
            setIsFollowed3(false);
            setFollowStatus3(userId, false);
        } else {
            setIsFollowed3(true);
            setFollowStatus3(userId, true);
        }
    }

    useEffect(() => {
        setIsLiked3(getReactionStatus3(userId));
        setIsFollowed3(getFollowStatus3(userId));
    }, [userId])

    //video 4
    const [isLiked4, setIsLiked4] = useState(getReactionStatus4(userId));
    const [isFollowed4, setIsFollowed4] = useState(getFollowStatus4(userId));

    const handleLikeClick4 = () => {
        if (isLiked4) {
            setIsLiked4(false);
            setReactionStatus4(userId, false);
        } else {
            setIsLiked4(true);
            setReactionStatus4(userId, true);
        }
    };

    const handleFollowClick4 = () => {
        if (isFollowed4) {
            setIsFollowed4(false);
            setFollowStatus4(userId, false);
        } else {
            setIsFollowed4(true);
            setFollowStatus4(userId, true);
        }
    }

    useEffect(() => {
        setIsLiked4(getReactionStatus4(userId));
        setIsFollowed4(getFollowStatus4(userId));
    }, [userId])

    //video 5
    const [isLiked5, setIsLiked5] = useState(getReactionStatus5(userId));
    const [isFollowed5, setIsFollowed5] = useState(getFollowStatus5(userId));

    const handleLikeClick5 = () => {
        if (isLiked5) {
            setIsLiked5(false);
            setReactionStatus5(userId, false);
        } else {
            setIsLiked5(true);
            setReactionStatus5(userId, true);
        }
    };

    const handleFollowClick5 = () => {
        if (isFollowed5) {
            setIsFollowed5(false);
            setFollowStatus5(userId, false);
        } else {
            setIsFollowed5(true);
            setFollowStatus5(userId, true);
        }
    }

    useEffect(() => {
        setIsLiked5(getReactionStatus5(userId));
        setIsFollowed5(getReactionStatus5(userId));
    }, [userId])

    return (
        <>
            <div className='videos__container'>
                <div className='avatarContainer'>
                    <Link to={`/users/1`}>
                        <span className='avatarVideo'>
                            <img src={avatar1} className='avatar' />
                        </span>
                    </Link>
                </div>
                <div className='videoContainer'>
                    <div className='video-user'>
                        <Link to={`/users/1`} style={{ textDecoration: '0' }} className='user_details'>
                            <span><b>Andre57 </b></span>
                            <span>Manuel Rogahn</span>
                        </Link>
                        <p className='videoDesc'>The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients</p>
                    </div>
                    <div className='videoDetails'>
                        <div className="videoBox">
                            <Link to={`videoDetails/1`} >
                                <video autoPlay muted controls className='videos' src={Video1} />
                            </Link>
                            <div className='videoAction'>
                                <button className='action_btn' onClick={handleLikeClick1}>
                                    <span>
                                        {isLiked1 ? <i className="fa-solid fa-heart" style={{ color: '#fe2c55' }}></i> : <i className="fa-solid fa-heart"></i>}
                                        {/* <i className="fa-solid fa-heart" style={{ color: '#fe2c55' }}></i> */}
                                    </span>
                                </button>
                                <p className='actionAmount'>
                                    {isLiked1 ? <strong>73</strong> : <strong>72</strong>}
                                </p>
                                {/* <button className='action_btn' onClick={() => navigate(`/videos/${video?.id}`)}> */}
                                <button className='action_btn'>
                                    <span>
                                        <i className="fa-solid fa-comment-dots"></i>
                                    </span>
                                </button>
                                <p className='actionAmount'><strong>25</strong></p>
                                <button className='action_btn'>
                                    <span>
                                        <i className="fa-solid fa-bookmark"></i>
                                    </span>
                                </button>
                                <p className='actionAmount'><strong>16</strong></p>
                                <button className='action_btn'>
                                    <span>
                                        <i className="fa-solid fa-share"></i>
                                    </span>
                                </button>
                                <p className='actionAmount'><strong>8</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='videos__container'>
                <div className='avatarContainer'>
                    <Link to={`/users/2`}>
                        <span className='avatarVideo'>
                            <img src={avatar2} className='avatar' />
                        </span>
                    </Link>
                </div>
                <div className='videoContainer'>
                    <div className='video-user'>
                        <Link to={`/users/2`} style={{ textDecoration: '0' }} className='user_details'>
                            <span><b>Chris.Franecki48 </b></span>
                            <span>Anthony Waters</span>
                        </Link>
                        <p className='videoDesc'>The Football Is Good For Training And Recreational Purposes</p>
                    </div>
                    <div className='videoDetails'>
                        <div className="videoBox">
                            <Link to={`/videoDetails/2`} >
                                <video autoPlay muted controls className='videos' src={Video2} />
                            </Link>
                            <div className='videoAction'>
                                <button className='action_btn' onClick={handleLikeClick2}>
                                    <span>
                                        {isLiked2 ? <i className="fa-solid fa-heart" style={{ color: '#fe2c55' }}></i> : <i className="fa-solid fa-heart"></i>}
                                        {/* <i className="fa-solid fa-heart" style={{ color: '#fe2c55' }}></i> */}
                                    </span>
                                </button>
                                <p className='actionAmount'>
                                    {isLiked2 ? <strong>73</strong> : <strong>72</strong>}
                                </p>
                                {/* <button className='action_btn' onClick={() => navigate(`/videos/${video?.id}`)}> */}
                                <button className='action_btn'>
                                    <span>
                                        <i className="fa-solid fa-comment-dots"></i>
                                    </span>
                                </button>
                                <p className='actionAmount'><strong>25</strong></p>
                                <button className='action_btn'>
                                    <span>
                                        <i className="fa-solid fa-bookmark"></i>
                                    </span>
                                </button>
                                <p className='actionAmount'><strong>16</strong></p>
                                <button className='action_btn'>
                                    <span>
                                        <i className="fa-solid fa-share"></i>
                                    </span>
                                </button>
                                <p className='actionAmount'><strong>8</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='videos__container'>
                <div className='avatarContainer'>
                    <Link to={`/users/3`}>
                        <span className='avatarVideo'>
                            <img src={avatar3} className='avatar' />
                        </span>
                    </Link>
                </div>
                <div className='videoContainer'>
                    <div className='video-user'>
                        <Link to={`/users/3`} style={{ textDecoration: '0' }} className='user_details'>
                            <span><b>Grover32 </b></span>
                            <span>Nina Mills IV</span>
                        </Link>
                        <p className='videoDesc'>The Football Is Good For Training And Recreational Purposes</p>
                    </div>
                    <div className='videoDetails'>
                        <div className="videoBox">
                            <Link to={`/videoDetails/3`} >
                                <video autoPlay muted controls className='videos' src={Video3} />
                            </Link>
                            <div className='videoAction'>
                                <button className='action_btn' onClick={handleLikeClick3}>
                                    <span>
                                        {isLiked3 ? <i className="fa-solid fa-heart" style={{ color: '#fe2c55' }}></i> : <i className="fa-solid fa-heart"></i>}
                                        {/* <i className="fa-solid fa-heart" style={{ color: '#fe2c55' }}></i> */}
                                    </span>
                                </button>
                                <p className='actionAmount'>
                                    {isLiked3 ? <strong>73</strong> : <strong>72</strong>}
                                </p>
                                {/* <button className='action_btn' onClick={() => navigate(`/videos/${video?.id}`)}> */}
                                <button className='action_btn'>
                                    <span>
                                        <i className="fa-solid fa-comment-dots"></i>
                                    </span>
                                </button>
                                <p className='actionAmount'><strong>25</strong></p>
                                <button className='action_btn'>
                                    <span>
                                        <i className="fa-solid fa-bookmark"></i>
                                    </span>
                                </button>
                                <p className='actionAmount'><strong>16</strong></p>
                                <button className='action_btn'>
                                    <span>
                                        <i className="fa-solid fa-share"></i>
                                    </span>
                                </button>
                                <p className='actionAmount'><strong>8</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='videos__container'>
                <div className='avatarContainer'>
                    <Link to={`/users/4`}>
                        <span className='avatarVideo'>
                            <img src={avatar4} className='avatar' />
                        </span>
                    </Link>
                </div>
                <div className='videoContainer'>
                    <div className='video-user'>
                        <Link to={`/users/4`} style={{ textDecoration: '0' }} className='user_details'>
                            <span><b>Jonathon_Kuvalis18 </b></span>
                            <span>Harold Daugherty</span>
                        </Link>
                        <p className='videoDesc'>The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients</p>
                    </div>
                    <div className='videoDetails'>
                        <div className="videoBox">
                            <Link to={`/videoDetails/4`} >
                                <video autoPlay muted controls className='videos' src={Video4} />
                            </Link>
                            <div className='videoAction'>
                                <button className='action_btn' onClick={handleLikeClick4}>
                                    <span>
                                        {isLiked4 ? <i className="fa-solid fa-heart" style={{ color: '#fe2c55' }}></i> : <i className="fa-solid fa-heart"></i>}
                                        {/* <i className="fa-solid fa-heart" style={{ color: '#fe2c55' }}></i> */}
                                    </span>
                                </button>
                                <p className='actionAmount'>
                                    {isLiked4 ? <strong>73</strong> : <strong>72</strong>}
                                </p>
                                {/* <button className='action_btn' onClick={() => navigate(`/videos/${video?.id}`)}> */}
                                <button className='action_btn'>
                                    <span>
                                        <i className="fa-solid fa-comment-dots"></i>
                                    </span>
                                </button>
                                <p className='actionAmount'><strong>25</strong></p>
                                <button className='action_btn'>
                                    <span>
                                        <i className="fa-solid fa-bookmark"></i>
                                    </span>
                                </button>
                                <p className='actionAmount'><strong>16</strong></p>
                                <button className='action_btn'>
                                    <span>
                                        <i className="fa-solid fa-share"></i>
                                    </span>
                                </button>
                                <p className='actionAmount'><strong>8</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='videos__container'>
                <div className='avatarContainer'>
                    <Link to={`/users/5`}>
                        <span className='avatarVideo'>
                            <img src={avatar5} className='avatar' />
                        </span>
                    </Link>
                </div>
                <div className='videoContainer'>
                    <div className='video-user'>
                        <Link to={`/users/5`} style={{ textDecoration: '0' }} className='user_details'>
                            <span><b>Terrell_OKeefe3 </b></span>
                            <span>Krystal Heller V</span>
                        </Link>
                        <p className='videoDesc'>The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design</p>
                    </div>
                    <div className='videoDetails'>
                        <div className="videoBox">
                            <Link to={`/videoDetails/5`} >
                                <video autoPlay muted controls className='videos' src={Video5} />
                            </Link>
                            <div className='videoAction'>
                                <button className='action_btn' onClick={handleLikeClick5}>
                                    <span>
                                        {isLiked5 ? <i className="fa-solid fa-heart" style={{ color: '#fe2c55' }}></i> : <i className="fa-solid fa-heart"></i>}
                                        {/* <i className="fa-solid fa-heart" style={{ color: '#fe2c55' }}></i> */}
                                    </span>
                                </button>
                                <p className='actionAmount'>
                                    {isLiked5 ? <strong>73</strong> : <strong>72</strong>}
                                </p>
                                {/* <button className='action_btn' onClick={() => navigate(`/videos/${video?.id}`)}> */}
                                <button className='action_btn'>
                                    <span>
                                        <i className="fa-solid fa-comment-dots"></i>
                                    </span>
                                </button>
                                <p className='actionAmount'><strong>25</strong></p>
                                <button className='action_btn'>
                                    <span>
                                        <i className="fa-solid fa-bookmark"></i>
                                    </span>
                                </button>
                                <p className='actionAmount'><strong>16</strong></p>
                                <button className='action_btn'>
                                    <span>
                                        <i className="fa-solid fa-share"></i>
                                    </span>
                                </button>
                                <p className='actionAmount'><strong>8</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const ForYou = () => {
    const navigate = useNavigate();
    const [viewMore, setViewMore] = useState(false);
    const [userList, setUserList] = useState<Array<UserType>>([])
    const [videoList, setVideoList] = useState<Array<VideoType>>([])
    const toggleContent = () => { setViewMore(!viewMore) };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => { setIsModalOpen(true); }
    const closeModal = () => { setIsModalOpen(false); }

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const openLoginModal = () => { setIsLoginModalOpen(true); setIsModalOpen(false); }
    const closeLoginModal = () => { setIsLoginModalOpen(false); setIsModalOpen(true); }
    const closeAllModal = () => { setIsLoginModalOpen(false); setIsModalOpen(false); }
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get(`https://64f71db49d77540849531dc0.mockapi.io/users`);
            setUserList(res.data)
        }
        const fetchVideos = async () => {
            const res = await axios.get(`https://650d3e71a8b42265ec2be0f7.mockapi.io/videos`);
            setVideoList(res.data)
        }
        fetchUsers();
        fetchVideos();
    })

    const userLogin = useSelector(state => state.userLogin)
    const userLogged = !userLogin?.username;

    const user_id = userLogin?.id;
    let content;
    if (userLogged) {
        content =
            <>
                <div>
                    <h3 className='title'>Log in to follow creators, like videos, and view comments.</h3>
                    <button id='btn__signin' onClick={openModal}>Log in</button>
                    <div className="example">
                        <p className="example-1"></p>
                    </div>
                </div>
                <LoginModal isOpen={isModalOpen} onClose={closeModal}>
                    <h2 style={{ margin: '60px 0 30px 0' }}>Log in to Retok</h2>
                    <div className="login_methods">
                        <a href="#" className='loginMethods'>
                            <div className='loginMethod'>
                                <i className="fa-solid fa-qrcode" style={{ float: 'left', marginTop: '5px' }}></i>
                                <span>Scan QR Code</span>
                            </div>
                        </a>
                        <a className='loginMethods' onClick={openLoginModal}>
                            <div className='loginMethod'>
                                <i className="fa-regular fa-user" style={{ float: 'left', marginTop: '5px' }}></i>
                                <span>Use phone / email / username</span>
                            </div>
                        </a>
                        <a className='loginMethods' onClick={() => navigate(`/login`)}>
                            <div className='loginMethod'>
                                <i className="fa-brands fa-facebook fa-spin" style={{ float: 'left', marginTop: '5px' }}></i>
                                <span>Continue with Facebook</span>
                            </div>
                        </a>
                        <a href="#" className='loginMethods'>
                            <div className='loginMethod'>
                                <i className="fa-brands fa-google" style={{ float: 'left', marginTop: '5px' }}></i>
                                <span>Continue with Google</span>
                            </div>
                        </a>
                        <a href="#" className='loginMethods'>
                            <div className='loginMethod'>
                                <i className="fa-brands fa-twitter" style={{ float: 'left', marginTop: '5px' }}></i>
                                <span>Continue with Twitter</span>
                            </div>
                        </a>
                        <a href="#" className='loginMethods'>
                            <div className='loginMethod'>
                                <i className="fa-brands fa-line" style={{ float: 'left', marginTop: '5px' }}></i>
                                <span>Continue with LINE</span>
                            </div>
                        </a>
                        <a href="#" className='loginMethods'>
                            <div className='loginMethod'>
                                <i className="fa-brands fa-apple" style={{ float: 'left', marginTop: '5px' }}></i>
                                <span>Continue with Apple</span>
                            </div>
                        </a>
                        <a href="#" className='loginMethods'>
                            <div className='loginMethod'>
                                <i className="fa-brands fa-instagram" style={{ float: 'left', marginTop: '5px' }}></i>
                                <span>Continue with Instagram</span>
                            </div>
                        </a>
                    </div>
                    <div className='license'>
                        <p>By continuing, you agree to Retok’s <a href='#'>Terms of Service</a> and confirm that you have read Retok’s <a href='#'>Privacy Policy</a>.</p>
                    </div>
                    <div className='signUps'>
                        <p>Don't have an account? <a href='#' className="signUp">Sign Up</a></p>
                    </div>
                </LoginModal>
                <LoginInputModal isLoginOpen={isLoginModalOpen} onLoginClose={closeLoginModal} onAllClose={closeAllModal}>

                </LoginInputModal>
            </>
    } else {
        content =
            <>
                <div>
                    <div className="example-2">
                        <p className="example-3"></p>
                    </div>
                    <h3 className='title' style={{ marginTop: '-20px' }}>Following accounts</h3>
                    <div className='userList'>
                        <ul className='userItem'>
                            {
                                videoList.slice(0, 10).map((user, index) =>
                                    <li key={index} className='itemUser'>
                                        <div className='userAvatar'>
                                            <span className='avatarIcon'><img src={user?.avatar} className='avatarList' /></span>
                                            <span className='infoUser'>
                                                <p className='nameAll'><b>{user?.username}</b></p>
                                                <p className='nameAll'>{user?.fullname}</p>
                                            </span>
                                        </div>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                    <div className="example">
                        <p className="example-1"></p>
                    </div>
                </div>
            </>
    }


    return (
        <>
            <RightBottomActionButton />
            <div id='followingPage'>
                {userLogged ? (
                    <div id='foryou'>
                        <div className='userContainer'>
                            <div className='userVideo'>
                                {
                                    userList.map((user, index) =>
                                        <div className='userInfo' key={index}>
                                            <Link to={`/userFollow/${user.id}`}>
                                                <img src={user?.imageMain} className='imgUser' />
                                                <img src={user?.image} className='avatarUser' />
                                            </Link>
                                            <div className='userFollow'>
                                                <Link to={`/userFollow/${user.id}`} style={{ textDecoration: '0', color: '#fff' }}>
                                                    <h3 className='user'><b>{user?.username}</b></h3>
                                                    <h4 className='user'>{user?.fullname}</h4>
                                                </Link>
                                                <button className='followBtn'>Follow</button>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                ) : (
                    <div id='foryou'>
                        <div id='video'>
                            <Video userId={user_id} />
                        </div>
                    </div>
                )
                }
                <div id='nav'>
                    <ul className='itemLinkAll'>
                        <li className='itemLink'>
                            <Link to={`/`} className='mainLink'>
                                <div className="nav">
                                    <i className='icon fa-solid fa-home'></i><span>For you</span>
                                </div>
                            </Link>
                        </li>
                        <li className='itemLink'>
                            <Link to={`/following`} className='mainLink'>
                                <div className="nav selected">
                                    <i className="icon fa-solid fa-user-group"></i><span>Following</span>
                                </div>
                            </Link>
                        </li>
                        <li className='itemLink'>
                            <Link to={`/#`} className='mainLink'>
                                <div className="nav">
                                    <i className='icon fa-solid fa-compass'></i><span>Explore</span><span id='badge'>New</span>
                                </div>
                            </Link>
                        </li>
                        <li className='itemLink'>
                            <Link to={`/#`} className='mainLink'>
                                <div className="nav">
                                    <i className='icon fa-solid fa-video'></i><span>LIVE</span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                    {content}
                    <div className='bottom' style={{ marginBottom: '100px' }}>
                        <div className='info'>
                            <a href="#" className='link'><span>About</span></a>
                            <a href="#" className='link'><span>Newsroom</span></a>
                            <a href="#" className='link'><span>Contact</span></a>
                            <div className='info'>
                                <a href="#" className='link'><span>Careers</span></a>
                            </div>
                        </div>
                        <div className='info'>
                            <a href="#" className='link'><span>Retok for Good</span></a>
                            <a href="#" className='link'><span>Advertise</span></a>
                            <a href="#" className='link'><span>Developers</span></a>
                            <a href="#" className='link'><span>Transparency</span></a>
                        </div>
                        <div className='info'>
                            <a href="#" className='link'><span>Retok Rewards</span></a>
                            <div className='info'>
                                <a href="#" className='link'><span>Retok Embeds</span></a>
                            </div>
                        </div>
                        <div className='info'>
                            <a href="#" className='link'><span>Helps</span></a>
                            <a href="#" className='link'><span>Safety</span></a>
                            <a href="#" className='link'><span>Term</span></a>
                            <a href="#" className='link'><span>Privacy</span></a>
                            <a href="#" className='link'><span>Creator Portal</span></a>
                        </div>
                        <div className='info'>
                            <a href="#" className='link'><span>Community Guidelines</span></a>
                        </div>

                        {viewMore && (
                            <p>
                                <div className='infoMore'>
                                    <a href="#" className='link'><span>Dance</span></a>
                                    <a href="#" className='link'><span>Arts</span></a>
                                    <a href="#" className='link'><span>Food and Drink</span></a>
                                    <a href="#" className='link'><span>Tourism</span></a>
                                </div>
                                <div className='infoMore'>
                                    <a href="#" className='link'><span>Production and Manufacturing</span></a>
                                    <a href="#" className='link'><span>Vehicles and Transportation</span></a>
                                    <a href="#" className='link'><span>Relationship</span></a>
                                    <a href="#" className='link'><span>Retok Style</span></a>
                                    <a href="#" className='link'><span>Athletics</span></a>
                                    <a href="#" className='link'><span>Hobbies</span></a>
                                </div>
                            </p>
                        )}

                        <button className="more" onClick={toggleContent}>
                            {viewMore ? 'See Less' : 'See More'}
                        </button>

                        <p className='info' style={{ paddingBottom: '30px' }}>
                            © 2023 ReTok
                        </p>
                    </div>
                </div>
                <NavBar />
            </div>
        </>
    )
}

export default ForYou