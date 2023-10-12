import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './styles/login.css'
import { useDispatch, useSelector } from 'react-redux'
import { login } from "../slices/userLoginSlice";

const UserLogin = () => {
    const User = useRef(null);
    const Pass = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoginSuccess } = useSelector(state => state.userLogin)

    async function loginClick() {
        const username = User.current?.value;
        const password = Pass.current?.value;
        try {
            await dispatch(login({ username, password })).unwrap();
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (isLoginSuccess) {
            navigate('/')
        }
    }, [isLoginSuccess])

    useEffect(() => {

    }, [])

    return (
        <div id='signInBody'>
            <div className="signin">
                <div className="content">
                    <h2>Sign In</h2>
                    <div className="form">
                        <div className="inputBox">
                            <input type="text" required ref={User} placeholder='Username' />
                        </div>
                        <div className="inputBox">
                            <input type="password" required ref={Pass} placeholder='Password' />
                        </div>
                        <div className="links"> <a href="#">Forgot Password</a> <a href="#">Signup</a>
                        </div>
                        <div className="inputBox">
                            <button className='loginBtn' onClick={loginClick}>Login</button>
                            <button className='loginBtn' style={{marginLeft: '10px'}} onClick={() => navigate(`/`)}>Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserLogin