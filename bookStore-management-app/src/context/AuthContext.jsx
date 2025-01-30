import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children }) => { const [isAuthenticated, setIsAuthenticated] = useState (false);
    const [token, setToken] = useState(null);
    const login = async (username, password) => { 
        try{ 
            const response = await fetch("https://private-universal-cylinder.glitch.me/login", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ username, password})
            });
            const data = await response.json();
            if ( data.success){
                setIsAuthenticated(true);
                setToken(data.token);
                return true;
            }
            else{
                return false;
            }

        } catch(error){
            console.error("Login failed", error);
            return false;
        }
    };
    const logout= () => {
        setIsAuthenticated(false);
        setToken(null);
    };
    return(
        <AuthContext.Provider value = {{ isAuthenticated, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};