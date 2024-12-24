import { StyleSheet, View, Pressable, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import colors from "@/constants/styles/colors";
import text from "@/constants/styles/text";

type Props = {
    label: string | "delete",
    onPress?: () => void
}

export default function Button({ label, onPress }: Props) {
    return (
        <View style={styles.container}>
            <Pressable 
                style={({ pressed }) => ({
                    ...styles.button,
                    transform: [{ scale: pressed ? 0.9 : 1 }]
                })}
                onPress={onPress}
            >
                {
                    label === "delete" ? 
                        <Feather name="delete" size={text.fontSize.lg} color={colors.blue} /> :
                        <Text style={styles.buttonText}>{label}</Text>
                }
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 110,
        padding: 5
    },
    button: {
        width: "100%",
        aspectRatio: 1,
        backgroundColor: colors.white,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: colors.lightgray,
    },
    buttonText: {
        textAlign: "center",
        fontSize: text.fontSize.lg,
        fontFamily: text.font.bold,
        color: colors.blue
    }
})