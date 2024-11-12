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
const Test = () => {
  const { user, setLoading } = useGlobalContext();


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
              Wellcome {user?.username}
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
            <View className="w-full h-[100px] bg-blue-600 rounded-xl">
            
            
            <Text className="text-[16px] font-semibold text-primary  ">
            {/* Welcome, {gender ? gender : "end"} */}
              </Text>
            </View>
          </View>
          <View className=" flex-row  justify-center   items-start w-full    px-4 my-4 ">
            <View className="w-full h-[100px] bg-blue-600 rounded-xl">

            <Text className="text-[16px] font-semibold text-primary  ">
            {/* Welcome, {phoneNumber ? phoneNumber : "end"} */}
              </Text>
     
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Test;
