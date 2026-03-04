"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

type Lang = "en" | "vi";

interface LangContextValue {
    lang: Lang;
    setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextValue>({
    lang: "en",
    setLang: () => { },
});

export function LangProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Lang>("en");

    // Hydrate from localStorage after mount
    useEffect(() => {
        const stored = localStorage.getItem("stk_lang");
        if (stored === "en" || stored === "vi") setLangState(stored);
    }, []);

    const setLang = (l: Lang) => {
        setLangState(l);
        localStorage.setItem("stk_lang", l);
    };

    return (
        <LangContext.Provider value={{ lang, setLang }}>
            {children}
        </LangContext.Provider>
    );
}

export function useLang() {
    return useContext(LangContext);
}
