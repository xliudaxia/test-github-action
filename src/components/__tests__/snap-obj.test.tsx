import {} from "@testing-library/react";
describe("测试定制对象的快照内容", () => {
  it("正确匹配快照", () => {
    const user = {
      name: "eason",
      age: 18,
    };
    expect(user).toMatchSnapshot({
      name: "eason",
      age: 18,
    });
  });
});
