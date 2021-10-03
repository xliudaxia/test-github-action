import "./index.css";

interface TodoHeaderProps {
  // 待办事项的标题
  title: string;
}

export default function TodoHeader({ title }: TodoHeaderProps) {
  return (
    <div className="report-header">
      <span className="title" data-testid="todo-header-title">
        {title}
      </span>
    </div>
  );
}
