import text from "@/constants/styles/text";
import useAnimatedLevelColor from "@/hooks/animatedLevelColor";
import { secondsToTimeDisplayString } from "@/utils";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

type Props = {
    msLeft: number,
    level: CountdownLevel
}

export default function CountdownDisplay({ msLeft, level }: Props) {
    const secondsLeft = Math.ceil(msLeft / 1000);
    const animatedColor = useAnimatedLevelColor(level);

    return (
        <View style={styles.container}>
            <Animated.Text style={{
                ...styles.timeDisplay, 
                color: animatedColor
            }}>
                {secondsToTimeDisplayString(secondsLeft)}
            </Animated.Text>
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