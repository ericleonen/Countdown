import { StyleSheet, View, Pressable, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";

type Props = {
    label: string | "delete",
    onPress?: () => void
}

export default function Button({ label, onPress }: Props) {
    return (
        <View style={styles.container}>
            <Pressable 
                style={styles.button}
                onPress={onPress}
            >
                {
                    label === "delete" ? 
                        <Feather name="delete" size={30} /> :
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
        backgroundColor: "lightgray",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        textAlign: "center",
        fontSize: 30
    }
})