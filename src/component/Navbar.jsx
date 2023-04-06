import { useEffect, useState } from "react";
import "../assets/css/navbar.css";
import { useWhoamiQuery } from "../store/features/user/userSlice";

const Navbar = () => {
    const { data: userLog, isSuccess } = useWhoamiQuery();
    const [user, setUser] = useState("");

    useEffect(() => {
        if (isSuccess) {
            setUser(userLog.username);
        }
    }, [userLog]);

    return (
        <div className="navbar">
            <div className="container">
                <div className="wrap-navbar d-flex justify-content-between align-items-center">
                    <div className="nav-title">Dashboard</div>
                    <div className="nav-profile d-flex justify-content-end">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                                stroke="white"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26003 15 3.41003 18.13 3.41003 22"
                                stroke="white"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                        <p>As {user}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
