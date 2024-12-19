import { memo, useState } from "react";
import type { SingleChoiceQuestion, Option } from "../types";
import { Image, Typography } from "antd";
import ErrorImage from "../assets/error_image.png";
import { SoundOutlined } from "@ant-design/icons";
import useSound from "use-sound";

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
  const [playAudio] = useSound(question.audioSrc);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      {renderQuestion ? (
        renderQuestion(question)
      ) : (
        <div className="text-center">
          <Typography.Title level={4}>
            {question.text}
            {question?.audioSrc && (
              <SoundOutlined
                className="ml-4 cursor-pointer transition-all duration-100 hover:scale-110 hover:text-blue-500"
                onClick={() => {
                  if (question.audioSrc) {
                    playAudio(question.audioSrc);
                  }
                }}
              />
            )}
          </Typography.Title>
          {question?.imageSrc && (
            <Image
              preview={false}
              src={question.imageSrc}
              fallback={ErrorImage}
              className="max-h-60 w-full object-contain"
            />
          )}
        </div>
      )}

      <div className="grid w-full grid-cols-2 gap-4">
        {question.options.map((option) => (
          <div
            className={`align-center flex h-auto cursor-pointer flex-col justify-center rounded-md border border-gray-300 p-4 text-lg transition-all duration-100 hover:border-neutral-900 ${
              userAnswer === option.id // 选中的选项
                ? "border-neutral-900 bg-blue-500 text-white hover:bg-blue-500"
                : "bg-white hover:bg-gray-100"
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
                className="mx-auto mb-2 w-1/2"
                fallback={ErrorImage}
              />
            )}
            <span className="mt-auto block text-center">{option.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(SingleChoiceQuestion);
