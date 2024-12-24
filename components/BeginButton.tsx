import { Pressable, StyleSheet } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import text from "@/constants/styles/text";
import colors from "@/constants/styles/colors";
import button from "@/constants/styles/button";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useEffect } from "react";

type Props = {
    show: boolean,
    onPress: () => void
}

export default function BeginButton({ show, onPress }: Props) {
    const buttonScale = useSharedValue(0);
    useEffect(() => {
        buttonScale.value = withSpring(show ? 1 : 0, {
            clamp: { min: 0 },
            duration: 300
        });
    }, [show]);

    const animatedButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: buttonScale.value }]
        }
    });

    return (
        <Animated.View 
            style={[styles.container, animatedButtonStyle]}
        >
            <Pressable
                style={({ pressed }) => [styles.button, {
                    boxShadow: pressed ? button.boxShadow.pressed : button.boxShadow.default(colors.darkblue),
                    transform: pressed ? button.transform.pressed() : button.transform.default
                }]}
                onPress={onPress}
                disabled={!show}
            >
                <FontAwesome5 name="play" size={text.fontSize.lg} color={colors.white} />
            </Pressable>
        </Animated.View>
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
        backgroundColor: colors.blue,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    }
});