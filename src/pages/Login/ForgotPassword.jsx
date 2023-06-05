import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForgotMutation } from "../../store/features/user/userSlice";

const regex = /^[A-Za-z0-9 ]+$/;

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (regex.test(username) || regex.test(email)) {
            setErrorMsg("Tidak boleh ada character spesial");
        }

        if (!errorMsg) {
            await forgot({ username, email })
                .unwrap()
                .then((result) => {
                    if (result.success) {
                        Swal.fire({
                            icon: "success",
                            title: "User ditemukan",
                            text: result.message,
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "User tidak ditemukan",
                            text: result.message,
                        });
                    }
                })
                .catch((err) => {
                    console.log("Something Is Wrong");
                });
        }
    };

    const [forgot, { isLoading }] = useForgotMutation();

    return (
        <div className="section login">
            <div className="wrap-login">
                <div className="container">
                    <h1>Forgot Password</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="username"
                        />
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email"
                        />
                        <button type="submit">Submit</button>
                    </form>
                    <center style={{ marginTop: "2em" }}>
                        <Link to={"/"}>Login?</Link>
                    </center>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
