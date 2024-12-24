import text from "@/constants/styles/text";
import { secondsToTimeDisplayString } from "@/utils";
import { StyleSheet, Text, View } from "react-native";

type Props = {
    msLeft: number,
    interpolatedColors: InterpolatedColors
}

export default function CountdownDisplay({ msLeft, interpolatedColors }: Props) {
    const secondsLeft = Math.ceil(msLeft / 1000);

    return (
        <View style={styles.container}>
            <Text style={[styles.timeDisplay, {
                color: interpolatedColors.default
            }]}>
                {secondsToTimeDisplayString(secondsLeft)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    timeDisplay: {
        textAlign: "center",
        fontSize: text.fontSize.xl,
        fontFamily: text.font.extrabold
    }
});