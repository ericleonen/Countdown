import { Stack } from "expo-router";
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold, Nunito_900Black, useFonts } from "@expo-google-fonts/nunito";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import colors from "@/constants/styles/colors";
import text from "@/constants/styles/text";
import { StatusBar } from "expo-status-bar";
import React from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		Nunito_600SemiBold,
		Nunito_700Bold,
		Nunito_800ExtraBold,
		Nunito_900Black
	});

	useEffect(() => {
		if (loaded || error) {
		  SplashScreen.hideAsync();
		}
	  }, [loaded, error]);
	
	if (!loaded && !error) {
		return null;
	}

	return (
		<>
			<Stack screenOptions={{
				headerShown: false
			}}>
				<Stack.Screen name="index" />
				<Stack.Screen name="countdown" />
			</Stack>
			<StatusBar style="dark" />
		</>
  	);
}
