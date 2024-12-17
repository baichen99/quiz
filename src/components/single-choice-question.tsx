import { memo, useState } from "react";
import type { SingleChoiceQuestion, Option } from "../types";
import { Image, Typography } from "antd";
import ErrorImage from "../assets/error_image.png";

interface SingleChoiceQuestionProps {
  question: SingleChoiceQuestion; // 问题
  onAnswer: (questionId: string, answer: Option) => void;
  renderQuestion?: (question: SingleChoiceQuestion) => React.ReactNode;
}

const SingleChoiceQuestion = ({
  question,
  onAnswer,
  renderQuestion,
}: SingleChoiceQuestionProps) => {
  const [userAnswer, setUserAnswer] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {renderQuestion ? (
        renderQuestion(question)
      ) : (
        <div className="text-center">
          <Typography.Title level={4}>{question.text}</Typography.Title>
          {question?.imageSrc && (
            <Image
              preview={false}
              src={question.imageSrc}
              fallback={ErrorImage}
              className="w-full max-h-60 object-contain"
            />
          )}
        </div>
      )}

      {/* Tailwind grid for two options per row */}
      <div className="w-full grid grid-cols-2 gap-4">
        {question.options.map((option) => (
          <div
            className={`h-auto border border-gray-300 hover:border-neutral-900 rounded-md p-4 cursor-pointer transition-all duration-100 hover:bg-gray-100 text-lg ${
              userAnswer === option.id // 选中的选项
                ? "bg-blue-500 text-white hover:bg-blue-500 border-neutral-900"
                : "bg-white"
            }`}
            key={option.id}
            onClick={() => {
              console.log("Selected option:", option);
              setUserAnswer(option.id);
              onAnswer(question.id, option);
            }}
          >
            {option.imageSrc && (
              <Image
                preview={false}
                src={option.imageSrc}
                className="w-1/2 mx-auto mb-2"
                fallback={ErrorImage}
              />
            )}
            <span className="block text-center">{option.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(SingleChoiceQuestion);
