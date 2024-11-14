import { StatusBar } from "expo-status-bar";
import { Link, router,Redirect } from "expo-router";
import {
  View,
  Text,
  Modal,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useRef, useState } from "react";
import { CustomButton } from "../components";
import { useFocusEffect } from '@react-navigation/native';  // Import the hook

const Welcome = () => {
  const [show, setShow] = useState(false);


  const fadeAnim = useRef(new Animated.Value(0)).current;  // Start with opacity 0

  // // Show the modal after a delay
  // useEffect(() => {
  //   setTimeout(() => setShow(true), 4000);
  // }, []);

  // Fade in effect for the Hova text
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,  // End opacity is 1
      duration: 1000,  // Fade duration
      useNativeDriver: true,  // Optimize performance
    }).start();
  }, []);

  // Trigger modal visibility when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => setShow(true), 1500);  // Show the modal again when the screen is focused
    }, [])
  );

  // if (true) return <Redirect href="/profile" />;


  return (
    <SafeAreaView className="bg-[#0162F1] flex-1">
      <View className="flex-1 justify-center items-center mb-[250px] px-4">
        <View className="relative mt-5">
          <Animated.Text  // Use Animated.Text for opacity effect
            style={[
              { opacity: fadeAnim },  // Bind the opacity to the animated value
              { fontSize: 100, color: 'white', fontWeight: '800', textAlign: 'center', letterSpacing: -8  },
            ]}
          >
            Hova
          </Animated.Text>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={() => setShow(false)}
      >
        <View className="flex-1">
          <View className="mt-auto h-2/4 rounded-t-[40px] bg-white">
            <View className="flex-row mt-[45px] items-center justify-center">
              <View>
                <Text className="text-[36px] font-psemibold text-[#414141] text-center">
                  Welcome to Hova
                </Text>
                <Text className="mt-2 text-[20px] font-pregular text-[#6F6F6F] text-center">
                  All your rewards in one place
                </Text>

                <CustomButton
                  title="Login"
                  handlePress={() => {
                    router.push("/sign-in");
                    setShow(false);
                  }}
                  containerStyles="w-full mt-8"
                  textColor={"white"}
                  buttonBackgroundColor={"#0162F1"}
                />
                <CustomButton
                  title="Sign up"
                  handlePress={() => {
                    router.push("/nameInput");
                    setShow(false);
                  }}
                  containerStyles="w-full mt-4"
                  textColor={"black"}
                  buttonBackgroundColor={"red"}
                />

                <Link
                  className="text-[16px] mt-5 font-pmedium text-[#6F6F6F] text-center"
                  isExternal
                  href="https://chakra-ui.com"
                >
                  Terms of Use
                </Link>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
