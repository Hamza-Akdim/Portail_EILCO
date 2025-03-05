import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

const getUserDetails = () => {
    const token = Cookies.get("token"); 
    console.log(token)

    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return {
            firstname: decoded.firstname,
            lastname: decoded.lastname,
            role: decoded.role
        };
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
};

export const logout = () => {
    fetch("http://localhost:8080/api/auth/logout", { method: "POST", credentials: "include" })
        .then(() => {
            Cookies.remove("jwt"); // ✅ Remove token from cookies
            window.location.href = "/login";
        });
};
