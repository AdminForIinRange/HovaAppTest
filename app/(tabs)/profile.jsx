import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, Text, FlatList, TouchableOpacity , Dimensions, Alert } from "react-native";

import { icons } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState, InfoBox, VideoCard } from "../../components";
import { images } from "../../constants";
const Profile = () => {
    const { user, setUser, setIsLogged } = useGlobalContext();
    const countries = [
        { code: "+61", flag: "🇦🇺", name: "Australia" },
        { code: "+1", flag: "🇺🇸", name: "United States" },
        { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
        { code: "+64", flag: "🇳🇿", name: "New Zealand" },
        { code: "+86", flag: "🇨🇳", name: "China" },
      ];

      const formatPhoneNumber = (phoneNumber) => {
        return phoneNumber.replace(/(\d{3})(\d{3})(\d{3})$/, "$1 $2 $3");
      };
    
      // Helper function to get country flag and formatted full phone number
      const getCountryDisplay = (phoneNumber) => {
        const country = countries.find(({ code }) => phoneNumber.startsWith(code));
        if (country) {
          const numberWithoutCode = phoneNumber.slice(country.code.length);
          return `${country.flag} ${country.code} ${formatPhoneNumber(numberWithoutCode)}`;
        }
        return phoneNumber;
      };
  //   const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/");
  };

  return (
    <SafeAreaView className="bg-white h-full">
    <View className="w-full flex justify-center items-center mt-6  px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

       
            <View className="w-[120px] h-[120px]  rounded-lg flex justify-center items-center">
              <Image
                source={images.profile}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
          </View>

      <View
        className="w-full flex h-full px-4 my-6"
        style={{
          minHeight: Dimensions.get("window").height - 100,
        }}
      >


        <View className="w-full flex-row justify-center items-center gap-[10px] ">
            
          <View className=" w-[350px] h-[50px] flex-row justify-center items-center border-2 p-2 border-[#D1D4DE] rounded-lg">
            <Text className="text-[20px] text-left  font-pmedium text-secondary w-[100%]  ">
              <Text className="font-semibold">{user?.username}</Text>
            </Text>
          </View>
        </View>

        <View className=" w-full flex-row justify-center items-center gap-[10px] mt-[10px]">
          <View className=" w-[200px] h-[50px] flex-row justify-center items-center border-2 p-2 border-[#D1D4DE] rounded-lg">
            <Text className="text-[20px] text-left  font-pmedium text-secondary w-[100%]  ">
              <Text className="font-semibold">{user?.dateOfBirth}</Text>
            </Text>
          </View>

          <View className=" w-[140px] h-[50px] flex-row justify-center items-center border-2 p-2 border-[#D1D4DE] rounded-lg ">
            <Text className="text-[20px] text-left  font-pmedium text-secondary w-[100%]  ">
              <Text className="font-semibold">{user?.gender}</Text>
            </Text>
          </View>
        </View>

        <View className=" w-full flex-row justify-center items-center gap-[10px] mt-[10px]">
          <View className=" w-[350px] h-[50px] flex-row justify-center items-center border-2 p-2 border-[#D1D4DE] rounded-lg">
            <Text className="text-[20px] text-left  font-pmedium text-secondary w-[100%]  ">
            <Text className="font-semibold">{getCountryDisplay(user?.phone)}</Text>
            </Text>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default Profile;
