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
function NameInput() {
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
            Enter your phone number
          </Text>

          <Text className="text-[20px] mt-5 font-pmedium text-secondary w-[80%]  ">
            You will receive a code to confirm your identity
          </Text>
       
      </View>
    </ScrollView>
  </SafeAreaView>
  )
}

export default NameInput