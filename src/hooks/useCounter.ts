import { useContext, useEffect, useState } from "react";
import { CounterContext } from "../context/counter-context";

export interface UseCounterProp {
    initCount?: number;
    onDestroy?: () => void;
    // 是否通过请求初始化数据
    initUpdateByRequest?: boolean;
}

const mockRequest = function() {
    return new Promise<number>(resolve => {
        setTimeout(() => {
            resolve(5);
        }, 1100);
    })
};

export function useCounter({ initCount = 0, onDestroy, initUpdateByRequest }: UseCounterProp) {
    const [count, setCount] = useState(initCount);
    const [finishInitReqUpdate, setFinishInitReqUpdate] = useState(false);
    const { baseNum } = useContext(CounterContext);

    useEffect(() => {
        setCount(initCount ?? 0);
        return () => onDestroy?.();
    }, [initCount, onDestroy]);

    useEffect(() => {
        if (initUpdateByRequest) {
            initByRequest();
        }
    }, [initUpdateByRequest]);

    async function initByRequest() {
        const value = await mockRequest();
        setCount(value);
        setFinishInitReqUpdate(true);
    }

    function add(value: number) {
        setCount(count + value);
    }

    function addWithBase(value: number) {
        setCount(count + baseNum * value);
    }

    function minus(value: number) {
        setCount(count - value);
    }

    return {
        count,
        add,
        minus,
        addWithBase,
        finishInitReqUpdate,
    };
}