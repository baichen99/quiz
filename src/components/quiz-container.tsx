import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import type { Question, Option } from "../types";
import QuestionRenderer from "./question-renderer";
import ToolBar from "./tool-bar";
import { useQuizStore } from "../store";
import { checkAnswer } from "../hooks/check";
import useSound from "use-sound";
import { twMerge } from "tailwind-merge";
import StatusBar from "./status-bar"; // Import the StatusBar component

// QuizContainer 的 Props 类型
export interface QuizContainerProps {
  initialQuestions: Question[]; // 传入的所有问题
  onSubmit?: (answers: Record<string, unknown>) => void; // 提交答案时的回调
  styles?: React.CSSProperties;
  checkImmediate?: boolean; // 是否在回答时就检查对错
  className?: string;
}

interface QuizContainerRef {
  submit: () => void;
}

const QuizContainer = forwardRef<QuizContainerRef, QuizContainerProps>(
  ({ initialQuestions, onSubmit, styles, checkImmediate, className }, ref) => {
    const {
      questions,
      setQuestions,
      currentQuestionIndex,
      nextQuestion,
      previousQuestion,
      answers,
      setAnswers,
      setAnswerStatus, // Get the setter from the store
    } = useQuizStore();
    const [playCorrectAudio] = useSound("/correct.wav");
    const [playIncorrectAudio] = useSound("/incorrect.wav");

    useEffect(() => {
      setQuestions(initialQuestions);
    }, [initialQuestions, setQuestions]);

    // 在 question 组件中调用, 用于更新答案
    const handleAnswer = (id: string, option: Option | Option[]) => {
      setAnswers({
        ...answers,
        [id]: option,
      });
      const correctAnswer = questions[currentQuestionIndex].correctAnswer;
      if (!correctAnswer) return;
      // 是多选 且长度 < 答案
      const dontCheck =
        Array.isArray(option) && option.length < correctAnswer.length;
      if (checkImmediate && !dontCheck) {
        if (checkAnswer(correctAnswer, option)) {
          playCorrectAudio();
          setAnswerStatus({ status: "correct" }); // Update status in store
        } else {
          playIncorrectAudio();
          setAnswerStatus({ status: "incorrect" }); // Update status in store
        }
      } else {
        setAnswerStatus({ status: "unanswered" }); // Optionally reset or keep previous status
      }
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
      <div
        style={styles}
        className={twMerge(className, "flex h-full flex-col justify-between")}
      >
        <div>
          <StatusBar /> {/* Replace inline status display with StatusBar */}
          <QuestionRenderer
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
          />
        </div>
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
