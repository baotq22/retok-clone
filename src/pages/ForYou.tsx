import '../styles/css/videos.css'
import '../styles/css/sidebar.css'
import NavBar from "../components/navbar"
import effectBtn from '../assets/d8db931296c3e5645b1e.png'
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginModal from "../components/LoginModal";
import { useSelector } from "react-redux";
import LoginInputModal from "../components/LoginInputModal";
import VideoList from "../components/VideoList";
import RightBottomActionButton from "../components/RightBottomActionButton";
import { videoApis } from "../axios-instance";

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

const ForYou = ({ items, initialVisibleItems }) => {
    const navigate = useNavigate();
    const [viewMore, setViewMore] = useState(false);
    const [viewMoreUser, setViewMoreUser] = useState(false);
    const [videoList, setVideoList] = useState<Array<VideoType>>([])
    const toggleContent = () => { setViewMore(!viewMore) };
    const toogleUser = () => { setViewMoreUser(!viewMoreUser) };

    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => { setIsModalOpen(true); }
    const closeModal = () => { setIsModalOpen(false); }

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const openLoginModal = () => { setIsLoginModalOpen(true); setIsModalOpen(false); }
    const closeLoginModal = () => { setIsLoginModalOpen(false); setIsModalOpen(true); }
    const closeAllModal = () => { setIsLoginModalOpen(false); setIsModalOpen(false); }

    const fetchVideos = async () => {
        try {
            const res = await videoApis.get('videos');
            setVideoList(res.data)
        } catch (e) {
            if (e.response && e.response.status == 429) {
                const retryDelay = 500;
                setTimeout(() => fetchVideos(), retryDelay)
            } else {
                console.log("fail")
            }
        }
    }
    useEffect(() => {
        fetchVideos();
    }, [])

    const userLogin = useSelector(state => state.userLogin)
    const user_id = userLogin?.id;
    const userLogged = !userLogin?.username;
    let content;
    if (userLogged) {
        content =
            <>
                <div>
                    <h3 className='titleNotLogin'>Log in to follow creators, like videos, and view comments.</h3>
                    <button id='btn__signin' onClick={openModal}>Log in</button>
                    <div className="example">
                        <p className="example-1"></p>
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
                                    <i className="fa-brands fa-facebook" style={{ float: 'left', marginTop: '5px' }}></i>
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
                            <p>By continuing, you agree to Retok's <a href='#' className='links'>Terms of Service</a> and confirm that you have read Retok's <a href='#' className='links'>Privacy Policy</a>.</p>
                        </div>
                        <div className='signUps'>
                            <p>Don't have an account? <a href='#' className="signUp">Sign Up</a></p>
                        </div>
                    </LoginModal>
                    <LoginInputModal isLoginOpen={isLoginModalOpen} onLoginClose={closeLoginModal} onAllClose={closeAllModal} />
                </div>
            </>
    } else {
        content =
            <>
                <div>
                    <div className="example">
                        <p className="example-2"></p>
                    </div>
                    <h3 className='titleLogin' style={{ marginTop: '-20px' }}>Following accounts</h3>
                    <div className='userList'>
                        <ul className='userItem' style={{ cursor: 'pointer' }}>
                            {
                                videoList.slice(0, 10).map((user, index) =>
                                    <li key={index} className='itemUser' onClick={() => navigate(`/users/${user?.id}`)}>
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
                        {viewMoreUser && (
                            <ul className='userItem' style={{ cursor: 'pointer' }}>
                                {
                                    videoList.slice(11, 20).map((user, index) =>
                                        <li key={index} className='itemUser' onClick={() => navigate(`/users/${user?.id}`)}>
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
                        )}
                        <button className="moreUser" style={{ display: viewMoreUser ? 'none' : '' }} onClick={toogleUser}>
                            {viewMoreUser ? '' : 'See More'}
                        </button>
                    </div>
                    <div className="example">
                        <p className="example-1"></p>
                    </div>
                </div>
            </>
    }

    const preventFailedScreen = () => {
        window.location.reload(false);
    }

    return (
        <>
            <div id='foryouPage'>
                <NavBar />
                <div id='foryou'>
                    <div id='video'>
                        <VideoList userId={user_id} />
                        <RightBottomActionButton />
                    </div>
                </div>
                <div id='nav'>
                    <ul className='itemLinkAll'>
                        <li className='itemLink' onClick={preventFailedScreen}>
                            <Link to={`/`} className='mainLink'>
                                <div className="nav selected">
                                    <i className='icon fa-solid fa-home'></i><span>For you</span>
                                </div>
                            </Link>
                        </li>
                        <li className='itemLink' onClick={preventFailedScreen}>
                            <Link to={`/following`} className='mainLink'>
                                <div className="nav">
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
                    <div className='effectContainer'>
                        <a href='#'>
                            <img src={effectBtn} className='effectBtn' />
                        </a>
                    </div>
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
                </div >
            </div >
        </>
    )
}

export default ForYou