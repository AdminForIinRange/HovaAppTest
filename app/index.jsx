import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import { CustomButton, Loader } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";
import { useEffect, useState } from "react";
import  "./style.css";

const Welcome = () => {
  const [show, setShow] = useState(false);
  const [clickLogin, setclickLogin] = useState(false);
  const [clickSignup, setclickSignup] = useState(false);
  const [phoneNumberStage, setPhoneNumberStage] = useState(true);
  const [OPTstage, setOPTstage] = useState(false);
  const [verified, setverified] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, isLogged } = useGlobalContext();

  // if (!loading && isLogged) return <Redirect href="/home" />;
  useEffect(() => {
    setTimeout(() => setShow(true), 3000);
  }, []);
  return (
    <SafeAreaView className="bg-[#0162F1] flex-1">
      <Loader isLoading={loading} />


      <View className="flex-1 justify-center items-center  mb-[200px] px-4">
        <View className="relative mt-5">
          <Text className="text-8xl text-white font-[800] text-center tracking-[-8px]">
            Hova
          </Text>
        </View>
      </View>

      <View
        className={`absolute bottom-0 w-full bg-white p-8 h-[400px] rounded-t-xl ${
          show ? "animate-slide-in" : ""
        }`}
        // style={{
        //   transition: "all 0.8s ease",
        // }}
      >





      </View>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
