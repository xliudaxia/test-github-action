import { render } from "@testing-library/react";

describe("测试TodoHeader组件", () => {
  it("正确渲染TodoReport", async () => {
    const title = "title";
    const content = "content";
    const extraMsg = "extraMsg";
    const reportId = `14`;
    jest.mock("react-router-dom", () => ({
      useParams: () => ({
        reportId,
      }),
    }));
    const { default: TodoReport } = await import("../todo-report");
    const { queryByText } = render(
      <TodoReport title={title} content={content} extraMsg={extraMsg} />
    );
    const titleElement = queryByText(title);
    const contentElement = queryByText(content);
    const reportIdElement = queryByText(`报告:${reportId}`);
    expect(titleElement).not.toBeNull();
    expect(contentElement).not.toBeNull();
    expect(reportIdElement).not.toBeNull();
  });
});
