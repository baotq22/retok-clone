import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function checkLogin() {
    const userLogin = useSelector(state => state.userLogin);
    const navigate = useNavigate();

    useEffect(() => {
        
    })
}