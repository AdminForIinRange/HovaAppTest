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

import { images } from "../../constants";
import { createUser } from "../../lib/appwrite";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

import { icons } from "../../constants";
import { isLoading } from "expo-font";
const countries = [
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+64", flag: "🇳🇿", name: "New Zealand" },
  { code: "+86", flag: "🇨🇳", name: "China" },
];

const PhoneInput = () => {
    
    const { phoneNumber, setPhoneNumber } = useGlobalContext();
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef([...Array(4)].map(() => useRef(null)));
  
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const [modalNameVisible, setModalNameVisible] = useState(false);
  const [modalDOBVisible, setModalDOBVisible] = useState(false);
  const [modalPhoneVisible, setModalPhoneVisible] = useState(false);
  const [modalGenderVisible, setModalGenderisible] = useState(false);
  const [modalRejionVisible, setModalPhoneRejionVisible] = useState(false);
  const [modalOPTVisible, setModalOPTVisible] = useState(false);

  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);

  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (modalNameVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 1000,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [modalNameVisible]);
  useEffect(() => {
    if (modalPhoneVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 1000,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [modalPhoneVisible]);

  useEffect(() => {
    if (modalGenderVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 1000,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [modalGenderVisible]);
  useEffect(() => {
    if (modalDOBVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 1000,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [modalDOBVisible]);

  useEffect(() => {
    if (modalOPTVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 1000,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [modalOPTVisible]);

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto focus next input
    if (text && index < 3) {
      inputRefs.current[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].current?.focus();
    }
  };

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
    setModalOPTVisible(true);

    // if (form.username === "" || form.email === "" || form.password === "") {
    //   Alert.alert("Error", "Please fill in all fields");
    // }

    // setSubmitting(true);
    // try {
    //   const result = await createUser(form.email, form.password, form.username);
    //   setUser(result);
    //   setIsLogged(true);
    // } catch (error) {
    //   Alert.alert("Error", error.message);
    // } finally {
    //   setSubmitting(false);
    // }
  };

  const submitOPT = async () => {
    setModalOPTVisible(false);
    Alert.alert("Success", "User signed up successfully");
    router.push("/test");
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

          <View className="mt-20 flex-row space-x-2 ">
            <Pressable
              onPress={() => setModalPhoneRejionVisible(true)}
              className=" flex-row items-center space-x-1 rounded-lg border text-[18px]  border-gray-200 px-2 py-3"
            >
              <Text className=" text-[18px]  font-semibold placeholder:text-Primary ">
                {selectedCountry.flag}
              </Text>
              <Text className=" text-[18px] font-semibold placeholder:text-Primary ">
                {selectedCountry.code}
              </Text>
            </Pressable>

            <TextInput
              className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-[18px] font-semibold placeholder:text-secondary"
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
            visible={modalRejionVisible}
            onRequestClose={() => setModalPhoneRejionVisible(false)}
          >
            <View className="flex-1 ">
              <View className="mt-auto h-3/4 rounded-t-3xl bg-white   border-gray-300 border-2 p-4">
                <View className="flex-row items-center justify-between">
                  <Text className="text-xl font-semibold text-primary">
                    Select Country
                  </Text>
                  <Pressable
                    onPress={() => setModalPhoneRejionVisible(false)}
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
                        setModalPhoneRejionVisible(false);
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
            handlePress={submit} // ON SUMBIT OPEN A MODAL WITH VERFIY CODE, THIS IMPNETION IS WAY BETTER FOR UX AND BACKEND
            containerStyles="mt-[100px]"
            isLoading={isSubmitting}
            textColor="white"
            buttonBackgroundColor="#0162F1"
          />

         

          <Modal
            transparent={true}
            visible={modalOPTVisible}
            onRequestClose={() => setModalOPTVisible(false)}
          >
            <View className="flex-1 ">
              <Animated.View
                className="h-full w-full bg-white border-gray-300 border-2 p-4"
                style={{
                  transform: [{ translateX: slideAnim }],
                }}
              >
                <View className="flex-col items-start justify-between p-2.5">
                  <Pressable
                    onPress={() => {
                      Animated.timing(slideAnim, {
                        toValue: 1000,
                        duration: 500,
                        useNativeDriver: true,
                      }).start(() => setModalOPTVisible(false));
                    }}
                    className="rounded-full p-2"
                  >
                    <Image
                      source={icons.leftArrow}
                      bgColor="transparent"
                      tintColor={"#3A3A3A"}
                      resizeMode="contain"
                      className="w-7 h-7"
                    />
                  </Pressable>
                  <Text className="text-[36px] font-semibold text-primary mt-5">
                    Verify your phone number
                  </Text>
                  <Text className="text-[20px] mt-5 font-medium text-secondary w-[80%]">
                    Please check your phone for the confirmation code we sent.
                  </Text>
                </View>

                <View className="mt-8 flex-row justify-center space-x-[20px]">
                  {code.map((digit, index) => (
                    <TextInput
                      key={index}
                      ref={inputRefs.current[index]}
                      placeholder={`${index + 1}`}
                      className="placeholder:text-primary h-[70px] w-[70px] rounded-lg text-primary
                  border font-semibold border-gray-200 text-center text-xl"
                      maxLength={1}
                      keyboardType="numeric"
                      value={digit}
                      onChangeText={(text) => handleCodeChange(text, index)}
                      onKeyPress={(e) => handleKeyPress(e, index)}
                      selectTextOnFocus
                    />
                  ))}
                </View>

                <CustomButton
                  title="Continue"
                  handlePress={submitOPT}
                  containerStyles="mt-[100px]"
                  isLoading={isSubmitting}
                  textColor="white"
                  buttonBackgroundColor="#0162F1"
                />
              </Animated.View>
            </View>
          </Modal>

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-[16px] text-secondary font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-[16px] font-psemibold text-secondary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PhoneInput;