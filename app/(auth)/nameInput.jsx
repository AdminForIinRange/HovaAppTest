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

function NameInput() {
  const { name, setName } = useGlobalContext();
  const [errorCode, setErrorCode] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const submit = async () => {
    setSubmitting(true);
    setErrorCode(null);

    if (name.trim() === "") {
      setErrorCode("Please enter a name");
      setSubmitting(false);
      return;
    }

    // Step 2: Validate name with a regex to allow only alphabetic characters and spaces
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name.trim())) {
      setErrorCode("Name can only contain letters and spaces");
      setSubmitting(false);
      return;
    }

    // Step 3: Ensure name meets a minimum length requirement
    if (name.length < 2) {
      setErrorCode("Name must be at least 2 characters long");
      setSubmitting(false);
      return;
    }

    router.push("/dOBInput");
  };

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
            Whats your full name?
          </Text>

          <Text className="text-[20px] mt-5 font-pmedium text-secondary w-[80%]  ">
            You wont be able to change this later.
          </Text>

          <TextInput
            className=" mt-[100px] flex-row border-2 border-[#D1D4DE] w-full h-16 px-4 rounded-2xl focus:border-secondary items-center placeholder:text-[#7B7B8B] font-pmedium  "
            keyboardType="default"
            value={name}
            onChangeText={(e) => setName(e)}
            placeholder="Enter your full name"
          />

          <View
            className={` flex-col w-full h-[45px] items-center justify-center bg-red-100 font-pextrabold rounded-xl mt-[10] ${!errorCode ? "hidden" : null} `}
          >
            <Text className="font-semibold text-red-500 ">{errorCode}</Text>
          </View>

          <CustomButton
            title="continue"
            handlePress={submit}
            containerStyles="mt-[100px]"
            textColor="white"
            buttonBackgroundColor="#0162F1"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default NameInput;
