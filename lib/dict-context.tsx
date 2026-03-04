"use client";

import { createContext, useContext, ReactNode } from "react";
import type { Dictionary } from "./getDictionary";

const DictContext = createContext<Dictionary | null>(null);

export function DictionaryProvider({
    dict,
    children,
}: {
    dict: Dictionary;
    children: ReactNode;
}) {
    return <DictContext.Provider value={dict}>{children}</DictContext.Provider>;
}

export function useDictionary(): Dictionary {
    const ctx = useContext(DictContext);
    if (!ctx) throw new Error("useDictionary must be used inside DictionaryProvider");
    return ctx;
}
