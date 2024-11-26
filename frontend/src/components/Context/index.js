// React Components
import { createContext, useEffect, useState } from "react";

export const Context = createContext(null);
export const UserContext = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user") || null)
    );
    const [userBill, setUserBill] = useState(
        JSON.parse(localStorage.getItem("userBill") || null)
    );

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        localStorage.setItem("userBill", JSON.stringify(userBill));
    }, [userBill]);

    return (
        <Context.Provider value={{ user, setUser, userBill, setUserBill }}>
            {children}
        </Context.Provider>
    );
};
