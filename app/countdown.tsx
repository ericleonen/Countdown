import CountdownCircle from "@/components/CountdownCircle";
import CountdownDisplay from "@/components/CountdownDisplay";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import DoneButton from "@/components/DoneButton";
import usePlayAudio from "@/hooks/playAudio";
import useCountdown from "@/hooks/countdown";
import CountdownResponse from "@/components/CountdownResponse";
import useAnimatedLevelColor from "@/hooks/animatedLevelColor";
import Animated from "react-native-reanimated";

const alarmSource = require("@/assets/audio/alarm.wav");

export default function CountdownScreen() {
    const seconds = +(useLocalSearchParams<{ seconds: string }>()).seconds;

    const { level, percentage, stop, done } = useCountdown(seconds);
    const playAlarm = usePlayAudio(alarmSource, true);
    const animatedBackgroundColor = useAnimatedLevelColor(level, "light");

    useEffect(() => {
        if (percentage === 1) playAlarm()
    }, [percentage, playAlarm]);

    const handleDone = () => {
        stop();

        const timeout = setTimeout(() => {
            router.replace("/");
        }, level === "fail" ? 500 : 2000);

        return () => clearTimeout(timeout);
    }

    return (
        <Animated.View style={{
            ...styles.container, 
            backgroundColor: animatedBackgroundColor
        }}>
            <CountdownResponse show={percentage === 1 || done} level={level} />
            <CountdownCircle percentage={percentage} level={level} />
            <CountdownDisplay msLeft={seconds * 1000 * (1 - percentage)} level={level} />
            <DoneButton onPress={handleDone} level={level} />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});