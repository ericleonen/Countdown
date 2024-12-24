import { Audio, AVPlaybackSource } from "expo-av";
import { useEffect, useRef } from "react";

export default function usePlayAudio(source: AVPlaybackSource, loop = false): () => void {
    const audioRef = useRef<Audio.Sound | null>(null);

    useEffect(() => {
        (async () => {
            const { sound } = await Audio.Sound.createAsync(source);
            sound.setIsLoopingAsync(loop);
            audioRef.current = sound;
        })();

        return () => {
            audioRef.current?.unloadAsync();
        }
    }, []);

    return () => {
        audioRef.current?.replayAsync();
    }
}