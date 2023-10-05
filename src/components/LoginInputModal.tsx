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

    // const user = useContext(UserContext);
    // console.log(user);
    const { isLoginSuccess } = useSelector(state => state.userLogin)
    // const userLogin = useSelector(state => state.userLogin);

    async function loginClick() {
        const username = User.current?.value;
        const password = Pass.current?.value;
        // api.get(`/users?username=${username}&&password=${password}`).then(res => {
        //     if (res.data.length > 0) {
        //         // user.setUser(username);
        //         dispatch(loginSuccess({username: username, password: password}));
        //         navigate('/')
        //     } else {
        //         alert('lol');
        //     }
        // }).catch(e => {
        //     console.log(e);
        //     alert('lol');
        // })
        try {
            await dispatch(login({ username, password })).unwrap();
            navigate('/');
        } catch (e) {
            console.log(e)
            alert('Login failed! Try again')
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
                    <span style={{ float: 'left' }}>{isChanged ? 'Email or username' : 'Phone'}</span>
                    <span style={{ float: 'right', cursor: 'pointer' }} onClick={changeLoginMethod}>{isChanged ? 'Log in with phone' : 'Log in with email or username'}</span>
                </div>
                <br />
                <div >
                    {isChanged ?
                        <div style={{ marginTop: '15px' }}>
                            <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} style={{
                                width: '92%',
                                height: '48px',
                                border: '0',
                                padding: '1px 1.2em',
                                borderRadius: '0 4px 4px 0',
                                fontFamily: 'inherit'
                            }} placeholder='Email or username' required ref={User} />
                            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} style={{
                                width: '92%',
                                height: '48px',
                                border: '0',
                                padding: '1px 1.2em',
                                borderRadius: '0 4px 4px 0',
                                fontFamily: 'inherit',
                                marginTop: '15px'
                            }} placeholder='Password' required ref={Pass} />
                            <p>Forgot password</p>
                            <button disabled={isInputDisabled} style={{
                                width: '100%',
                                height: '48px',
                                fontFamily: 'inherit'
                            }} onClick={loginClick}>Log in</button>
                        </div>
                        :
                        <>
                            <div style={{ marginTop: '15px' }}>
                                <select style={{
                                    width: '28%',
                                    height: '50px',
                                    border: '0',
                                    padding: '2px 1.2em',
                                    borderRadius: '4px 0 0 4px',
                                    fontFamily: 'inherit'
                                }}>
                                    {
                                        rootCountry.map((rootCountries) => (
                                            <option>{rootCountries.name} {rootCountries.dial_code}</option>
                                        ))
                                    }
                                </select>
                                <input type='text' style={{
                                    width: '64%',
                                    height: '48px',
                                    border: '0',
                                    padding: '1px 1.2em',
                                    borderRadius: '0 4px 4px 0',
                                    fontFamily: 'inherit'
                                }} placeholder='Phone number' />
                            </div>
                            <div style={{ marginTop: '15px' }}>
                                <input type='text' style={{
                                    width: '64%',
                                    height: '48px',
                                    border: '0',
                                    padding: '1px 1.2em',
                                    borderRadius: '0 4px 4px 0',
                                    fontFamily: 'inherit'
                                }} placeholder='Enter 6-digit code' />
                                <button style={{
                                    width: '28%',
                                    height: '50px',
                                    border: '0',
                                    padding: '2px 1.2em',
                                    borderRadius: '4px 0 0 4px',
                                    fontFamily: 'inherit'
                                }}>Send Code
                                </button>
                            </div>
                            <p>Login with password</p>
                            <button disabled style={{
                                width: '100%',
                                height: '48px',
                                fontFamily: 'inherit'
                            }}>Log in</button>
                        </>
                    }
                    <div className='signUps' style={{ marginTop: '90px', borderTop: '1px solid #e3e3e4' }}>
                        <p>Don't have an account? <a href='#' className="signUp">Sign Up</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginInputModal
