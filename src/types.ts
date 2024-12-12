export interface Option {
  id: string;
  text?: string;
  imageSrc?: string;
  audioSrc?: string;
}

// 基础问题类型
export interface BaseQuestion<T = unknown> {
  id: string; // 问题的唯一标识符
  type: string; // 问题类型 (单选、多选、填空等)
  text: string; // 问题内容
  correctAnswer?: T; // 正确答案
  imageSrc?: string;
  audioSrc?: string;
}

// 单选题, 正确答案是选项的 id
export interface SingleChoiceQuestion extends BaseQuestion<string> {
  type: "single-choice";
  options: Option[]; // 单选题的选项
}

// 多选题, 正确答案是选项的 id 数组
export interface MultipleChoiceQuestion extends BaseQuestion<string[]> {
  type: "multiple-choice";
  options: Option[]; // 多选题的选项
}

// 填空题, 正确答案是字符串
export interface FillInTheBlankQuestion extends BaseQuestion<string> {
  type: "fill-in-the-blank";
}

// 扩展问题类型
export type Question =
  | SingleChoiceQuestion
  | MultipleChoiceQuestion
  | FillInTheBlankQuestion;
