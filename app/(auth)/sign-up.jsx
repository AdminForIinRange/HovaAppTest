import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert } from "react-native";

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
      // const result = await createUser( // implement createUser function when its time for backend
      //   form.name,
      //   form.gender,
      //   form.dob,
      //   form.phoneNumber
      // );
      // setUser(result);
      // setIsLogged(true);

      
      router.push("/test");
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
          <Text className="text-[36px] font-semibold text-primary  ">
            Are you sure?
          </Text>
          <Text className="text-[20px] mt-5 font-pmedium text-secondary w-[80%]  ">
            You wont be able to change this later.
          </Text>

          <View className="w-full flex-row justify-center items-center gap-[10px] mt-[25px]">
            <View className=" w-[350px] h-[50px] flex-row justify-center items-center border-2 p-2 border-[#D1D4DE] rounded-lg">
              <Text className="text-[20px] text-left  font-pmedium text-secondary w-[100%]  ">
                 <Text className="font-semibold">{form.name}</Text>
              </Text>
            </View>
           
          </View>

          <View className=" w-full flex-row justify-center items-center gap-[10px] mt-[10px]">
            <View className=" w-[170px] h-[50px] flex-row justify-center items-center border-2 p-2 border-[#D1D4DE] rounded-lg">
              <Text className="text-[20px] text-left  font-pmedium text-secondary w-[100%]  ">
             <Text className="font-semibold">{form.dob}</Text>
              </Text>
            </View>

            <View className=" w-[170px] h-[50px] flex-row justify-center items-center border-2 p-2 border-[#D1D4DE] rounded-lg ">
              <Text className="text-[20px] text-left  font-pmedium text-secondary w-[100%]  ">
               <Text className="font-semibold">{form.gender}</Text>
              </Text>
            </View>
            
          </View>

          <View className=" w-full flex-row justify-center items-center gap-[10px] mt-[10px]">
            <View className=" w-[350px] h-[50px] flex-row justify-center items-center border-2 p-2 border-[#D1D4DE] rounded-lg">
              <Text className="text-[20px] text-left  font-pmedium text-secondary w-[100%]  ">
             <Text className="font-semibold">{form.phoneNumber}</Text>
              </Text>
            </View>
            
          </View>

          



<CustomButton
            title="Sign Up"
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyles="w-full mt-8"
            textColor={"white"}
            buttonBackgroundColor={"#0162F1"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
