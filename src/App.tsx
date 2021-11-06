import "./App.css";
import { Button, message } from "antd";
import { useCallback } from "react";
import TodoHeader from "./components/todo-header";
import logo from "./logo.svg";
import TodoContent from "./components/todo-content";
import TodoTimer from "./components/todo-timer";
import TodoInterval from "./components/todo-interval";

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
        <TodoContent title="这是标题" content="这是一个很长很长的内容呀..." />
      </div>
      <div>
        <TodoTimer />
        <TodoInterval callback={() => console.log(`运行了callback`)} />
      </div>
    </div>
  );
}

export default App;
