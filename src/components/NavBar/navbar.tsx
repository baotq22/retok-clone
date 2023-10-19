import logoDark from "../../assets/logo_dark.png"
import logoLight from "../../assets/logo_light.png"
import SearchBar from "./SearchBar"
import "../../styles/css/navbar.css"
import "../../library/fontawesome/css/all.min.css"
import LoginModal from "../Modal/LoginModal"
import { memo, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import images from "../../assets/309431756_799936498003792_6138006382387941828_n.jpg"
import { logout } from "../../slices/userLoginSlice"
import LoginInputModal from "../Modal/LoginInputModal"
import ShortcutModal from "../Modal/ShortcutModal"
import UserHover from "./UserHover"
import DownloadApp from "./DownloadApp"

export const NavBar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function logoutUser() {
        dispatch(logout())
        navigate("/")
        window.location.reload()
    }

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

    const [mode, setMode] = useState()

    const directToHomePage = () => {
        navigate("/")
    }

    useEffect(() => {
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
            const colorScheme = event.matches ? "dark" : "light"
            setMode(colorScheme)
        })
    }, [])

    const userLogin = localStorage.getItem("username")
    const userLogged = !userLogin

    let content
    if (userLogged) {
        content = (
            <>
                <span className="iconNavs menu-container" style={{ cursor: "pointer", marginLeft: "0px" }}>
                    <i className="fa-solid fa-ellipsis-vertical icon_Nav iconActions"></i>
                    <UserHover />
                </span>
                <span className="iconNav iconPlane menu-container" style={{ cursor: "pointer" }}>
                    <i className="fa-solid fa-laptop iconAction"></i>
                    <DownloadApp />
                </span>
                <button id="btn__login" onClick={openModal}>
                    Log in
                </button>
                <button id="btn__upload" onClick={openModal}>
                    <i className="fa-solid fa-plus iconAction" style={{ marginRight: "5px" }}></i>Upload
                </button>
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
                                <i className="fa-brands fa-facebook" style={{ float: "left", marginTop: "5px" }}></i>
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
                                <i className="fa-brands fa-instagram" style={{ float: "left", marginTop: "5px" }}></i>
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
            </>
        )
    } else {
        content = (
            <>
                <span className="menu-container">
                    <span className="avatarNav">
                        <img src={images} className="avatar" />
                    </span>
                    <UserHover />
                </span>
                <span className="iconNav" style={{ cursor: "pointer" }}>
                    <i className="fa-regular fa-message iconAction"></i>
                </span>
                <span className="iconNav iconPlane" style={{ cursor: "pointer" }}>
                    <i className="fa-regular fa-paper-plane iconAction"></i>
                </span>
                <button id="btn__upload">
                    <i className="fa-solid fa-plus iconAction" style={{ marginRight: "5px" }}></i>Upload
                </button>
            </>
        )
    }

    return (
        <header>
            <div id="header">
                <img
                    src={mode === "dark" ? logoDark : logoLight}
                    id="logo"
                    alt="Logo"
                    style={{ cursor: "pointer" }}
                    onClick={directToHomePage}
                />
                <SearchBar />
                {content}
            </div>
        </header>
    )
}

export default memo(NavBar)
