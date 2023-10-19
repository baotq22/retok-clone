import { useRef, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../../slices/userLoginSlice"
import "../../styles/css/loginmodal.css"
import { getAllCountry as getAllCountryApi } from "../../api/countryApi"

const LoginInputModal = ({ isLoginOpen, onLoginClose, onAllClose }) => {
    const User = useRef(null)
    const Pass = useRef(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const isInputDisabled = username.length === 0 || password.length === 0

    const { isLoginSuccess } = useSelector((state) => state.userLogin)

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    let loadingContent
    if (loading) {
        loadingContent = (
            <>
                <button className="btnLogin">
                    <i className="fa-solid fa-spinner fa-spin"></i>
                </button>
            </>
        )
    } else {
        loadingContent = (
            <>
                <button disabled={isInputDisabled} onClick={loginClick} className="btnLogin">
                    Log in
                </button>
            </>
        )
    }

    async function loginClick() {
        const username = User.current?.value
        const password = Pass.current?.value
        setLoading(true);
        try {
            // @ts-ignore
            await dispatch(login({ username, password })).unwrap()
            if (!localStorage.getItem("username") && !localStorage.getItem("password")) {
                setError("Username or password doesn't match our records. Try again.");
            } else {
                navigate("/");
            }
        } catch (e) {
            setError("Username or password doesn't match our records. Try again.")
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isLoginSuccess) {
            navigate("/")
        }
    }, [isLoginSuccess])

    const [isChanged, setIsChanged] = useState(false)
    const changeLoginMethod = () => {
        setIsChanged((current) => !current)
    }

    const [apiCountry, setApiCountry] = useState([])
    const rootCountry = apiCountry
    useEffect(() => {
        getAllCountryApi().then((data) => {
            setApiCountry(data)
        })
    }, [])

    // useEffect(() => {
    //     const keyDownHandler = event => {
    //         if (event.key === "Enter") {
    //             if (localStorage.getItem("username") && localStorage.getItem("password")) {
    //                 navigate("/")
    //             } else {
    //                 setError("Username or password doesn't match our records. Try again.")
    //             }
    //         }
    //     }
    //     document.addEventListener("keydown", keyDownHandler);
    //     return () => {
    //         document.removeEventListener("keydown", keyDownHandler);
    //     }
    // }, [])

    if (!isLoginOpen) return null

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="back-button" onClick={onLoginClose}>
                    <i className="fa-solid fa-angle-left"></i>
                </button>
                <button className="close-button" onClick={onAllClose}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <h2 className="modal_titles">Log in</h2>
                <div className="login_method">
                    <span className="loginMethod">{isChanged ? "Email or username" : "Phone"}</span>
                    <span className="changeLoginMethod" onClick={changeLoginMethod}>
                        {isChanged ? "Log in with phone" : "Log in with email or username"}
                    </span>
                </div>
                <br />
                <div className="inputContainer">
                    {isChanged ? (
                        <div className="input_container">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="inputBox"
                                placeholder="Email or username"
                                required
                                ref={User}
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="inputBox"
                                placeholder="Password"
                                required
                                ref={Pass}
                            />
                            <div className="inputValidate">{error && <span>{error}</span>}</div>
                            <div className="forgotPwd">
                                <span>Forgot password</span>
                            </div>
                            {loadingContent}
                            {/* <button disabled={isInputDisabled} onClick={loginClick} className="btnLogin">
                                Log in
                            </button> */}
                        </div>
                    ) : (
                        <>
                            <div className="input_container">
                                <select className="countryDropDownList">
                                    {rootCountry.map((rootCountries) => (
                                        <option>
                                            {rootCountries.name} {rootCountries.dial_code}
                                        </option>
                                    ))}
                                </select>
                                <input className="phoneNoBox" type="text" placeholder="Phone number" />
                            </div>
                            <div className="input_container">
                                <input className="sixDigitCodeBox" type="text" placeholder="Enter 6-digit code" />
                                <button className="sendbtn">Send Code</button>
                            </div>
                            <div className="inputValidate">{error && <span>{error}</span>}</div>
                            <div className="forgotPwd">
                                <span className="forgotPwdBtn">Login with password</span>
                            </div>
                            <button disabled className="btnLogin">
                                Log in
                            </button>
                        </>
                    )}
                    <div className="signUps">
                        <p className="sign_ups">
                            Don't have an account?{" "}
                            <a href="#" className="signUp">
                                Sign Up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginInputModal
