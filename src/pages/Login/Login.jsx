import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useLoginMutation } from "../../store/features/user/userSlice";

const regex = /^[A-Za-z0-9 ]+$/;

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (regex.test(username) || regex.test(password)) {
            setErrorMsg("Tidak boleh ada character spesial");
        }

        if (!errorMsg) {
            await login({ username, password })
                .unwrap()
                .then(() => {
                    console.log("Login Berhasil");
                    Swal.fire({
                        icon: "success",
                        title: "Login Success",
                        text: "Selamat Datang",
                    });
                    navigate("/dashboard");
                })
                .catch((err) => {
                    console.log("Something Is Wrong");
                });
        }
    };

    const [login, { isLoading }] = useLoginMutation();

    return (
        <div className="section login">
            <div className="wrap-login">
                <div className="container">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="username"
                        />
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password"
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
