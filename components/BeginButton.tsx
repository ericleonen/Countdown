import { Pressable, StyleSheet, View } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

type Props = {
    show: boolean,
    onPress: () => void
}

export default function BeginButton({ show, onPress }: Props) {
    return (
        <View style={[styles.container, { transform: show ? "scale(1)" : "scale(0)" }]}>
            <Pressable
                style={styles.button}
                onPress={onPress}
                disabled={!show}
            >
                <FontAwesome5 name="play" size={30} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 110,
        padding: 5,
        marginTop: 15
    },
    button: {
        width: "100%",
        aspectRatio: 1,
        backgroundColor: "lightgray",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    }
});