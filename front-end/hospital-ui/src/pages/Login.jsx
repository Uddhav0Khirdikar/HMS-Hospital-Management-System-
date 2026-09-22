import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {

        e.preventDefault();

        axios.post("http://localhost:8080/admin/login", {
            username: username,
            password: password
        })
            .then((response) => {

                if (response.data === true) {
                    
                    localStorage.setItem("isLoggedIn", "true");
                    
                    alert("Login successful");

                    navigate("/");

                } else {

                    alert("Invalid username or password");

                }

            })
            .catch((error) => {

                console.log(error);

                alert("Login failed");

            });
    };

    return (
        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow p-4">

                        <h2 className="text-center mb-4">
                            Admin Login
                        </h2>

                        <form onSubmit={handleLogin}>

                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <input
                                type="password"
                                className="form-control mb-3"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                            >
                                Login
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;