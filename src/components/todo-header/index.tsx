import "./index.css";
import { PropsWithChildren, ReactNode } from "react";

interface TodoHeaderProps {
  // 待办事项的标题
  title: string;
  // 最外层容器的样式
  containerStyle?: React.CSSProperties;
  // 是否结束
  isFinish?: boolean;
  // 图标的链接
  iconUrl?: string;
  // 额外的信息
  extraInfo?: ReactNode;
}

export default function TodoHeader({
  title,
  containerStyle,
  iconUrl,
  isFinish = false,
  children,
  extraInfo,
}: PropsWithChildren<TodoHeaderProps>) {
  return (
    <div className="report-header" style={containerStyle}>
      {iconUrl && <img src={iconUrl} />}
      <span
        className="title"
        data-testid="todo-header-title"
        style={{ background: isFinish ? "red" : "white" }}
      >
        {title}
      </span>
      <span className="extra">{extraInfo}</span>

      {children}
    </div>
  );
}
