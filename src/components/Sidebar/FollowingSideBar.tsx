import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import LoginModal from "../Modal/LoginModal"
import LoginInputModal from "../Modal/LoginInputModal"
import { videoApis } from "../../api/axios-instance"
import Skeleton from '@mui/material/Skeleton';

type UserDetailObject = {
    id: string
    avatar: string
    username: string
    fullname: string
}

const FollowingSideBar = () => {
    const navigate = useNavigate()
    const [videoList, setVideoList] = useState<Array<UserDetailObject>>([])
    const [viewMoreUser, setViewMoreUser] = useState(false)
    const toogleUser = () => {
        setViewMoreUser(!viewMoreUser)
    }

    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false)
    const openModal = () => {
        setIsModalOpen(true)
    }
    const closeModal = () => {
        setIsModalOpen(false)
    }

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const openLoginModal = () => {
        setIsLoginModalOpen(true)
        setIsModalOpen(false)
    }
    const closeLoginModal = () => {
        setIsLoginModalOpen(false)
        setIsModalOpen(true)
    }
    const closeAllModal = () => {
        setIsLoginModalOpen(false)
        setIsModalOpen(false)
    }

    const fetchVideos = async () => {
        setLoading(true)
        try {
            const res = await videoApis.get("videos")
            setVideoList(res.data)
        } catch (e) {
            if (e.response && e.response.status == 429) {
                const retryDelay = 500
                setTimeout(() => fetchVideos(), retryDelay)
            } else {
                console.log("fail")
            }
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchVideos()
    }, [])

    const [loading, setLoading] = useState(false);
    let loadingContent

    const userLogin = localStorage.getItem("username")
    const userLogged = !userLogin
    let content
    if (userLogged) {
        content = (
            <>
                <div>
                    <h3 className="titleNotLogin">Log in to follow creators, like videos, and view comments.</h3>
                    <button id="btn__signin" onClick={openModal}>
                        Log in
                    </button>
                    <div className="example">
                        <p className="example-1"></p>
                    </div>
                    <LoginModal isOpen={isModalOpen} onClose={closeModal}>
                        <h2 style={{ margin: "60px 0 30px 0" }}>Log in to Retok</h2>
                        <div className="login_methods">
                            <a href="#" className="loginMethods">
                                <div className="loginMethod">
                                    <i className="fa-solid fa-qrcode" style={{ float: "left", marginTop: "5px" }}></i>
                                    <span>Scan QR Code</span>
                                </div>
                            </a>
                            <a className="loginMethods" onClick={openLoginModal}>
                                <div className="loginMethod">
                                    <i className="fa-regular fa-user" style={{ float: "left", marginTop: "5px" }}></i>
                                    <span>Use phone / email / username</span>
                                </div>
                            </a>
                            <a className="loginMethods">
                                <div className="loginMethod">
                                    <i
                                        className="fa-brands fa-facebook"
                                        style={{ float: "left", marginTop: "5px" }}
                                    ></i>
                                    <span>Continue with Facebook</span>
                                </div>
                            </a>
                            <a href="#" className="loginMethods">
                                <div className="loginMethod">
                                    <i className="fa-brands fa-google" style={{ float: "left", marginTop: "5px" }}></i>
                                    <span>Continue with Google</span>
                                </div>
                            </a>
                            <a href="#" className="loginMethods">
                                <div className="loginMethod">
                                    <i className="fa-brands fa-twitter" style={{ float: "left", marginTop: "5px" }}></i>
                                    <span>Continue with Twitter</span>
                                </div>
                            </a>
                            <a href="#" className="loginMethods">
                                <div className="loginMethod">
                                    <i className="fa-brands fa-line" style={{ float: "left", marginTop: "5px" }}></i>
                                    <span>Continue with LINE</span>
                                </div>
                            </a>
                            <a href="#" className="loginMethods">
                                <div className="loginMethod">
                                    <i className="fa-brands fa-apple" style={{ float: "left", marginTop: "5px" }}></i>
                                    <span>Continue with Apple</span>
                                </div>
                            </a>
                            <a href="#" className="loginMethods">
                                <div className="loginMethod">
                                    <i
                                        className="fa-brands fa-instagram"
                                        style={{ float: "left", marginTop: "5px" }}
                                    ></i>
                                    <span>Continue with Instagram</span>
                                </div>
                            </a>
                        </div>
                        <div className="license">
                            <p>
                                By continuing, you agree to Retok's{" "}
                                <a href="#" className="links">
                                    Terms of Service
                                </a>{" "}
                                and confirm that you have read Retok's{" "}
                                <a href="#" className="links">
                                    Privacy Policy
                                </a>
                                .
                            </p>
                        </div>
                        <div className="sign__up">
                            <p className="sign_ups">
                                Don't have an account?{" "}
                                <a href="#" className="signUp">
                                    Sign Up
                                </a>
                            </p>
                        </div>
                    </LoginModal>
                    <LoginInputModal
                        isLoginOpen={isLoginModalOpen}
                        onLoginClose={closeLoginModal}
                        onAllClose={closeAllModal}
                    />
                </div>
            </>
        )
    } else {
        content = (
            <>
                <div>
                    <div className="example">
                        <p className="example-2"></p>
                    </div>
                    <h3 className="titleLogin" style={{ marginTop: "-20px" }}>
                        Following accounts
                    </h3>
                    <div className="userList">
                        {loading ? (
                            <>
                                <ul className="userItem">
                                    <li className="itemUser">
                                        <div className="userAvatar">
                                            <span className="avatarIcon">
                                                <Skeleton variant="circular" width={40} height={40} />
                                            </span>
                                            <span className="infoUser">
                                                <p className="nameAll" style={{marginBottom: '1px'}}>
                                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                                </p>
                                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </>
                        ) : (
                            <>
                                <ul className="userItem" style={{ cursor: "pointer" }}>
                                    {videoList.slice(0, 10).map((user, index) => (
                                        <li key={index} className="itemUser" onClick={() => navigate(`/users/${user?.id}`)}>
                                            <div className="userAvatar">
                                                <span className="avatarIcon">
                                                    <img src={user?.avatar} className="avatarList" />
                                                </span>
                                                <span className="infoUser">
                                                    <p className="nameAll">
                                                        <b>{user?.username}</b>
                                                    </p>
                                                    <p className="nameAll">{user?.fullname}</p>
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                {viewMoreUser && (
                                    <ul className="userItem" style={{ cursor: "pointer" }}>
                                        {videoList.slice(11, 20).map((user, index) => (
                                            <li key={index} className="itemUser" onClick={() => navigate(`/users/${user?.id}`)}>
                                                <div className="userAvatar">
                                                    <span className="avatarIcon">
                                                        <img src={user?.avatar} className="avatarList" />
                                                    </span>
                                                    <span className="infoUser">
                                                        <p className="nameAll">
                                                            <b>{user?.username}</b>
                                                        </p>
                                                        <p className="nameAll">{user?.fullname}</p>
                                                    </span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <button
                                    className="moreUser"
                                    style={{ display: viewMoreUser ? "none" : "" }}
                                    onClick={toogleUser}
                                >
                                    {viewMoreUser ? "" : "See More"}
                                </button>
                            </>
                        )}
                    </div>
                    <div className="example">
                        <p className="example-1"></p>
                    </div>
                </div>
            </>
        )
    }
    return <>{content}</>
}

export default FollowingSideBar
