import BeginButton from "@/components/BeginButton";
import TimeDisplay from "@/components/TimeDisplay";
import TimeInput from "@/components/TimeInput";
import colors from "@/constants/styles/colors";
import { timeStringToSeconds } from "@/utils";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Index() {
	const [timeString, setTimeString] = useState("");

	const onBegin = () => {
		router.replace({
			pathname: "/countdown",
			params: { seconds: timeStringToSeconds(timeString) + "" }
		})
	};

	return (
		<View style={styles.container}>
	  		<TimeDisplay timeString={timeString} />
			<TimeInput setTimeString={setTimeString} />
			<BeginButton
				show={timeString.length > 0}
				onPress={onBegin}
			/>
		</View>
  	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.darkwhite
	}
});