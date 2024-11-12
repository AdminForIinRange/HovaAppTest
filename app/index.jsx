import { StatusBar } from "expo-status-bar";
import { Link, Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import { CustomButton, Loader } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";
import { useEffect, useState } from "react";
import "./style.css";

const Welcome = () => {
  const [show, setShow] = useState(false);
  const [clickLogin, setclickLogin] = useState(false);
  const [clickSignup, setclickSignup] = useState(false);
  const [phoneNumberStage, setPhoneNumberStage] = useState(true);
  const [OPTstage, setOPTstage] = useState(false);
  const [verified, setverified] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { loading, isLogged } = useGlobalContext();

  // if (!loading && isLogged) return <Redirect href="/home" />;
  useEffect(() => {
    setTimeout(() => setShow(true), 3000);
  }, []);

  // if (true) return <Redirect href="/test" />;

  return (
    <SafeAreaView className="bg-[#0162F1] flex-1">
      {/* <Loader isLoading={loading} /> */}

      <View className="flex-1 justify-center items-center  mb-[200px] px-4">
        <View className="relative mt-5">
          <Text className="text-8xl text-white font-[800] text-center tracking-[-8px]">
            Hova
          </Text>
        </View>
      </View>

      <View
        className={`absolute bottom-0 w-full bg-white p-8 h-[400px] rounded-t-[50px] ${
          show ? "animate-slide-in" : ""
        }`}
        // style={{
        //   transition: "all 0.8s ease",
        // }}
      >
        <View>
          <Text className="text-[32px] font-psemibold text-[#414141] text-center">
            Welcome to Hova
          </Text>
          <Text className="  mt-2 text-[18px] font-pregular text-[#6F6F6F] text-center">
            All your rewards in one place
          </Text>

          <CustomButton
            title="Login"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-8"
            textColor={"white"}
            buttonBackgroundColor={"#0162F1"}
          />
          <CustomButton
            title="Signup"
            handlePress={() => router.push("/nameInput")}
            containerStyles="w-full  mt-4 "
            textColor={"black"}
            buttonBackgroundColor={"#ECECEC"}
          />

          <Link
            className="text-[16px] mt-5 font-pmedium  text-[#6F6F6F] text-center"
            isExternal
            href="https://chakra-ui.com"
          >
            Terms of Use
          </Link>
        </View>
      </View>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
