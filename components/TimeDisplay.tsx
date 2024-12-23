import { StyleSheet, Text, View } from "react-native"

type Props = {
    timeString: string
}

export default function TimeDisplay({ timeString }: Props) {
    const getDigit = (index: number) => {
        return timeString.charAt(timeString.length - index - 1) || undefined;
    }

    return (
        <View style={styles.container}>
            <Digit digit={getDigit(5)} />
            <Digit digit={getDigit(4)} hasColon />
            <Digit digit={getDigit(3)} />
            <Digit digit={getDigit(2)} hasColon/>
            <Digit digit={getDigit(1)} />
            <Digit digit={getDigit(0)} />
        </View>
    )
}

type DigitProps = {
    digit?: string,
    hasColon?: boolean
}

function Digit({ digit, hasColon }: DigitProps) {
    if (digit !== undefined) {
        return <Text style={styles.timeText}>{digit}{hasColon && ":"}</Text>
    } else {
        return <Text style={[styles.timeText, { color: "lightgray" }]}>0{hasColon && ":"}</Text>
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: 10
    },
    timeText: {
        fontSize: 70,
        fontWeight: "bold"
    }
});