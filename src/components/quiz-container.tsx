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
  checkOnAnswer?: boolean; // 是否在回答时就检查对错
}

interface QuizContainerRef {
  submit: () => void;
}

const QuizContainer = forwardRef<QuizContainerRef, QuizContainerProps>(
  ({ questions, onSubmit, styles, checkOnAnswer = true }, ref) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, unknown>>({});
    const audioCache = useRef<Record<string, HTMLAudioElement>>({});

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
    useEffect(() => {
      const cache: Record<string, HTMLAudioElement> = {};
      // 加载通用音效
      ["/correct.wav", "/incorrect.wav"].forEach((sound) => {
        const audio = new Audio(sound);
        audio.load();
        cache[sound] = audio;
      });

      // 加载选项音效
      questions.forEach((question) => {
        if ("options" in question && question.options) {
          question.options.forEach((option) => {
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

    const playCorrectSound = () => {
      const audio = audioCache.current["/correct.wav"];
      audio.currentTime = 0;
      audio.play();
    };

    const playIncorrectSound = () => {
      const audio = audioCache.current["/incorrect.wav"];
      audio.currentTime = 0;
      audio.play();
    };

    // 检查多选题答案是否正确
    const checkMultipleChoiceAnswer = (
      selectedAnswers: Option[],
      correctAnswers: string[]
    ) => {
      if (selectedAnswers.length !== correctAnswers.length) {
        return false; // 答案数量不一致
      }
      // 检查每个选项是否匹配
      const selectedIds = selectedAnswers.map((answer) => answer.id).sort();
      const correctIds = [...correctAnswers].sort();
      return JSON.stringify(selectedIds) === JSON.stringify(correctIds);
    };

    // 在 question 组件中调用, 用于更新答案
    const handleAnswer = (
      id: BaseQuestion["id"],
      answer: Option | Option[]
    ) => {
      setAnswers((prev) => ({
        ...prev,
        [id]: answer,
      }));

      if (checkOnAnswer) {
        // 检查对错
        const question = questions[currentQuestionIndex];
        if (Array.isArray(answer)) {
          // 多选题逻辑
          if (
            Array.isArray(question.correctAnswer) &&
            checkMultipleChoiceAnswer(answer, question.correctAnswer)
          ) {
            playCorrectSound();
          } else {
            playIncorrectSound();
          }
        } else {
          // 单选题逻辑
          if (question.correctAnswer === answer.id) {
            playCorrectSound();
          } else {
            playIncorrectSound();
          }
        }

        // 播放选项音效
        if (!Array.isArray(answer) && answer.audioSrc) {
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
