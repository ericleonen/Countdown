import { secondsToTimeDisplayString } from "@/utils";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { Text, View } from "react-native";

export default function CountdownScreen() {
    const { seconds: secondsString } = useLocalSearchParams<{ seconds: string }>();
    const origSeconds = +secondsString;
    const [seconds, setSeconds] = useState(origSeconds);

    useEffect(() => {
        if (seconds === 0) {
            alert("Timer done!");
            return;
        }

        const timeout = setTimeout(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [seconds, setSeconds]);

    return (
        <View>
            <Text>{secondsToTimeDisplayString(seconds)}</Text>
        </View>
    )
}