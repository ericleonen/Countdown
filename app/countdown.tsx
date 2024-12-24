import CountdownCircle from "@/components/CountdownCircle";
import CountdownDisplay from "@/components/CountdownDisplay";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Audio } from "expo-av";
import DoneButton from "@/components/DoneButton";
import colors from "@/constants/styles/colors";
import Animated, { interpolateColor, runOnJS, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";

const alarmAudio = require("@/assets/audio/alarm.wav");

export default function CountdownScreen() {
    const seconds = +(useLocalSearchParams<{ seconds: string }>()).seconds;
    const [origAbsMs, setOrigAbsMs] = useState<number | undefined>(undefined);
    const [msProgress, setMsProgress] = useState(0);
    const alarmRef = useRef<Audio.Sound | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const colorValue = useSharedValue(0);
    const [interpolatedColors, setInterpolatedColors] = useState<InterpolatedColors>({
        light: colors.lightgreen,
        default: colors.green,
        dark: colors.darkgreen
    });

    const percentage = msProgress / 1000 / seconds;

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

    useEffect(() => {
        colorValue.value = withTiming(
            (
                percentage > 0.66 ? 2 :
                percentage > 0.33 ? 1 :
                /* otherwise ? */ 0
            ), 
            { duration: 1000 }, 
            () => {
                runOnJS(setInterpolatedColors)({
                    light: interpolateColor(
                        colorValue.value,
                        [0, 1, 2],
                        [colors.lightgreen, colors.lightblue, colors.lightred]
                    ),
                    default: interpolateColor(
                        colorValue.value,
                        [0, 1, 2],
                        [colors.green, colors.blue, colors.red]
                    ),
                    dark: interpolateColor(
                        colorValue.value,
                        [0, 1, 2],
                        [colors.darkgreen, colors.darkblue, colors.darkred]
                    )
                });
            }
        );
    }, [percentage]);

    const handleDone = () => {
        const interval = intervalRef.current;

        if (interval) {
            clearInterval(interval);
        }
    };

    return (
        <View style={[styles.container, {
            backgroundColor: interpolatedColors.light
        }]}>
            <CountdownCircle percentage={percentage} interpolatedColors={interpolatedColors} />
            <CountdownDisplay msLeft={seconds * 1000 - msProgress} interpolatedColors={interpolatedColors} />
            <DoneButton onPress={handleDone} interpolatedColors={interpolatedColors} />
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