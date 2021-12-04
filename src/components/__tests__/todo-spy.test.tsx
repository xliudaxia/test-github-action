import { render } from "@testing-library/react";
import TodoSpy from "../todo-spy";

describe("测试TodoSpy组件", () => {
  it("正确渲染pathname", () => {
    const pathname = "/test/eason";
    const spy = jest.spyOn(window, "location", "get").mockReturnValueOnce({
      ...window.location,
      pathname,
    });
    const { queryByText } = render(<TodoSpy />);
    const element = queryByText(pathname);
    expect(element).not.toBeNull();
    spy.mockRestore();
  });

  it("正确渲染querySelectorAll的结果", () => {
    const list = [1, 2, 3];
    const spy = jest
      .spyOn(document, "querySelectorAll")
      .mockImplementationOnce((_str: string) => list);
    const { queryByText } = render(<TodoSpy />);
    const element = queryByText(`size: ${list.length}`);
    expect(element).not.toBeNull();
    spy.mockRestore();
  });
});
