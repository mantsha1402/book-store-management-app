import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Books from "./pages/Books";

function App(){
    return(
        <div> 
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/books" element={<PrivateRoute> <Books /></PrivateRoute>} />

            </Routes>
        </div>
    );
};

export default App;