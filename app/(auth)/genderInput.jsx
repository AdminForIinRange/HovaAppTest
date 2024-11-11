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
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
function GenderInput() {
  const { gender, setGender } = useGlobalContext();

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
  };

  const boxStyles = (selected) =>
    `mt-6 flex-col border-2 w-[110px] border-[#D1D4DE] h-[150px] px-4 rounded-2xl items-center justify-center p-2  ${
      selected && " bg-slate-200" 
    }`;

  return (
    <SafeAreaView className="bg-white h-full p-2.5 ">
      <ScrollView>
        <View
          className="w-full flex  h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Text className="text-[36px] font-semibold text-primary">
            How do you identify?
          </Text>

          <Text className="text-[20px] mt-5 font-pmedium text-secondary w-[80%]">
            Please make sure it matches your ID Card
          </Text>

          {/* Gender Selection Boxes */}

          <View className="flex-row   gap-[10px]  justify-center items-center mt-[100px]">
            <Pressable
              onPress={() => handleGenderSelect("Male")}
              className={boxStyles(gender === "Male")}
            >
         <MaterialCommunityIcons name="gender-male" size={60} color="black" />
              <Text className="text-[14px] font-medium mt-[25px] ">Male</Text>
            </Pressable>

            <Pressable
              onPress={() => handleGenderSelect("Female")}
              className={boxStyles(gender === "Female")}
            >
         <MaterialCommunityIcons name="gender-female" size={60} color="black" />
              <Text className="text-[14px] font-medium mt-[25px] ">Female</Text>
            </Pressable>

            <Pressable
              onPress={() => handleGenderSelect("Non-binary")}
              className={boxStyles(gender === "Non-binary")}
            >
          <MaterialCommunityIcons name="gender-non-binary" size={60} color="black" />
              <Text className="text-[14px] font-medium mt-[25px] ">non binary</Text>
            </Pressable>
          </View>

          <CustomButton
            title="Continue"
            handlePress={() => router.push("/phoneInput")}
            containerStyles="mt-[100px]"
            textColor="white"
            buttonBackgroundColor="#0162F1"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default GenderInput;
