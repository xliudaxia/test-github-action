import { act, render } from "@testing-library/react";
import TodoTimer from "../todo-timer";

describe("测试TodoTimer组件", () => {
  it("正确运行定时器", async () => {
    jest.useFakeTimers();
    const { queryByText } = render(<TodoTimer />);
    act(() => {
      jest.runAllTimers();
    });
    const element = queryByText("延迟1s后的内容");
    expect(element).not.toBeNull();
  });
});
