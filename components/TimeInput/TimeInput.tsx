import { Dispatch, SetStateAction } from "react"
import { StyleSheet, View } from "react-native"
import Button from "./Button"

type Props = {
    setTimeString: Dispatch<SetStateAction<string>>
}

const buttonValues = [..."123456789".split(""), "00", "0", "delete"];

export default function TimeInput({ setTimeString }: Props) {
    const handlePress = (value: string) => {
        if (value === "delete") handleDelete();
        else handleAdd(value);
    }

    const handleAdd = (value: string) => {
        setTimeString(prevTimeString => {
            if (["0", "00"].includes(value) && prevTimeString.length === 0) {
                return prevTimeString;
            } else {
                return (prevTimeString + value).slice(0, 6);
            }
        });
    };

    const handleDelete = () => {
        setTimeString(prevTimeString => (
            prevTimeString.slice(0, -1)
        ));
    }

    return (
        <View style={styles.container}>
            {
                buttonValues.map(value => (
                    <Button 
                        key={value}
                        label={value}
                        onPress={() => handlePress(value)}
                    />
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: 330,
        flexWrap: "wrap"
    }
});