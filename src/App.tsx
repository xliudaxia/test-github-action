import "./App.css";
import { Button, message } from "antd";
import { useCallback } from "react";
import TodoHeader from "./components/todo-header";
import logo from "./logo.svg";

function App() {
  const showMessage = useCallback(() => {
    message.info(`展示一个提示`);
  }, []);

  const onClickTitle = useCallback((title: string) => {
    window.alert(title);
  }, []);

  return (
    <div className="App">
      <Button
        type="primary"
        onClick={showMessage}
        style={{ visibility: "hidden" }}
      >
        这是一个按钮
      </Button>
      <div>
        <TodoHeader
          title="这是一个标题"
          containerStyle={{ border: "1px solid blue" }}
          isFinish={true}
          iconUrl={logo}
          onClickTitle={onClickTitle}
        />
      </div>
    </div>
  );
}

export default App;
