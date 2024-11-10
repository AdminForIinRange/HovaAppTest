import { useState } from "react";
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
} from "react-native";

import { images } from "../../constants";
import { createUser } from "../../lib/appwrite";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const countries = [
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+64", flag: "🇳🇿", name: "New Zealand" },
  { code: "+86", flag: "🇨🇳", name: "China" },
];

const SignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [modalVisible, setModalVisible] = useState(false);

  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const formatPhoneNumber = (text) => {
    // Remove all non-numeric characters
    const cleaned = text.replace(/\D/g, "");
    // Format as XXX XXX XXX
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,3})$/);
    if (match) {
      setPhoneNumber([match[1], match[2], match[3]].filter(Boolean).join(" "));
    }
  };

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
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
            Enter your phone number
          </Text>

          <Text className="text-[20px] mt-5 font-pmedium text-secondary w-[80%]  ">
            You will receive a code to confirm your identity
          </Text>

          {/* <FormField
            title="phone number"
            value={form.username} // switch to phoen number latter on after doing Frontend work
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          /> */}

          <View className="mt-6 flex-row space-x-2">
            <Pressable
              onPress={() => setModalVisible(true)}
              className="flex-row items-center space-x-1 rounded-lg border border-gray-200 px-2 py-3"
            >
              <Text>{selectedCountry.flag}</Text>
              <Text>{selectedCountry.code}</Text>
            </Pressable>

            <TextInput
              className="flex-1 rounded-lg border border-gray-200 px-4 py-3"
              placeholder="123 456 789"
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={formatPhoneNumber}
              maxLength={11} // 9 digits + 2 spaces
            />
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View className="flex-1 ">
              <View className="mt-auto h-3/4 rounded-t-3xl bg-white   border-gray-300 border-2 p-4">
                <View className="flex-row items-center justify-between">
                  <Text className="text-xl font-semibold text-primary">
                    Select Country
                  </Text>
                  <Pressable
                    onPress={() => setModalVisible(false)}
                    className="rounded-full p-2"
                  >
                    <Text className="text-secondary">Close</Text>
                  </Pressable>
                </View>

                <FlatList
                  data={countries}
                  keyExtractor={(item) => item.code}
                  className="mt-4"
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => {
                        setSelectedCountry(item);
                        setModalVisible(false);
                      }}
                      className="flex-row items-center space-x-4 border-b border-gray-100 py-4"
                    >
                      <Text className="text-2xl ">{item.flag}</Text>
                      <View>
                        <Text className="font-medium text-black">
                          {item.name}
                        </Text>
                        <Text className="text-black">{item.code}</Text>
                      </View>
                    </Pressable>
                  )}
                />
              </View>
            </View>
          </Modal>

          <CustomButton 
            title="continue"
            handlePress={submit}
            containerStyles="mt-[150px]"
            isLoading={isSubmitting}
            textColor="white"
            buttonBackgroundColor="#0162F1"
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-[18px] text-secondary font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-[18px] font-psemibold text-secondary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
