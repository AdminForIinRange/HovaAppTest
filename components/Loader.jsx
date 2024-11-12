import { View, ActivityIndicator, Dimensions, Platform } from "react-native";

const Loader = ({ isLoading }) => {
  const osName = Platform.OS;
  const screenHeight = Dimensions.get("screen").height;

  if (!isLoading) return null;

  return (
    <View
      className="absolute z-50 flex justify-center items-center w-full h-full bottom-[100px] "
      style={{
        height: screenHeight,
      }}
    >
      <ActivityIndicator
        animating={isLoading}
        color="#0162F1"
        size={osName === "ios" ? "large" : 50}
      />
    </View>
  );
};

export default Loader;
