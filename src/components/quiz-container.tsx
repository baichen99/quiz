import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import type { Question, BaseQuestion, Option } from "../types";
import QuestionRenderer from "./question-renderer";
import ToolBar from "./tool-bar";
import { useQuizStore } from "../store";
import useAudio from "../hooks/audio";
import { checkAnswer } from "../hooks/check";

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
  ({ initialQuestions, onSubmit, styles, checkImmediate }, ref) => {
    const {
      questions,
      setQuestions,
      currentQuestionIndex,
      nextQuestion,
      previousQuestion,
      answers,
      setAnswers,
    } = useQuizStore();
    const { playAudio, preloadAudio } = useAudio();
    const [answerStatus, setAnswerStatus] = useState<
      "correct" | "incorrect" | "unanswered"
    >("unanswered");

    useEffect(() => {
      setQuestions(initialQuestions);
    }, [initialQuestions, setQuestions]);

    useEffect(() => {
      ["/correct.wav", "/incorrect.wav"].forEach((src) => {
        preloadAudio(src);
      });
    }, [preloadAudio]);

    // 在 question 组件中调用, 用于更新答案
    const handleAnswer = (
      id: BaseQuestion["id"],
      option: Option | Option[],
    ) => {
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
          playAudio("/correct.wav");
          setAnswerStatus("correct");
        } else {
          playAudio("/incorrect.wav");
          setAnswerStatus("incorrect");
        }
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
      <div style={styles}>
        <div className="flex justify-center gap-2">
          {answerStatus === "correct" && (
            <div className="text-green-500">正确</div>
          )}
          {answerStatus === "incorrect" && (
            <div className="text-red-500">错误</div>
          )}
        </div>
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
