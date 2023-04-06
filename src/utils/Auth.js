import Cookies from "js-cookie";

const Auth = {
    isAuthorization() {
        if (Cookies.get("token")) return true;
        return null;
    },
    getAccessToken() {
        return Cookies.get("token");
    },
    signOut(navigate) {
        Cookies.remove("token");
        navigate("/");
    },
    storeUserInfoToCookie(data) {
        if (!data.token) return null;
        const { token, expires } = data;
        const accessExpires = new Date(expires);
        Cookies.set("token", token, { expires: accessExpires });
        return data;
    },
};

export default Auth;
