import { useEffect, useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert } from "react-native";

import { CustomButton } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import DateTimePicker from "@react-native-community/datetimepicker";

function DOBInput() {
  const { dob, setDob } = useGlobalContext();
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setDob(currentDate.toDateString()); // Store the selected date globally as string
  };

  return (
    <SafeAreaView className="bg-white h-full p-2.5">
      <ScrollView>
        <View
          className="w-full flex h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Text className="text-[36px] font-semibold text-primary">
            When is your birthday?
          </Text>

          <Text className="text-[20px] mt-5 font-pmedium text-secondary w-[80%]">
            Please make sure it matches your ID Card
          </Text>

          {/* <Text
            onPress={() => setShow(true)} // Open the picker on press
            style={{
              marginTop: 20,
              fontSize: 18,
              borderBottomWidth: 1,
              paddingVertical: 10,
            }}
          >
            Selected date:{" "}
            {dob
              ? new Date(dob).toLocaleDateString()
              : "Select your date of birth"}
          </Text> */}

          <View className=" mt-[50px] flex-row w-full rounded-2xl justify-center items-center">
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              display="spinner"
              onChange={onChange}
              maximumDate={new Date()}
              minimumDate={new Date(1900, 0, 1)}
              style={{ width: "100%" }}
    
            />
          </View>

          <CustomButton
            title="Continue"
            handlePress={() => {
              if (dob.trim() === "") {
                Alert.alert("Error", "Please select your date of birth");
                return;
              }
              router.push("/genderInput");
            }}
            containerStyles="mt-[50px]"
            textColor="white"
            buttonBackgroundColor="#0162F1"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default DOBInput;
