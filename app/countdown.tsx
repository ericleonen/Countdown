import CountdownCircle from "@/components/CountdownCircle";
import CountdownDisplay from "@/components/CountdownDisplay";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Audio } from "expo-av";
import DoneButton from "@/components/DoneButton";

const alarmAudio = require("@/assets/audio/alarm.wav");

export default function CountdownScreen() {
    const seconds = +(useLocalSearchParams<{ seconds: string }>()).seconds;
    const [origAbsMs, setOrigAbsMs] = useState<number | undefined>(undefined);
    const [msProgress, setMsProgress] = useState(0);
    const alarmRef = useRef<Audio.Sound | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!origAbsMs) {
            setOrigAbsMs(new Date().getTime());
            return;
        }

        const interval = setInterval(() => {
            const msDiff = new Date().getTime() - origAbsMs;
            setMsProgress(Math.min(seconds * 1000, msDiff));
        }, 10);

        intervalRef.current = interval;

        return () => clearInterval(interval);
    }, [origAbsMs, setMsProgress]);

    useEffect(() => {
        (async () => {
            const { sound } = await Audio.Sound.createAsync(alarmAudio);
            sound.setIsLoopingAsync(true);
            alarmRef.current = sound;
        })();

        return () => {
            if (alarmRef.current) alarmRef.current.unloadAsync();
        }
    }, []); 

    useEffect(() => {
        if (msProgress === seconds * 1000) {
            alarmRef.current?.replayAsync();
        }
    }, [origAbsMs, setOrigAbsMs, msProgress]);

    const handleDone = () => {
        const interval = intervalRef.current;

        if (interval) {
            clearInterval(interval);
        }
    };

    return (
        <View style={styles.container}>
            <CountdownCircle percentage={msProgress / 1000 / seconds} />
            <CountdownDisplay msLeft={seconds * 1000 - msProgress} />
            <DoneButton onPress={handleDone} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});