import { memo, useState } from "react";
import type { MultipleChoiceQuestion, Option } from "../types";
import { Image, Typography } from "antd"; // 保留了 Image 和 Typography 来显示图片和文本

interface MultipleChoiceQuestionProps {
  question: MultipleChoiceQuestion; // 问题
  onAnswer: (questionId: string, answers: Option[]) => void; // 回答问题时的回调
}

const MultipleChoiceQuestion = ({
  question,
  onAnswer,
}: MultipleChoiceQuestionProps) => {
  const [userAnswers, setUserAnswers] = useState<Set<string>>(new Set());

  const toggleAnswer = (option: Option) => {
    setUserAnswers((prevAnswers) => {
      const newAnswers = new Set(prevAnswers);
      if (newAnswers.has(option.id)) {
        newAnswers.delete(option.id); // 如果已选中，则取消选择
      } else {
        newAnswers.add(option.id); // 如果未选中，则添加选择
      }

      return newAnswers;
    });

    // 回调传递已选答案的完整数据
    const updatedAnswers = [...userAnswers];
    if (userAnswers.has(option.id)) {
      updatedAnswers.splice(updatedAnswers.indexOf(option.id), 1);
    } else {
      updatedAnswers.push(option.id);
    }
    onAnswer(
      question.id,
      question.options.filter((opt) => updatedAnswers.includes(opt.id)),
    );
  };

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <Typography.Title level={1} className="text-center">
        {question.text}
      </Typography.Title>
      <Image src={question.imageSrc} className="w-full" />

      <div className="w-full space-y-4">
        {question.options.map((option) => (
          <div
            key={option.id}
            className={`w-full cursor-pointer rounded-md border p-4 text-lg transition-all duration-200 border-neutral-900${
              userAnswers.has(option.id)
                ? "border-neutral-900 bg-blue-500 text-white hover:bg-blue-500"
                : "border-gray-300 bg-white hover:bg-gray-100"
            }`}
            onClick={() => toggleAnswer(option)}
          >
            <div className="flex items-center justify-between">
              {option.imageSrc && (
                <Image
                  preview={false}
                  src={option.imageSrc}
                  width="50%"
                  className="rounded-lg"
                />
              )}
              <span className="flex-1 text-center">{option.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(MultipleChoiceQuestion);
