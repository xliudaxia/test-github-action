import { useState, useEffect } from "react";

export default function TodoInterval({ callback }: { callback: () => void }) {
  const [todoContent, setTodoContent] = useState("");

  useEffect(() => {
    const timerId = setInterval(() => {
      setTodoContent("延迟1s后的内容");
      callback();
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [callback]);

  return <span>{todoContent}</span>;
}
