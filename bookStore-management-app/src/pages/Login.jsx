import { useState,useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login=() => {
    const [username, setUsername]= useState("");
    const [ password, setPassword]= useState("");
    const { login }= useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const success= await login(username, password);
        if (success) {
            navigate("/books");
        }
        else{
            alert("Invalid credentials");

        }
    };

    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login </button>

            </form>
        </div>
    );
};

export default Login;
