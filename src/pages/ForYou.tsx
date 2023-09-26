import './styles/foryou.css'
import './styles/sidebar.css'
import NavBar from "../components/navbar"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import LoginModal from "../components/LoginModal";
import Video1 from '../assets/videos/1.mp4'
import { api, videoApis } from "../axios-instance";
import { useSelector } from "react-redux";
import axios from "axios";

type UserType = {
    username: string
    fullname: string
    image: string
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

async function getUser() {
    const response = await api.get(`/users`);
}

async function getVideos() {
    const response = await videoApis.get(`/videos`)
}

const AutoPlayVideo = () => {
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const videoElement = document.getElementById('autoplay-video')
            const rect = videoElement?.getBoundingClientRect();
            const threshold = window.innerHeight / 2;

            if (rect.top < threshold && !isPlaying) {
                videoElement.play();
                setIsPlaying(true);
            } else if (rect.top > threshold && !isPlaying) {
                videoElement.pause();
                setIsPlaying(false);
            }
        }
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [isPlaying])
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
    useEffect(() => {
        getUser();
        getVideos();
    }, [])
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
                        <a className='loginMethods' onClick={() => navigate(`/login`)}>
                            <div className='loginMethod'>
                                <i className="fa-regular fa-user" style={{ float: 'left', marginTop: '5px' }}></i>
                                <span>Use phone / email / username</span>
                            </div>
                        </a>
                        <a href="#" className='loginMethods'>
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
            </>
    } else {
        content =
            <>
                <div>
                    <div className="example-2">
                        <p className="example-3"></p>
                    </div>
                    <h3 className='title'>Following accounts</h3>
                    <div className='userList'>
                        <ul className='userItem'>
                            {
                                videoList.map((user, index) =>
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
    AutoPlayVideo();

    return (
        <div id='foryouPage'>
            <NavBar />
            <div id='nav'>
                <ul className='itemLinkAll'>
                    <li className='itemLink'>
                        <Link to={`/`} className='mainLink'>
                            <div className="nav selected">
                                <i className='icon fa-solid fa-home'></i><span>For you</span>
                            </div>
                        </Link>
                    </li>
                    <li className='itemLink'>
                        <Link to={`/following`} className='mainLink'>
                            <div className="nav">
                                <i className="icon fa-solid fa-user-group"></i><span>Following</span>
                            </div>
                        </Link>
                    </li>
                    <li className='itemLink'>
                        <Link to={`/following`} className='mainLink'>
                            <div className="nav">
                                <i className='icon fa-solid fa-compass'></i><span>Explore</span><span id='badge'>New</span>
                            </div>
                        </Link>
                    </li>
                    <li className='itemLink'>
                        <Link to={`/following`} className='mainLink'>
                            <div className="nav">
                                <i className='icon fa-solid fa-video'></i><span>LIVE</span>
                            </div>
                        </Link>
                    </li>
                </ul>
                {content}
                <div className='bottom'>
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
                        <a href="#" className='link'><span>Terms</span></a>
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
            <div id='foryou'>
                <div id='video'>
                    {
                        videoList.map((video, index) =>
                            <div className='videos__container'>
                                <div className='avatarContainer'>
                                    <Link to={`/users/${video?.id}`}>
                                        <span className='avatarVideo'>
                                            <img src={video?.avatar} className='avatar' />
                                        </span>
                                    </Link>
                                </div>
                                <div className='videoContainer'>
                                    <div className='video-user'>
                                        <Link to={`/users/${video?.id}`} style={{ textDecoration: '0', color: '#fff' }}>
                                            <span><b>{video?.username} </b></span>
                                            <span>{video?.fullname}</span>
                                        </Link>
                                        <button className='follow_btn'>Follow</button>
                                        <p className='videoDesc'>{video?.description}</p>
                                    </div>
                                    <div className='videoDetails'>
                                        <div className="videoBox">
                                            <Link to={`/videos/${video?.id}`} >
                                                <video autoPlay controls className='videos' id='autoplay-video'>
                                                    <source src={Video1} type='video/webm' />
                                                </video>
                                            </Link>
                                            <div className='videoAction'>
                                                <button className='action_btn'>
                                                    <span>
                                                        <i className="fa-solid fa-heart"></i>
                                                    </span>
                                                </button>
                                                <p className='actionAmount'><strong>{video?.reactAmount}</strong></p>
                                                <button className='action_btn'>
                                                    <span>
                                                        <i className="fa-solid fa-comment-dots"></i>
                                                    </span>
                                                </button>
                                                <p className='actionAmount'><strong>{video?.commentAmount}</strong></p>
                                                <button className='action_btn'>
                                                    <span>
                                                        <i className="fa-solid fa-bookmark"></i>
                                                    </span>
                                                </button>
                                                <p className='actionAmount'><strong>{video?.savedAmount}</strong></p>
                                                <button className='action_btn'>
                                                    <span>
                                                        <i className="fa-solid fa-share"></i>
                                                    </span>
                                                </button>
                                                <p className='actionAmount'><strong>{video?.shareAmount}</strong></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ForYou