## 架构

```
QuizContainer (父组件)
├── QuestionRenderer (动态渲染器)
│   ├── SingleChoiceQuestion (单选题组件)
│   ├── MultipleChoiceQuestion (多选题组件)
│   ├── FillInTheBlankQuestion (填空题组件)
│   ├── CustomQuestion (支持扩展的题目组件)
└── QuizControls (控制按钮：上一题、下一题、提交等)

```


设计一个支持多种问题类型并具有强大可扩展性的 QuizComponent 需要考虑以下几个方面：

1. 设计核心架构
使用 React 的组件化思想 和 配置驱动 模式，核心架构可以分为以下部分：

QuizContainer: 管理整个测验的状态和逻辑（如题目切换、分数计算等）。
QuestionRenderer: 根据问题类型渲染具体的题目组件。
QuestionComponents: 针对不同问题类型的独立组件（单选、多选、填空等）。
扩展机制: 提供插槽或注册机制，允许动态添加自定义题型。
2. 组件结构设计
```
QuizContainer (父组件)
├── QuestionRenderer (动态渲染器)
│   ├── SingleChoiceQuestion (单选题组件)
│   ├── MultipleChoiceQuestion (多选题组件)
│   ├── FillInTheBlankQuestion (填空题组件)
│   ├── CustomQuestion (支持扩展的题目组件)
└── QuizControls (控制按钮：上一题、下一题、提交等)
```


(1) QuizContainer
负责管理整体状态：

- 当前题目索引
- 用户答案
- 分数计算

(2) QuestionRenderer
根据 question.type 动态渲染对应组件，并传递问题数据和回调函数。