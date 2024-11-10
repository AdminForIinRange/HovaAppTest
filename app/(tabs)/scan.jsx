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

import { icons } from "../../constants";

import { images } from "../../constants";
// import useAppwrite from "../../lib/useAppwrite";
// import { getAllPosts, getLatestPosts } from "../../lib/appwrite";

// import { EmptyState, SearchInput, Trending, VideoCard } from "../../components";
// import { useGlobalContext } from "../../context/GlobalProvider";

const Scan = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <Text>
          Cam function
        </Text>
      
      </ScrollView>
    </SafeAreaView>
  );
};

export default Scan;
