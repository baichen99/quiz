import QuizContainer from "./components/quiz-container";
import { Question } from "./types";

const App = () => {
  const questions: Question[] = [
    {
      id: "1",
      type: "single-choice",
      text: "单选测试：江西的省会是？",
      imageSrc: "",
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
      audioSrc: "/piano-g-6200.mp3",
      correctAnswer: "1",
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
    <div className="flex h-screen flex-col items-center">
      <QuizContainer
        initialQuestions={questions}
        onSubmit={console.log}
        checkImmediate={true}
        className="flex w-full flex-col items-center p-4 lg:w-1/2"
      />
    </div>
  );
};

export default App;
