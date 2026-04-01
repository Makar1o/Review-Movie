"use client";
import ThemeContext from "@/app/context/ThemeContext";
import LanguageContext from "@/app/context/LanguageContext";
import { useContext } from "react";

export const StateBtn = () => {
    const data = useContext(ThemeContext);
    const language = useContext(LanguageContext);
    console.log(language);
    console.log(data);
  return (
    <div>
      <button>Change Theme</button>
    </div>
  );
};
