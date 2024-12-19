import { useRef, useEffect } from "react";

const useAudio = () => {
  const audioCache = useRef<Record<string, HTMLAudioElement>>({});

  // 预加载音频
  const preloadAudio = (src: string) => {
    if (!audioCache.current[src]) {
      const audio = new Audio(src);
      audio.load(); // 预加载音频
      audioCache.current[src] = audio;
    }
  };

  // 播放音频
  const playAudio = (src: string) => {
    const audio = audioCache.current[src];
    if (audio) {
      audio.play();
    }
  };

  // 清理缓存
  useEffect(() => {
    // 将 audioCache.current 复制到一个局部变量
    const cache = audioCache.current;

    return () => {
      // 使用局部变量 cache 进行清理
      Object.values(cache).forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
    };
  }, []);

  return { playAudio, preloadAudio };
};

export default useAudio;
