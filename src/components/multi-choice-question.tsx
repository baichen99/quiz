import { memo, useState } from "react";
import type { MultipleChoiceQuestion, Option } from "../types";
import { Button, Flex, Image, Space, Typography } from "antd";

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
      question.options.filter((opt) => updatedAnswers.includes(opt.id))
    );
  };

  return (
    <Flex vertical align="center" gap={8}>
      <Typography.Title level={1}>{question.text}</Typography.Title>
      <Image src={question.imageSrc} style={{ width: "100%" }} />
      <Space direction="vertical" style={{ width: "100%" }} size={20}>
        {question.options.map((option) => (
          <Button
            style={{ width: "100%", minHeight: 50, height: "auto" }}
            key={option.id}
            type={userAnswers.has(option.id) ? "primary" : "default"} // 当前选中的选项高亮
            onClick={() => toggleAnswer(option)}
          >
            <Flex justify="space-between" align="center">
              {option.imageSrc ? (
                <Image
                  preview={false}
                  src={option.imageSrc}
                  width={"50%"}
                  style={{ borderRadius: "2%" }}
                />
              ) : null}
              <span style={{ whiteSpace: "normal", fontSize: 20, flex: 1 }}>
                {option.text}
              </span>
            </Flex>
          </Button>
        ))}
      </Space>
    </Flex>
  );
};

export default memo(MultipleChoiceQuestion);
