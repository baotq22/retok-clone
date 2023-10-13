import { Link, useNavigate, useParams } from "react-router-dom"
import Navbar from "../components/navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import LoginModal from "../components/LoginModal";
import { api, videoApis } from "../axios-instance";
import './styles/sidebar.css'
import './styles/userdetails.css'
import RightBottomActionButton from "../components/RightBottomActionButton";

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

const followUser = async (userId: string | undefined) => {
    try {
        await axios.post(`/${userId}`)
    } catch (e) {
        console.log(e)
    }
}

const unfollowUser = async (userId: string | undefined) => {
    try {
        await axios.delete(`/${userId}`)
    } catch (e) {
        console.log(e)
    }
}

const UserFollowDetails = () => {
    const navigate = useNavigate();
    const [viewMore, setViewMore] = useState(false);
    const [userList, setUserList] = useState<Array<UserType>>([])
    const toggleContent = () => { setViewMore(!viewMore) };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => { setIsModalOpen(true); }
    const closeModal = () => { setIsModalOpen(false); }
    const fetchUsers = async () => {
        try {
            const res = await api.get('users');
            setUserList(res.data)
        } catch (e) {
            if (e.response && e.response.status == 429) {
                const retryDelay = 500;
                setTimeout(() => fetchUsers(), retryDelay)
            } else {
                console.log("fail")
            }
        }
    }
    useEffect(() => {
        fetchUsers();
    })
    const [user, setUser] = useState();

    const params = useParams();
    const userId = params.userId;

    useEffect(() => {
        api.get(`/users/${userId}`).then(res => {
            setUser(res.data)
        }).catch(e => console.log(e));
    }, [])
    const userLogin = useSelector(state => state.userLogin)
    const userFollowId = userLogin?.id == params.userId;
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
                        <p>By continuing, you agree to Retok's <a href='#' className='links'>Terms of Service</a> and confirm that you have read Retok's <a href='#' className='links'>Privacy Policy</a>.</p>
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
                    <div className="example">
                        <p className="example-2"></p>
                    </div>
                    <h3 className='titleLogin' style={{ marginTop: '-20px' }}>Following accounts</h3>
                    <div className='userList'>
                        <ul className='userItem' style={{ cursor: 'pointer' }}>
                            {
                                userList.slice(0, 10).map((user, index) =>
                                    <li key={index} className='itemUser' onClick={() => navigate(`/users/${user?.id}`)}>
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

    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const storedStatus = localStorage.getItem('isFollowing');
        if (storedStatus) {
            setIsFollowing(JSON.parse(storedStatus));
        }
    }, []);

    const handleFollowClick = () => {
        if (isFollowing) {
            unfollowUser(userId);
        } else {
            followUser(userId);
        }
        setIsFollowing(!isFollowing);
        localStorage.setItem('isFollowing', JSON.stringify(!isFollowing));
    };

    let followandEditBtn;
    if (userFollowId) {
        followandEditBtn =
            <div className='button__action'>
                <button className='followBtn'
                    style={{
                        marginTop: '-20px',
                        backgroundColor: '#252525',
                        borderRadius: '3px',
                        marginRight: '10px',
                        border: '1px solid #fff',
                        padding: '0.6em 0',
                        fontSize: '1em',
                        fontWeight: '500',
                        fontFamily: 'inherit',
                        color: '#fff',
                        cursor: 'pointer',
                        width: '210px',
                        transition: 'border-color 0.25s'
                    }}><i className="fa-regular fa-pen-to-square" style={{ marginRight: '8px' }}></i>Edit Profile</button>
            </div>
    } else {
        followandEditBtn =
            <div className='button__action'>
                <button className='followBtn' onClick={handleFollowClick}
                    style={{
                        marginTop: '-20px',
                        backgroundColor: isFollowing ? '#252525' : '#f22459',
                        borderRadius: '3px',
                        marginRight: '10px',
                        border: isFollowing ? '1px solid #f22459' : '1px solid transparent',
                        padding: '0.6em 0',
                        fontSize: '1em',
                        fontWeight: '500',
                        fontFamily: 'inherit',
                        color: isFollowing ? '#f22459' : '#fff',
                        cursor: 'pointer',
                        width: '210px',
                        transition: 'border-color 0.25s'
                    }}>{isFollowing ? 'Following' : 'Follow'}</button>
            </div>
    }
    return (
        <>
            <div id='userDetailsPage'>
                <Navbar />
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
                <div id='detailedUser'>
                    <div className='detailedUserComponents'>
                        <RightBottomActionButton />
                        <div className='detailedUserInfo'>
                            <div className='detailedUserName'>
                                <div className='detailedUserAvatar'>
                                    <span className="avatarCircle">
                                        <img src={user?.image} className='avatar' />
                                    </span>
                                </div>
                                <div className='detailed__username'>
                                    <p className='detailUsername'><b>{user?.username}</b></p>
                                    <p className='detailFullname'>{user?.fullname}</p>
                                    {followandEditBtn}
                                </div>
                            </div>
                            <h3 className='detailedAmount'>
                                <div><b>{user?.followingAmount}</b><span>Following</span></div>
                                <div><b>{user?.followersAmount}</b><span>Followers</span></div>
                                <div><b>{user?.reactAllAmount}</b><span>Likes</span></div>
                                <div className='advancedAction'>
                                    <span><i className="fa-solid fa-ellipsis"></i></span>
                                    <span><i className="fa-solid fa-share"></i></span>
                                </div>
                            </h3>
                            <h2 className='user__desc'>{user?.description}</h2>
                        </div>
                    </div>
                    <h3 className='videosHeaders'>Videos</h3>
                    <div className='userContainer'>
                        <div className='userVideo'>
                            {
                                userList.map((user, index) =>
                                    <>
                                        <div className='userInfo' key={index}>
                                            <Link to={`/userFollow/${user.id}`}>
                                                <img src={user?.imageMain} className='imgUser' />
                                            </Link>
                                            <div className='userFollow'>
                                                <Link to={`/userFollow/${user.id}`} style={{ textDecoration: '0', color: '#fff' }}>
                                                    <i className="fa-solid fa-play fa-fade"></i><span className="detailedViewers">{user?.viewers}</span>
                                                </Link>
                                            </div>
                                            <div className='video__desc'>{user?.description}</div>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserFollowDetails