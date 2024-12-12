import { memo, useState } from "react";
import type { SingleChoiceQuestion, Option } from "../types";
import { Button, Flex, Image, Space, Typography } from "antd";

interface SingleChoiceQuestionProps {
  question: SingleChoiceQuestion; // 问题
  onAnswer: (questionId: string, answer: Option) => void; // 回答问题时的回调
}

const SingleChoiceQuestion = ({
  question,
  onAnswer,
}: SingleChoiceQuestionProps) => {
  const [userAnswer, setUserAnswer] = useState<string | null>(null);

  return (
    <Flex vertical align="center" gap={8}>
      <Typography.Title level={1}>{question.text}</Typography.Title>
      <Image src={question.imageSrc} style={{ width: "100%" }} />
      <Space direction="vertical" style={{width: "100%"}} size={20}>
        {question.options.map((option) => (
          <Button
            style={{ width: "100%", minHeight: 50, height: "auto" }}
            key={option.id}
            type={userAnswer === option.id ? "primary" : "default"} // 当前选中的选项高亮
            onClick={() => {
              console.log("Selected option:", option);
              setUserAnswer(option.id);
              onAnswer(question.id, option);
            }}
          >
            <Flex justify="space-between" align="center">
              { option.imageSrc ? <Image preview={false} src={option.imageSrc} width={"50%"} style={{ borderRadius: "2%" }} /> : null }
              <span  style={{ whiteSpace: "normal", fontSize: 20, flex: 1 }}>
                {option.text}
              </span>
            </Flex>
          </Button>
        ))}
      </Space>
    </Flex>
  );
};

export default memo(SingleChoiceQuestion);
