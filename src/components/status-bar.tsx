import React from "react";
import { useQuizStore } from "../store";
import { twMerge } from "tailwind-merge";

interface StatusBarProps {
  className?: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ className }) => {
  const { answerStatus } = useQuizStore();

  return (
    <div className={twMerge("flex justify-center gap-2", className)}>
      {answerStatus.status === "correct" && (
        <div className="text-green-500">正确</div>
      )}
      {answerStatus.status === "incorrect" && (
        <div className="text-red-500">错误</div>
      )}
    </div>
  );
};

export default StatusBar;
