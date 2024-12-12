import { Space, Button } from "antd";

interface ToolBarProps {
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  currentQuestionIndex: number;
  totalQuestions: number;
}

const ToolBar = ({ onPrev, onNext, onSubmit, currentQuestionIndex, totalQuestions }: ToolBarProps) => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 8,
      marginTop: 20
    }}>
      <Space style={{
        display: "flex",
        justifyContent: "space-between",
      }}>
        <Button onClick={onPrev} disabled={currentQuestionIndex === 0}>上一题</Button>
        <Button onClick={onNext} disabled={currentQuestionIndex === totalQuestions - 1}>下一题</Button>
      </Space>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="primary" onClick={onSubmit}>提交</Button>
      </div>
    </div>

  );
}

export default ToolBar;