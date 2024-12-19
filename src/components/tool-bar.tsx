import { Button } from "antd";

interface ToolBarProps {
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  currentQuestionIndex: number;
  totalQuestions: number;
}

const ToolBar = ({
  onPrev,
  onNext,
  onSubmit,
  currentQuestionIndex,
  totalQuestions,
}: ToolBarProps) => {
  return (
    <div className="mt-8 flex w-full flex-col gap-8">
      <div className="flex w-full justify-between">
        <div className="flex gap-2">
          <Button onClick={onPrev} disabled={currentQuestionIndex === 0}>
            上一题
          </Button>
          <Button
            onClick={onNext}
            disabled={currentQuestionIndex === totalQuestions - 1}
          >
            下一题
          </Button>
        </div>
        <Button
          type="primary"
          onClick={onSubmit}
          disabled={!(currentQuestionIndex === totalQuestions - 1)}
        >
          提交
        </Button>
      </div>
    </div>
  );
};

export default ToolBar;
