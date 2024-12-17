import type { Option, Question } from "../types";
import MultiChoiceQuestion from "./multi-choice-question";
import SingleChoiceQuestion from "./single-choice-question";

interface QuestionRendererProps {
  question: Question;
  onAnswer: (id: string, answer: Option | Option[]) => void;
}

const QuestionRenderer = ({ question, onAnswer }: QuestionRendererProps) => {
  const renderQuestion = () => {
    switch (question?.type) {
      case "single-choice":
        return <SingleChoiceQuestion onAnswer={onAnswer} question={question} />;
      case "multiple-choice":
        return <MultiChoiceQuestion onAnswer={onAnswer} question={question} />;
      default:
        return <div>Unsupported question type</div>;
    }
  };
  return renderQuestion();
};

export default QuestionRenderer;
