import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../slices/userLoginSlice";
import './styles/loginmodal.css'
import { getAllCountry as getAllCountryApi } from "../countryApi";

const LoginInputModal = ({ isLoginOpen, onLoginClose, onAllClose }) => {
    const User = useRef(null);
    const Pass = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoginSuccess } = useSelector(state => state.userLogin)

    const [error, setError] = useState('')

    async function loginClick() {
        const username = User.current?.value;
        const password = Pass.current?.value;
        try {
            await dispatch(login({ username, password })).unwrap();
            navigate('/');
        } catch (e) {
            console.log(e)
            setError("Username or password doesn't match our records. Try again.")
        }
    }

    useEffect(() => {
        if (isLoginSuccess) {
            navigate('/')
        }
    }, [isLoginSuccess])

    const [isChanged, setIsChanged] = useState(false);
    const changeLoginMethod = () => {
        setIsChanged(current => !current);
    }

    const [apiCountry, setApiCountry] = useState([]);
    const rootCountry = apiCountry
    useEffect(() => {
        getAllCountryApi().then((data) => {
            setApiCountry(data);
        });
    }, []);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const isInputDisabled = username.length === 0 || password.length === 0

    useEffect(() => {
        const keyDownHandler = event => {
            console.log(event.key)
            if (event.key === 'Enter') {
                loginClick();
            }
        }

        document.addEventListener('keydown', keyDownHandler);
        
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        }
    }, [])

    if (!isLoginOpen) return null;

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <button className='back-button' onClick={onLoginClose}>
                    <i className="fa-solid fa-angle-left"></i>
                </button>
                <button className='close-button' onClick={onAllClose}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <h1 style={{ fontSize: '200%', marginTop: '40px' }}>Log in</h1>
                <div>
                    <span style={{ float: 'left', marginLeft: '7px' }}>{isChanged ? 'Email or username' : 'Phone'}</span>
                    <span style={{ float: 'right', marginRight: '7px', cursor: 'pointer' }} onClick={changeLoginMethod}>{isChanged ? 'Log in with phone' : 'Log in with email or username'}</span>
                </div>
                <br />
                <div className='inputContainer'>
                    {isChanged ?
                        <div className='input_container' style={{ marginTop: '15px' }}>
                            <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} className='inputBox' placeholder='Email or username' required ref={User} />
                            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='inputBox' placeholder='Password' required ref={Pass} />
                            <div className='inputValidate'>{error && <span>{error}</span>}</div>
                            <div className='forgotPwd'><span>Forgot password</span></div>
                            <button disabled={isInputDisabled} onClick={loginClick} className='btnLogin'>Log in</button>
                        </div>
                        :
                        <>
                            <div className='input_container' style={{ marginTop: '15px' }}>
                                <select className='countryDropDownList'>
                                    {
                                        rootCountry.map((rootCountries) => (
                                            <option>{rootCountries.name} {rootCountries.dial_code}</option>
                                        ))
                                    }
                                </select>
                                <input className='phoneNoBox' type='text' placeholder='Phone number' />
                            </div>
                            <div className='input_container' style={{ marginTop: '15px' }}>
                                <input className='sixDigitCodeBox' type='text' placeholder='Enter 6-digit code' />
                                <button className='sendbtn'>Send Code</button>
                            </div>
                            <div className='forgotPwd'><span>Login with password</span></div>
                            <button disabled className='btnLogin'>Log in</button>
                        </>
                    }
                    <div className='signUps' style={{ marginTop: '90px', borderTop: '1px solid #e3e3e4' }}>
                        <p style={{textDecoration: 0, fontWeight: '600'}}>Don't have an account? <a href='#' style={{textDecoration: 0, fontWeight: '600', color: '#fe2c55'}}>Sign Up</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginInputModal
