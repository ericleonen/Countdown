import colors from "@/constants/styles/colors";
import { useEffect, useState } from "react";
import { interpolateColor, runOnJS, useSharedValue, withTiming } from "react-native-reanimated";

export default function useInterpolatedColors(percentage: number): InterpolatedColors {
    const [interpolatedColors, setInterpolatedColors] = useState<InterpolatedColors>({
        light: colors.lightgreen,
        default: colors.green,
        dark: colors.darkgreen
    });
    const colorValue = useSharedValue(0);

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

    return interpolatedColors;
}