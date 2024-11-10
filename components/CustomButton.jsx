import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({
  // taking in the props and outputing the button to who ever feeds it props
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  textColor,
  buttonBackgroundColor,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-[${buttonBackgroundColor}] rounded-[40px] min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""}  `}
    >
      <Text
        className={`text-${textColor} font-pmedium text-lg  ${textStyles}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
