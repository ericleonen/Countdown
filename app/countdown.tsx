import CountdownCircle from "@/components/CountdownCircle";
import CountdownDisplay from "@/components/CountdownDisplay";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import DoneButton from "@/components/DoneButton";
import useInterpolatedColors from "@/hooks/interpolatedColors";
import usePlayAudio from "@/hooks/playAudio";
import useCountdown from "@/hooks/countdown";

const alarmSource = require("@/assets/audio/alarm.wav");

export default function CountdownScreen() {
    const seconds = +(useLocalSearchParams<{ seconds: string }>()).seconds;

    const { percentage, handleDone } = useCountdown(seconds);
    const playAlarm = usePlayAudio(alarmSource, true);
    const interpolatedColors = useInterpolatedColors(percentage);

    useEffect(() => {
        if (percentage === 1) playAlarm()
    }, [percentage, playAlarm]);

    return (
        <View style={[styles.container, {
            backgroundColor: interpolatedColors.light
        }]}>
            <CountdownCircle percentage={percentage} interpolatedColors={interpolatedColors} />
            <CountdownDisplay msLeft={seconds * 1000 * (1 - percentage)} interpolatedColors={interpolatedColors} />
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