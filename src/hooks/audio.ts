import { useRef, useEffect } from "react";

const useAudio = (audioSources: string[]) => {
  const audioCache = useRef<Record<string, HTMLAudioElement>>({});

  useEffect(() => {
    const cache: Record<string, HTMLAudioElement> = {};
    // 预加载音频
    audioSources.forEach((src) => {
      const audio = new Audio(src);
      audio.load();
      cache[src] = audio;
    });

    audioCache.current = cache;

    return () => {
      // Cleanup: Pause and remove audio elements
      Object.values(cache).forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
    };
  }, [audioSources]);

  const playAudio = (src: string) => {
    const audio = audioCache.current[src];
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  return { playAudio };
};

export default useAudio;
