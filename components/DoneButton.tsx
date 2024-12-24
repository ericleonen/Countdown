import button from "@/constants/styles/button";
import colors from "@/constants/styles/colors";
import text from "@/constants/styles/text";
import { Audio } from "expo-av";
import { useEffect, useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native"

type Props = {
    onPress: () => void,
    interpolatedColors: InterpolatedColors
}

const dingAudio = require("@/assets/audio/ding.mp3");

export default function DoneButton({ onPress, interpolatedColors }: Props) {
    const dingRef = useRef<Audio.Sound | null>(null);

    useEffect(() => {
        (async () => {
            const { sound } = await Audio.Sound.createAsync(dingAudio);
            dingRef.current = sound;
        })();

        return () => {
            if (dingRef.current) dingRef.current.unloadAsync();
        }
    }, []);
    
    const handlePress = async () => {
        onPress();
        await dingRef.current?.playAsync();
    }

    return (
        <View style={styles.container}>
            <Pressable
                style={({ pressed }) => [styles.button, { 
                    boxShadow: pressed ? button.boxShadow.pressed : button.boxShadow.default(
                        interpolatedColors.dark
                    ),
                    transform: pressed ? button.transform.pressed() : button.transform.default,
                    backgroundColor: interpolatedColors.default
                }]}
                onPress={handlePress}
            >
                <Text style={styles.buttonText}>
                    DONE
                </Text>
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
        borderRadius: 10
    },
    buttonText: {
        fontSize: text.fontSize.md,
        textAlign: "center",
        fontFamily: text.font.black,
        color: colors.white
    }
});