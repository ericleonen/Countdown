import colors from "@/constants/styles/colors";
import text from "@/constants/styles/text";
import useAnimatedLevelColor from "@/hooks/animatedLevelColor";
import usePlayAudio from "@/hooks/playAudio";
import { Pressable, StyleSheet, Text, View } from "react-native"
import Animated from "react-native-reanimated";

type Props = {
    onPress: () => void,
    level: CountdownLevel
}

const dingSource = require("@/assets/audio/ding.mp3");

export default function DoneButton({ onPress, level }: Props) {
    const playDing = usePlayAudio(dingSource);
    const animatedBackgroundColor = useAnimatedLevelColor(level);
    
    const handlePress = () => {
        onPress();

        if (level !== "fail") {
            playDing();
        }
    }

    return (
        <View style={styles.container}>
            <Pressable
                onPress={handlePress}
                style={({ pressed }) => ({
                    transform: [{ scale: pressed ? 0.9 : 1 }]
                })}
            >
                <Animated.View style={{
                    ...styles.button,
                    backgroundColor: animatedBackgroundColor
                }}>
                    <Text style={styles.buttonText}>
                        DONE
                    </Text>
                </Animated.View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 330,
        padding: 5,
        marginTop: 15
    },
    button: {
        width: "100%",
        padding: 20,
        borderRadius: 10,
        backgroundColor: colors.green,
    },
    buttonText: {
        fontSize: text.fontSize.md,
        textAlign: "center",
        fontFamily: text.font.black,
        color: colors.white
    }
});