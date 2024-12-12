import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
} from "react";
import type { Question, BaseQuestion, Option } from "../types";
import QuestionRenderer from "./question-renderer";
import ToolBar from "./tool-bar";

// QuizContainer 的 Props 类型
export interface QuizContainerProps {
  questions: Question[]; // 传入的所有问题
  onSubmit?: (answers: Record<string, unknown>) => void; // 提交答案时的回调
  styles?: React.CSSProperties;
}
interface QuizContainerRef {
  submit: () => void;
}

const QuizContainer = forwardRef<QuizContainerRef, QuizContainerProps>(
  ({ questions, onSubmit, styles }, ref) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, unknown>>({});
    const nextQuestion = () => {
      setCurrentQuestionIndex((prev) => {
        if (prev + 1 < questions.length) {
          return prev + 1;
        }
        return prev;
      });
    };
    const prevQuestion = () => {
      setCurrentQuestionIndex((prev) => {
        if (prev - 1 >= 0) {
          return prev - 1;
        }
        return prev;
      });
    };

    // 预加载音频资源
    const audioCache = useRef<Record<string, HTMLAudioElement>>({});
    useEffect(() => {
      const cache: Record<string, HTMLAudioElement> = {};
      questions.forEach((question) => {
        if ("options" in question && question.options) {
          question?.options?.forEach((option) => {
            if (option.audioSrc && !cache[option.audioSrc]) {
              const audio = new Audio(option.audioSrc);
              audio.load(); // 提前加载音频
              cache[option.audioSrc] = audio;
            }
          });
        }
      });
      audioCache.current = cache;
      return () => {
        // 组件卸载时释放音频资源
        Object.values(cache).forEach((audio) => {
          audio.pause();
          audio.src = "";
        });
      };
    }, [questions]);

    // 在 question 组件中调用, 用于更新答案
    const handleAnswer = (
      id: BaseQuestion["id"],
      answer: Option | Option[]
    ) => {
      setAnswers((prev) => ({
        ...prev,
        [id]: answer,
      }));
      // 多选
      if (Array.isArray(answer)) {
        console.log("Selected options:", answer);
        if (Array.isArray(questions[currentQuestionIndex].correctAnswer)) {
          const correctAnswers = questions[currentQuestionIndex].correctAnswer;
          const isCorrect = correctAnswers.every((correctAnswer) =>
            answer.some((selectedAnswer) => selectedAnswer.id === correctAnswer)
          );
          if (isCorrect) {
            console.log("Correct!");
          }
        }
      } else { // 单选
        if (questions[currentQuestionIndex].correctAnswer === answer.id) {
          console.log("Correct!");
        }
        // 如果有option.audioSrc, 播放音频
        if (answer.audioSrc) {
          const audio = audioCache.current[answer.audioSrc];
          audio.currentTime = 0;
          audio.play();
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
      [answers, onSubmit]
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
          onPrev={prevQuestion}
          onSubmit={() => {
            onSubmit?.(answers);
          }}
        />
      </div>
    );
  }
);

export default QuizContainer;
