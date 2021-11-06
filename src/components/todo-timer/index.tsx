import { useState, useEffect } from "react";

export default function TodoTimer() {
  const [todoContent, setTodoContent] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setTodoContent("延迟1s后的内容");
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return <span>{todoContent}</span>;
}
