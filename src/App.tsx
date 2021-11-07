import "./App.css";
import { Button, message } from "antd";
import { useCallback } from "react";
import TodoHeader from "./components/todo-header";
import logo from "./logo.svg";
import TodoContent from "./components/todo-content";
import TodoReport from "./components/todo-report";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  const showMessage = useCallback(() => {
    message.info(`展示一个提示`);
  }, []);

  const onClickTitle = useCallback((title: string) => {
    window.alert(title);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/">
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
              <TodoContent
                title="这是标题"
                content="这是一个很长很长的内容呀..."
              />
            </div>
          </Route>
          <Route exact={true} path="/report/:reportId">
            <div>
              <TodoReport
                title="这是一个标题"
                extraMsg="补充信息"
                content="这是一个内容"
              />
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
