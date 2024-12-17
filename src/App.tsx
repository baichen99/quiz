import QuizContainer from "./components/quiz-container";
import { Question } from "./types";

const App = () => {
  const questions: Question[] = [
    {
      id: "1",
      type: "single-choice",
      text: "单选测试：江西的省会是？",
      imageSrc:
        "data:image/jpeg;base64,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",
      options: [
        {
          id: "1",
          text: "南昌",
          imageSrc:
            "https://lh4.googleusercontent.com/proxy/itPhuWoPubRss2i7evilmMAHVI5akF7OteRLO7bCEY6QkW13m9bUpTfUsrwL0d1lxx5bXSqZgoM4tdDva9dKvXS7eASITuo4k0WNgPOaRHL-0jgHjQ",
        },
        {
          id: "2",
          text: "九江",
          imageSrc:
            "https://images.pexels.com/photos/2846034/pexels-photo-2846034.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
        {
          id: "3",
          text: "赣州",
          imageSrc:
            "https://images.pexels.com/photos/745243/pexels-photo-745243.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
        {
          id: "4",
          text: "上饶",
          imageSrc:
            "https://pic.cyol.com/img/20230713/img_9601d612540fcd374f4b11b7d1344e6f58bf.jpeg",
        },
      ],
      correctAnswer: "1",
    },
    {
      id: "2",
      type: "single-choice",
      text: "声音测试：下面哪一个是音符?",
      options: [
        { id: "1", text: "🎵", audioSrc: "/piano-g-6200.mp3" },
        {
          id: "2",
          text: "🐎",
          audioSrc: "https://www.w3schools.com/tags/horse.ogg",
        },
        { id: "3", text: "📚", audioSrc: "/book-closing-48311.mp3" },
        { id: "4", text: "👏", audioSrc: "/applause-236785.mp3" },
      ],
    },
    {
      id: "3",
      type: "multiple-choice",
      text: "下面哪些是乐器?",
      options: [
        { id: "1", text: "🎻" },
        { id: "2", text: "🎺" },
        { id: "3", text: "🎸" },
        { id: "4", text: "🎵" },
      ],
      correctAnswer: ["1", "2", "3"],
    },
  ];
  return (
    <div className="flex h-screen justify-center">
      <QuizContainer
        questions={questions}
        onSubmit={console.log}
        checkImmediate={false}
        styles={{
          width: "40%",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      />
    </div>
  );
};

export default App;
