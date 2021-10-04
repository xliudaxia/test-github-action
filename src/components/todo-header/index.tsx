import "./index.css";
import {
  PropsWithChildren,
  ReactNode,
  CSSProperties,
  useCallback,
} from "react";

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
}

export default function TodoHeader({
  title,
  containerStyle,
  iconUrl,
  isFinish = false,
  children,
  extraInfo,
  onClickTitle,
}: PropsWithChildren<TodoHeaderProps>) {
  // 点击标题的方法
  const clickTitleFn = useCallback(() => {
    onClickTitle?.(title);
  }, [onClickTitle, title]);

  return (
    <div className="report-header" style={containerStyle}>
      {iconUrl && <img src={iconUrl} alt="icon" />}
      <span
        className="title"
        data-testid="todo-header-title"
        style={{ background: isFinish ? "red" : "white" }}
        onClick={clickTitleFn}
      >
        {title}
      </span>
      <span className="extra">{extraInfo}</span>

      {children}
    </div>
  );
}
