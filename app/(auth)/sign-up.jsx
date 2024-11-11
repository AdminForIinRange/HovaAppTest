import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";

import { createUser } from "../../lib/appwrite";
import { CustomButton } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const {
    name,
    gender,
    dob,
    phoneNumber,
    setPhoneNumber,
    setName,
    setGender,
    setDob,
    setUser,
    setIsLogged,
  } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    gender: "",
    dob: "",
    phoneNumber: "",
  });
  
  const router = useRouter();

  // Set initial form values from context
  useEffect(() => {
    setForm({ name, gender, dob, phoneNumber });
  }, [name, gender, dob, phoneNumber]);

  const submit = async () => {
    if (
      form.name === "" ||
      form.gender === "" ||
      form.dob === "" ||
      form.phoneNumber === ""
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setSubmitting(true);
    try {
      const result = await createUser(
        form.name,
        form.gender,
        form.dob,
        form.phoneNumber
      );
      setUser(result);
      setIsLogged(true);
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
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
            Welcome {form.name}, {form.gender}, {form.dob}, {form.phoneNumber}
          </Text>
          <Text className="text-[24px] font-semibold text-secondary font-psemibold">
            Ready to submit
          </Text>

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
