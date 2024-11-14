import { useEffect, useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert } from "react-native";

import { CustomButton } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import DateTimePicker from "@react-native-community/datetimepicker";

function DOBInput() {
  const { dateOfBirth, setDob } = useGlobalContext();
  const [date, setDate] = useState(new Date());
  const [errorCode, setErrorCode] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setDob(currentDate.toDateString()); // Store the selected date globally as a string
  };

  const submit = () => {
    setErrorCode(null);

    if (!dateOfBirth || dateOfBirth.trim() === "") {
      setErrorCode("Please select your date of birth");
      return;
    }

    // Optional: Add age validation (e.g., 18+)
    const selectedDate = new Date(dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - selectedDate.getFullYear();
    const isOver18 = age > 18 || (age === 18 && today >= new Date(selectedDate.setFullYear(selectedDate.getFullYear() + 18)));

    if (!isOver18) {
      setErrorCode("You must be at least 18 years old");
      return;
    }

    router.push("/genderInput");
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

          <View className="mt-[50px] flex-row w-full rounded-2xl justify-center items-center">
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

          {errorCode && (
            <View className="flex-col w-full h-[45px] items-center justify-center bg-red-100 font-pextrabold rounded-xl mt-[10]">
              <Text className="font-semibold text-red-500">{errorCode}</Text>
            </View>
          )}

          <CustomButton
            title="Continue"
            handlePress={submit}
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
