import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import TodoHeader from "../todo-header";
import { CSSProperties } from "react";

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

  it(`正确渲染containerStyle的样式`, () => {
    const borderStyle = "1px solid blue";
    const containerStyle: CSSProperties = {
      border: "1px solid blue",
    };
    const { container } = render(
      <TodoHeader title="标题" containerStyle={containerStyle} />
    );
    expect(container.children[0]).toHaveStyle(`border: ${borderStyle}`);
  });

  it(`正确渲染isFinish为true的样式`, () => {
    const { getByTestId } = render(<TodoHeader title="标题" isFinish={true} />);
    const element = getByTestId("todo-header-title");
    expect(element).toHaveStyle(`background: red`);
  });

  it(`正确渲染isFinish为false的样式`, () => {
    const { getByTestId } = render(
      <TodoHeader title="标题" isFinish={false} />
    );
    const element = getByTestId("todo-header-title");
    expect(element).toHaveStyle(`background: white`);
  });

  it(`正确渲染显示图标的情况`, async () => {
    const iconUrl = "http://www.abc.com/test.png";
    const { container } = render(<TodoHeader title="标题" iconUrl={iconUrl} />);
    await waitFor(() => {
      const imgElement = container.querySelector("img");
      expect(imgElement).not.toBeNull();
      expect(imgElement).toHaveAttribute("src", iconUrl);
    });
  });

  it(`正确渲染children的情况`, async () => {
    const id = "childrenId";
    const text = "这是一个文案";
    const { getByTestId } = render(
      <TodoHeader title="标题">
        <span data-testid={id}>{text}</span>
      </TodoHeader>
    );
    const childElement = getByTestId(id);
    expect(childElement).toHaveTextContent(text);
  });

  it(`正确渲染extraInfo的情况`, async () => {
    const id = "extraId";
    const text = "这是一个文案";
    const { getByTestId } = render(
      <TodoHeader
        title="标题"
        extraInfo={<span data-testid={id}>{text}</span>}
      />
    );
    const childElement = getByTestId(id);
    expect(childElement).toHaveTextContent(text);
  });

  it(`正确响应onClickTitle的事件`, () => {
    const mockClickFn = jest.fn();
    const title = "标题";
    const { getByText } = render(
      <TodoHeader title={title} onClickTitle={mockClickFn} />
    );
    fireEvent.click(getByText(title));
    expect(mockClickFn).toBeCalled();
    expect(mockClickFn).toBeCalledTimes(1);
    expect(mockClickFn).toBeCalledWith(title);
  });
});
