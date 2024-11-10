import { useEffect } from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { SplashScreen, Stack } from "expo-router";
import GlobalProvider from "../context/GlobalProvider";

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        {/* seems like you can just acess the files via name=""  */}
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
      </Stack>
    </GlobalProvider>
  );
};

export default RootLayout;

// __        __    _       _       _   _            _         _             _       _                                   _
// \ \      / /_ _| |_ ___| |__   | |_| |__   ___  | |_ _   _| |_ ___  _ __(_) __ _| |  _ __  _ __ ___  _ __   ___ _ __| |_   _
//  \ \ /\ / / _` | __/ __| '_ \  | __| '_ \ / _ \ | __| | | | __/ _ \| '__| |/ _` | | | '_ \| '__/ _ \| '_ \ / _ \ '__| | | | |
//   \ V  V / (_| | || (__| | | | | |_| | | |  __/ | |_| |_| | || (_) | |  | | (_| | | | |_) | | | (_) | |_) |  __/ |  | | |_| |
//    \_/\_/ \__,_|\__\___|_| |_|  \__|_| |_|\___|  \__|\__,_|\__\___/|_|  |_|\__,_|_| | .__/|_|  \___/| .__/ \___|_|  |_|\__, |
//                                                                                     |_|             |_|                |___/
