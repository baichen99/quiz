import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import type { Question, BaseQuestion, Option } from "../types";
import QuestionRenderer from "./question-renderer";
import ToolBar from "./tool-bar";
import { useQuizStore } from "../store";

// QuizContainer 的 Props 类型
export interface QuizContainerProps {
  initialQuestions: Question[]; // 传入的所有问题
  onSubmit?: (answers: Record<string, unknown>) => void; // 提交答案时的回调
  styles?: React.CSSProperties;
  checkImmediate?: boolean; // 是否在回答时就检查对错
}

interface QuizContainerRef {
  submit: () => void;
}

const QuizContainer = forwardRef<QuizContainerRef, QuizContainerProps>(
  ({ initialQuestions, onSubmit, styles }, ref) => {
    const {
      questions,
      setQuestions,
      currentQuestionIndex,
      nextQuestion,
      previousQuestion,
      answers,
      setAnswers,
    } = useQuizStore();
    useEffect(() => {
      setQuestions(initialQuestions);
    }, [initialQuestions, setQuestions]);

    // 在 question 组件中调用, 用于更新答案
    const handleAnswer = (
      id: BaseQuestion["id"],
      answer: Option | Option[],
    ) => {
      setAnswers({
        ...answers,
        [id]: answer,
      });
    };
    useImperativeHandle(
      ref,
      () => ({
        submit: () => {
          onSubmit?.(answers);
        },
      }),
      [answers, onSubmit],
    );

    return (
      <div style={styles}>
        <QuestionRenderer
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
        />
        <ToolBar
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          onNext={nextQuestion}
          onPrev={previousQuestion}
          onSubmit={() => {
            onSubmit?.(answers);
          }}
        />
      </div>
    );
  },
);

export default QuizContainer;
