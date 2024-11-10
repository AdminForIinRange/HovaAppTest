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

// import useAppwrite from "../../lib/useAppwrite";
// import { getAllPosts, getLatestPosts } from "../../lib/appwrite";

// import { EmptyState, SearchInput, Trending, VideoCard } from "../../components";
// import { useGlobalContext } from "../../context/GlobalProvider";

const Test = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View
          className="w-full flex  h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Text className="text-[36px] font-semibold text-primary  ">
            Welcome, User
          </Text>

          <Text className="text-[20px] mt-5 font-pmedium text-secondary w-[90%]  ">
            Lorem ipsum dolor sit amet consecte
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Test;
