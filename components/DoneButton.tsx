import { Audio } from "expo-av";
import { useEffect, useRef } from "react";
import { Pressable, StyleSheet, Text } from "react-native"

type Props = {
    onPress: () => void
}

const dingAudio = require("@/assets/audio/ding.mp3");

export default function DoneButton({ onPress }: Props) {
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
        <Pressable
            style={({ pressed }) => [styles.button, { 
                boxShadow: pressed ? "0 0 0" : "0 6px 0 darkgreen",
                transform: pressed ? "translateY(6px)" : "translateY(0px)" 
            }]}
            onPress={handlePress}
        >
            <Text style={styles.buttonText}>FINISHED</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 300,
        padding: 15,
        borderRadius: 25,
        marginTop: 20,
        backgroundColor: "green",
        borderColor: "black"
    },
    buttonText: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold",
        color: "white"
    }
});