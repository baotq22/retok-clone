import { Link, useNavigate } from "react-router-dom"
import Navbar from "../components/navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import LoginModal from "../components/LoginModal";
import { api, videoApis } from "../axios-instance";
import avatar from '../assets/vite.svg'
import './styles/sidebar.css'
import './styles/userdetails.css'

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
    console.log(response);
}

const UserDetails = () => {
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
    const userLogged = !userLogin?.name;
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
                                userList.map((user, index) =>
                                    <li key={index} className='itemUser'>
                                        <div className='userAvatar'>
                                            <span className='avatarIcon'><img src={user?.image} className='avatarList' /></span>
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
        <div id='userDetailsPage'>
            <Navbar />
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
            <div id='detailedUser'>
                <div className='detailedUserComponents'>
                    <div className='detailedUserInfo'>
                        <div className='detailedUserName'>
                            <div className='detailedUserAvatar'>
                                <span className="avatarCircle">
                                    <img src={avatar} />
                                </span>
                            </div>
                            <div className='detailed__username'>
                                <h1>username</h1>
                                <h2>name</h2>
                                <div className='button__action'>
                                    <div>
                                        <button>Follow</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h3>
                            <span><b>1</b>Following</span>
                            <span><b>1</b>Followers</span>
                            <span><b>1</b>Likes</span>
                        </h3>
                        <h2>Description</h2>
                        <div>
                            <span><i className="fa-solid fa-share"></i></span>
                            <span><i className="fa-solid fa-ellipsis"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetails