import text from "@/constants/styles/text";
import useAnimatedLevelColor from "@/hooks/animatedLevelColor";
import { StyleSheet, View } from "react-native"
import Animated from "react-native-reanimated";

type Props = {
    show: boolean,
    level: CountdownLevel
}

export default function CountdownResponse({ show, level }: Props){
    const response = {
        "calm": "Too easy!",
        "neutral": "Nice job!",
        "panic": "Phew!",
        "fail": "You failed!"
    }[level];

    const animatedColor = useAnimatedLevelColor(level);

    return (
        <View style={{ opacity: show ? 1 : 0 }}>
            <Animated.Text style={{
                ...styles.textReponse, 
                color: animatedColor
            }}>
                {response}
            </Animated.Text>
        </View>
    );
}

const styles = StyleSheet.create({
    textReponse: {
        fontSize: text.fontSize.xl,
        fontFamily: text.font.black,
        textAlign: "center"
    }
});