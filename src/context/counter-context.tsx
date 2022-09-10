import { createContext, FC, PropsWithChildren, useState } from "react";

interface CounterContextProp {
    baseNum: number;
    setBaseNum: (value: number) => void;
}

export const CounterContext = createContext<CounterContextProp>({
    baseNum: 1,
    setBaseNum: (_value) => {}
});

export const CounterContextWrapper: FC<PropsWithChildren<any>> =  (children) => {
    const [baseNum, setBaseNum] = useState(1);
    return (
        <CounterContext.Provider value={{ baseNum, setBaseNum }}>
            {children}
        </CounterContext.Provider>
    );
}

