import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../axios-instance";
import './styles/login.css'
import { useDispatch } from 'react-redux'
import { loginSuccess } from "../slices/userLoginSlice";

async function getUser() {
    const response = await api.get(`/users`);
}

const UserLogin = () => {
    const User = useRef(null);
    const Pass = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const user = useContext(UserContext);
    // console.log(user);

    function login() {
        const username = User.current?.value;
        const password = Pass.current?.value;
        api.get(`/users?username=${username}&&password=${password}`).then(res => {
            if (res.data.length > 0) {
                // user.setUser(username);
                dispatch(loginSuccess(username))
                navigate('/')
            } else {
                alert('lol');
            }
        }).catch(e => {
            console.log(e);
            alert('lol');
        })
    }

    return (
        <div id='signInBody'>
            <div className="signin">
                <div className="content">
                    <h2>Sign In</h2>
                    <div className="form">
                        <div className="inputBox">
                            <input type="text" required ref={User} placeholder='Username'/>
                        </div>
                        <div className="inputBox">
                            <input type="password" required ref={Pass} placeholder='Password'/>
                        </div>
                        <div className="links"> <a href="#">Forgot Password</a> <a href="#">Signup</a>
                        </div>
                        <div className="inputBox">
                            <button className='loginBtn' onClick={login}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserLogin