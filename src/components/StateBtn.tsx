"use client";
import ThemeContext from "@/app/context/ThemeContext";
import LanguageContext from "@/app/context/LanguageContext";
import { useContext, useState, useEffect } from "react";

export const StateBtn = ({ theme, handleTheme }: {
    theme: "light" | "dark",
    handleTheme: () => void
}) => {
    const data = useContext(ThemeContext);
    const language = useContext(LanguageContext);
    console.log(language);
    console.log(data);
    console.log(theme, "theme is");

    return (
        <div>
            <button onClick={handleTheme}
                className="bg-blue-500 text-white p-2 rounded-md cursor-pointer hover:bg-blue-600 m-4">Change Theme</button>
        </div>
    );
};
