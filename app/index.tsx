import BeginButton from "@/components/BeginButton";
import TimeDisplay from "@/components/TimeDisplay";
import TimeInput from "@/components/TimeInput";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Index() {
	const [timeString, setTimeString] = useState("");

	return (
		<View style={styles.container}>
	  		<TimeDisplay timeString={timeString} />
			<TimeInput setTimeString={setTimeString} />
			<BeginButton
				show={timeString.length > 0}
				onPress={() => { alert("Hello world!") }}
			/>
		</View>
  	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}
});