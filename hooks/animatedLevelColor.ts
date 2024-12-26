import colors from "@/constants/styles/colors";
import { useEffect } from "react";
import { useSharedValue, withTiming } from "react-native-reanimated";

const levelColors = {
    "calm": {
        light: colors.lightgreen,
        default: colors.green
    },
    "neutral": {
        light: colors.lightblue,
        default: colors.blue
    },
    "panic": {
        light: colors.lightred,
        default: colors.red
    },
    "fail": {
        light: colors.darkred,
        default: colors.red
    }
}

export default function useAnimatedLevelColor(level: CountdownLevel, shade: "light" | "default" = "default") {
    const color = useSharedValue(levelColors.calm[shade]);

    useEffect(() => {
        color.value = withTiming(
            levelColors[level][shade],
            { duration: 500 }
        )
    }, [level, shade]);

    return color;
};