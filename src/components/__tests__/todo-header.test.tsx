import { render, screen } from "@testing-library/react";
import TodoHeader from "../todo-header";

describe("测试TodoHeader组件", () => {
  it("正确渲染title组件", () => {
    const title = "测试的标题";
    render(<TodoHeader title={title} />);
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
  });

  it("正确渲染title组件通过queryByTest", () => {
    const title = "测试的标题";
    const { queryByText } = render(<TodoHeader title={title} />);
    const titleElement = queryByText(title);
    expect(titleElement).not.toBeNull();
    expect(titleElement).toBeInTheDocument();
  });

  it("正确渲染title组件通过getByText", () => {
    const title = "测试的标题";
    const { getByText } = render(<TodoHeader title={title} />);
    const titleElement = getByText(title);
    expect(titleElement).toBeInTheDocument();
  });

  it("正确渲染title组件通过container的query", () => {
    const title = "测试的标题";
    const { container } = render(<TodoHeader title={title} />);
    const titleElement = container.querySelector("span");
    expect(titleElement).toHaveTextContent(title);
  });

  it("正确渲染title组件通过getByTestId", () => {
    const title = "测试的标题";
    const { getByTestId } = render(<TodoHeader title={title} />);
    const titleElement = getByTestId("todo-header-title");
    expect(titleElement).toHaveTextContent(title);
  });
});
