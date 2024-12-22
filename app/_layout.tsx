import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ title: "Embarrassing Countdown" }} />
			<Stack.Screen name="countdown" options={{ title: "Countdown" }} />
		</Stack>
  	);
}
