import { createContext } from "react";

const ThemeContext = createContext({theme: "light"});

export const ThemeProvider = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <ThemeContext.Provider value={{ theme: "light" }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext;
