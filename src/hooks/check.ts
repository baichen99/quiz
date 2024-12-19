import { Option } from "../types";

export const checkSingleChoice = (answer: string, userAnswer: string) => {
  return answer === userAnswer;
};

export const checkMultipleChoice = (answer: string[], userAnswer: string[]) => {
  // 先对答案和用户答案进行排序
  const sortedAnswer = answer.sort();
  const sortedUserAnswer = userAnswer.sort();
  // 然后比较排序后的答案和用户答案是否相等
  return JSON.stringify(sortedAnswer) === JSON.stringify(sortedUserAnswer);
};

export const checkAnswer = (
  answer: string | string[],
  option: Option | Option[],
) => {
  // 如果答案是字符串类型，那么用户答案也应该是字符串类型
  // 如果答案是数组类型，那么用户答案也应该是数组类型
  // 注意当多选时，必须答案长度 >= 用户答案长度才判断

  const userAnswer = Array.isArray(option)
    ? option.map((item) => item.id)
    : option.id;
  const isSameType = Array.isArray(answer) === Array.isArray(userAnswer);
  if (!isSameType) {
    return false;
  }
  if (Array.isArray(answer)) {
    return checkMultipleChoice(answer, userAnswer as string[]);
  } else {
    return checkSingleChoice(answer, userAnswer as string);
  }
};
