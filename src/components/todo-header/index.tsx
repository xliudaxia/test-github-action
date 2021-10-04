import "./index.css";
import {
  PropsWithChildren,
  ReactNode,
  CSSProperties,
  useCallback,
  useState,
  useEffect,
} from "react";
import { Input } from "antd";

interface TodoHeaderProps {
  // 待办事项的标题
  title: string;
  // 最外层容器的样式
  containerStyle?: CSSProperties;
  // 是否结束
  isFinish?: boolean;
  // 图标的链接
  iconUrl?: string;
  // 额外的信息
  extraInfo?: ReactNode;
  // 点击标题的事件
  onClickTitle?: (title: string) => void;
  // 初始化的方法
  onInit?: () => Promise<string>;
}

export default function TodoHeader({
  title,
  containerStyle,
  iconUrl,
  isFinish = false,
  children,
  extraInfo,
  onClickTitle,
  onInit,
}: PropsWithChildren<TodoHeaderProps>) {
  const [currentTitle, setCurrentTitle] = useState<string>(title);
  // 点击标题的方法
  const clickTitleFn = useCallback(() => {
    onClickTitle?.(title);
  }, [onClickTitle, title]);

  useEffect(() => {
    if (onInit) {
      (async () => {
        const result = await onInit();
        setCurrentTitle(result);
      })();
    }
  }, [onInit]);

  return (
    <div className="report-header" style={containerStyle}>
      {iconUrl && <img src={iconUrl} alt="icon" />}
      <span
        className="title"
        data-testid="todo-header-title"
        style={{ background: isFinish ? "red" : "white" }}
        onClick={clickTitleFn}
      >
        {currentTitle}
      </span>
      <Input
        type="text"
        style={{ width: 300, display: "flex" }}
        value={currentTitle}
        onChange={e => setCurrentTitle(e.target.value)}
      />
      <span className="extra">{extraInfo}</span>
      {children}
    </div>
  );
}
