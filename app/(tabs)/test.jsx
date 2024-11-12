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
// import useAppwrite from "../../lib/useAppwrite";
// import { getAllPosts, getLatestPosts } from "../../lib/appwrite";

// import { EmptyState, SearchInput, Trending, VideoCard } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const Test = () => {
  const { name, gender, dateOfBirth, phoneNumber } = useGlobalContext();
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
                Welcome, {name ? name : "User"}
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
              <Text>d</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Test;
