import { useEffect, useRef, useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Alert,
  Image,
  TextInput,
  Pressable,
  Modal,
  FlatList,
  Animated,
} from "react-native";

import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

function DOBInput() {

    const { dob, setDob } = useGlobalContext();
  return (
    <SafeAreaView className="bg-white h-full p-2.5 ">
      <ScrollView>
        <View
          className="w-full flex  h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Text className="text-[36px] font-semibold text-primary  ">
          When is your birthday?
          </Text>

          <Text className="text-[20px] mt-5 font-pmedium text-secondary w-[80%]  ">
          Please make sure it matches your ID Card
          </Text>

          <TextInput
            className=" mt-[100px] flex-row border-2 border-[#D1D4DE] w-full h-16 px-4 rounded-2xl focus:border-secondary items-center"
            keyboardType="default"
            value={dob}
            onChangeText={(e) => setDob(e)}
          />

          <CustomButton
            title="continue"
            handlePress={() => router.push("/genderInput")}
            containerStyles="mt-[100px]"
            textColor="white"
            buttonBackgroundColor="#0162F1"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// export default DOBInput;


// import { useState } from "react";
// import { SafeAreaView, Text, Button } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";

// function DOBInput() {
//   const [date, setDate] = useState(new Date());
//   const [show, setShow] = useState(false);

//   const onChange = (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     setShow(false);
//     setDate(currentDate);
//   };

//   const showDatepicker = () => {
//     setShow(true);
//   };

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "white",
//       }}
//     >
//       <Text style={{ fontSize: 24, marginBottom: 20 }}>
//         When is your birthday?
//       </Text>
//       <Button onPress={showDatepicker} title="Select your date of birth" />

//       {show && (
//         <DateTimePicker
//           testID="dateTimePicker"
//           value={date}
//           mode="date"
//           display="spinner" // Use the "spinner" style for an iOS wheel-like date picker
//           onChange={onChange}
//           maximumDate={new Date()} // Optional: Prevent selection of future dates
//         />
//       )}

//       <Text style={{ marginTop: 20, fontSize: 18 }}>
//         Selected date: {date.toLocaleDateString()}
//       </Text>
//     </SafeAreaView>
//   );
// }

// export default DOBInput;
