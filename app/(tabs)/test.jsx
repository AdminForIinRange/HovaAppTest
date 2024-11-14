import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  Dimensions,
  ScrollView,
  Text,
  View,
} from "react-native";

import { images } from "../../constants";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";
const Test = () => {
  const { user, setLoading } = useGlobalContext();
  //
  //
  //
  //
  // useEffect(() => {
  //   if (user == null) {
  //     router.replace("/(auth)/sign-in");
  //   }
  // }, []);
  //
  //
  //
  //
  //

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <View className="flex-row justify-between   items-start w-full   px-4 my-4 ">
            <View className="flex-row items-center justify-start w-[50%]   gap-[10px]  ">
              <Image
                source={images.profile}
                resizeMode="contain"
                className="w-[45px] h-[45px] rounded-full"
              />
              <Text className="text-[16px] font-semibold text-primary  ">
                Wellcome, {user?.username}
              </Text>
            </View>
            <View className="flex-row items-center justify-end w-[50%] gap-[10px]  ">
              <Image
                source={icons.scaner}
                resizeMode="contain"
                className="w-[45px] h-[45px] rounded-full"
              />
            </View>
          </View>
          <View className=" flex-row  justify-center   items-start w-full    px-4 my-4 ">
            <View className="w-full h-[100px] bg-blue-600 rounded-xl flex-col justify-center   items-center  ">
              <Text className="text-[22px] font-semibold text-white ">
                Currently under development :)
              </Text>
            </View>
          </View>
          <View className=" flex-row  justify-center   items-start w-full   px-4 my-4 ">
            <View className="w-full h-[200px]rounded-xl p-4">
              <Text className="text-[38px] font-semibold text-black  ">
                Welcome to{" "}
                <Text
                  className="text-[#0162F1] tracking-[-4.5px]   "
                  style={{ fontWeight: "800" }}
                >
                  Hova{"   "}
                </Text>
                👋
              </Text>
              <Text className="text-[24px] font-regular text-black  mt-[24px] ">
                We are a data and authentication compnay that uses inferded data
                technology to provide secure and reliable authentication
                services.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Test;
