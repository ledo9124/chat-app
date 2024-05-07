import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const signup = async ({
        fullName,
        userName,
        password,
        comfirmPassword,
        gender,
    }) => {
        const success = handleInputsErrors({
            fullName,
            userName,
            password,
            comfirmPassword,
            gender,
        });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch("/api/auth/sigup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName,
                    userName,
                    password,
                    comfirmPassword,
                    gender,
                }),
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("chat-user" , JSON.stringify(data));
            setAuthUser(data);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

export default useSignup;

function handleInputsErrors({
    fullName,
    userName,
    password,
    comfirmPassword,
    gender,
}) {
    if (!fullName || !userName || !password || !comfirmPassword || !gender) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (password !== comfirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}
