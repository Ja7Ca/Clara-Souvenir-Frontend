import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
    useChangeForgotPassMutation,
    useGetUserKeyQuery,
} from "../../store/features/user/userSlice";

const regex = /^[A-Za-z0-9 ]+$/;

const ChangeForgot = () => {
    const navigate = useNavigate();

    const { key } = useParams();

    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (regex.test(password)) {
            setErrorMsg("Tidak boleh ada character spesial");
        }

        if (!errorMsg) {
            await change({ newPassword: password, key })
                .unwrap()
                .then((result) => {
                    if (result.success) {
                        Swal.fire({
                            icon: "success",
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
                    Swal.fire({
                        icon: "error",
                        title: "User tidak ditemukan",
                        text: err.message,
                    });
                });
        }
    };

    const [change, { isLoading }] = useChangeForgotPassMutation();
    const { data: user } = useGetUserKeyQuery(key);

    return (
        <div className="section login">
            <div className="wrap-login">
                <div className="container">
                    <h1>Change Password</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="username"
                            value={user ? user.data.username : ""}
                            placeholder="username"
                            editable="false"
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
                    <center style={{ marginTop: "2em" }}>
                        <Link to={"/"}>Login?</Link>
                    </center>
                </div>
            </div>
        </div>
    );
};

export default ChangeForgot;
