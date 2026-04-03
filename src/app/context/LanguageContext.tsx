import { createContext } from "react";

const Language = createContext({theme: "EN"});

export const LanguageProvider = ({children}: {children: React.ReactNode}) =>{
    return (    
    <Language.Provider value={{theme: "EN"}}>
        {children}
      </Language.Provider>
)}

export default Language;