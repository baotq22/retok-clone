import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../../slices/userLoginSlice"
import ShortcutModal from "../Modal/ShortcutModal"

const UserHover = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userLoginId = localStorage.getItem("id")

    function logoutUser() {
        dispatch(logout())
        navigate("/")
        window.location.reload()
    }

    const [isShortcutModalOpen, setIsShortcutModalOpen] = useState(false)
    const openShortcutModal = () => {
        setIsShortcutModalOpen(true)
    }
    const closeShortcutModal = () => {
        setIsShortcutModalOpen(false)
    }

    const userLogin = localStorage.getItem("username")
    const userLogged = !userLogin
    let content

    if (userLogged) {
        content = (
            <>
                <ul className="menu" style={{ listStyleType: "none" }}>
                    <li>
                        <span>
                            <i className="fa-regular fa-lightbulb" style={{ marginRight: "18px" }}></i>
                        </span>
                        <span>LIVE Creator Hub</span>
                    </li>
                    <li>
                        <span>
                            <i className="fa-solid fa-earth-americas" style={{ marginRight: "14px" }}></i>
                        </span>
                        <span>English</span>
                    </li>
                    <li>
                        <span>
                            <i className="fa-regular fa-circle-question" style={{ marginRight: "14px" }}></i>
                        </span>
                        <span>Feedback and help</span>
                    </li>
                    <li onClick={openShortcutModal}>
                        <span>
                            <i className="fa-regular fa-keyboard" style={{ marginRight: "12px" }}></i>
                        </span>
                        <span>Keyboard shortcuts</span>
                    </li>
                </ul>
                <ShortcutModal isShortcutOpen={isShortcutModalOpen} onShortcutClose={closeShortcutModal} />
            </>
        )
    } else {
        content = (
            <>
                <ul className="menu" style={{ listStyleType: "none" }}>
                    <li onClick={() => navigate(`/userFollow/${userLoginId}`)}>
                        <span>
                            <i className="fa-regular fa-user" style={{ marginRight: "16px" }}></i>
                        </span>
                        <span>View profile</span>
                    </li>
                    <li>
                        <span>
                            <i className="fa-regular fa-bookmark" style={{ marginRight: "18px" }}></i>
                        </span>
                        <span>Favourites</span>
                    </li>
                    <li>
                        <span>
                            <i className="fa-solid fa-coins" style={{ marginRight: "14px" }}></i>
                        </span>
                        <span>Get coins</span>
                    </li>
                    <li>
                        <span>
                            <i className="fa-regular fa-lightbulb" style={{ marginRight: "18px" }}></i>
                        </span>
                        <span>LIVE Creator Hub</span>
                    </li>
                    <li>
                        <span>
                            <i className="fa-solid fa-gear" style={{ marginRight: "14px" }}></i>
                        </span>
                        <span>Setting</span>
                    </li>
                    <li>
                        <span>
                            <i className="fa-solid fa-earth-americas" style={{ marginRight: "14px" }}></i>
                        </span>
                        <span>English</span>
                    </li>
                    <li>
                        <span>
                            <i className="fa-regular fa-circle-question" style={{ marginRight: "14px" }}></i>
                        </span>
                        <span>Feedback and help</span>
                    </li>
                    <li onClick={openShortcutModal}>
                        <span>
                            <i className="fa-regular fa-keyboard" style={{ marginRight: "12px" }}></i>
                        </span>
                        <span>Keyboard shortcuts</span>
                    </li>
                    <li onClick={logoutUser}>
                        <span>
                            <i className="fa-solid fa-arrow-right-from-bracket" style={{ marginRight: "14px" }}></i>
                        </span>
                        <span>Logout</span>
                    </li>
                </ul>
                <ShortcutModal isShortcutOpen={isShortcutModalOpen} onShortcutClose={closeShortcutModal} />
            </>
        )
    }

    return <>{content}</>
}

export default UserHover