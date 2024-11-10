import { useEffect, useRef, useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Alert,
  Image,
  TextInput,
  Pressable,
  Modal,
  FlatList,
  Animated,
} from "react-native";

import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

function NameInput() {
  const { name, setName } = useGlobalContext();

  return (
    <SafeAreaView className="bg-white h-full p-2.5 ">
      <ScrollView>
        <View
          className="w-full flex  h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Text className="text-[36px] font-semibold text-primary  ">
            Whats your full name?
          </Text>

          <Text className="text-[20px] mt-5 font-pmedium text-secondary w-[80%]  ">
            You wont be able to change this later.
          </Text>

          <TextInput
            className=" mt-[100px] flex-row border-2 border-[#D1D4DE] w-full h-16 px-4 rounded-2xl focus:border-secondary items-center"
            keyboardType="default"
            value={name}
            onChangeText={(e) => setName(e)}
          />

          <CustomButton
            title="continue"
            handlePress={() => router.push("/dOBInput")}
            containerStyles="mt-[100px]"
            textColor="white"
            buttonBackgroundColor="#0162F1"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default NameInput;
