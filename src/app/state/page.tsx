"use client";
import { StateBtn } from "@/components/StateBtn";
import ThemeContext from "../context/ThemeContext";
import { useContext, useEffect, useState } from "react";

function State() {

    const data = useContext(ThemeContext);
    console.log(data.theme, "theme is ");

    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        data.theme = theme;
    }, [theme]);
    const handleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    }
    return (
        <div>
            <p>{data.theme}</p>
            <StateBtn theme={theme} handleTheme={handleTheme} />
            {data.theme === "light" && <p>Light Theme</p>}
        </div>
    );

}
export default State;
