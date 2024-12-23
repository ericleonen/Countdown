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