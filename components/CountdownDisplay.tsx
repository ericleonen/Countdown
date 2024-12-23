import { secondsToTimeDisplayString } from "@/utils";
import { StyleSheet, Text, View } from "react-native";

type Props = {
    msLeft: number
}

export default function CountdownDisplay({ msLeft }: Props) {
    const secondsLeft = Math.ceil(msLeft / 1000);

    return (
        <View style={styles.container}>
            <Text style={styles.timeDisplay}>{secondsToTimeDisplayString(secondsLeft)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    timeDisplay: {
        textAlign: "center",
        fontSize: 70,
        fontWeight: "bold"
    }
});