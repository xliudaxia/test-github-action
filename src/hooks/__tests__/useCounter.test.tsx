import { renderHook, WrapperComponent, act } from "@testing-library/react-hooks";
import { CounterContext } from "../../context/counter-context";
import { useCounter, UseCounterProp } from "../useCounter";


describe('hook useCounter', () => {
    it('should return init Value', () => {
        const initialProps: UseCounterProp = {
            initCount: 9
        };
        const { result } = renderHook(props => useCounter(props), {
            initialProps
        });
        expect(result.current.count).toBe(initialProps.initCount);
    });

    it('init Value should equal init prop value', () => {
        const initialProps: UseCounterProp = {
            initCount: 9
        };
        const { result } = renderHook(() => useCounter(initialProps));
        expect(result.current.count).toBe(initialProps.initCount);
    });

    it('should call addWithBase function as expect', () => {
        const baseNum = 10;
        const wrapper: WrapperComponent<{
            children: any;
          }> = ({ children }) => <CounterContext.Provider value={{ baseNum, setBaseNum: () => {} }}>{children}</CounterContext.Provider>;

        const { result } = renderHook(() => useCounter({}), {
            wrapper
        });        
        act(() => {
            result.current.addWithBase(1)
        });
        expect(result.current.count).toBe(baseNum);
    });
    
    it('test rerender useCounter hook', () => {
        const initialProps: UseCounterProp = {
            initCount: 9
        };
        const { result, rerender } = renderHook(props => useCounter(props), {
            initialProps
        });
        expect(result.current.count).toBe(initialProps.initCount);
        rerender({ initCount: 10 });
        expect(result.current.count).toBe(10);
    });

    it('test umount function', () => {
        const onDestroy = jest.fn();
        const initialProps: UseCounterProp = {
            onDestroy,
        };
        const { unmount } = renderHook(() => useCounter(initialProps));
        unmount();
        expect(onDestroy).toBeCalledTimes(1);
    });

    it('test wait for next update', async () => {
        const initialProps: UseCounterProp = {
            initUpdateByRequest: true,
        };
        const { result, waitForNextUpdate } = renderHook(() => useCounter(initialProps));
        expect(result.current.count).toBe(0);
        await waitForNextUpdate({ timeout: 1500 });
        expect(result.current.count).toBe(5);
    });

    it('test wait for value to change', async () => {
        const initialProps: UseCounterProp = {
            initUpdateByRequest: true,
        };
        const { result, waitForValueToChange } = renderHook(() => useCounter(initialProps));
        expect(result.current.count).toBe(0);
        await waitForValueToChange(() => result.current.finishInitReqUpdate, {
            timeout: 1500
        });
        expect(result.current.count).toBe(5);
    });
});