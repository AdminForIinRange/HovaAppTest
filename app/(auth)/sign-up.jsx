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

import PhoneInput from "../../components/Inputs/PhoneInput";
import NameInput from "../../components/Inputs/NameInput";

const SignUp = () => {
  const privCode = ["1", "1", "1", "1"]
  const [modalOPTVisible, setModalOPTVisible] = useState(false);

  const { setUser, setIsLogged } = useGlobalContext();
  const [code, setCode] = useState(["", "", "", ""]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [form, setForm] = useState({
    username: "",
    DOB:"",
    gender:"",
    phoneNumber: "",


   

  });

  const submit = async () => {
    setModalOPTVisible(true);

  };

  const submitOPT = async () => {

    if (code.join("") !== privCode.join("")) {
      return Alert.alert("Error", "Invalid OTP");
    }
    setModalOPTVisible(false);
    Alert.alert("Success", "User signed up successfully");
    console.log(code, phoneNumber);
    router.push("/test");
  };

  return (
    <>





<NameInput />
      <PhoneInput
        code={code}
        setCode={setCode}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        form={form}
        setForm={setForm}
        submit={submit}
        submitOPT={submitOPT}
        modalOPTVisible={modalOPTVisible}
        setModalOPTVisible={setModalOPTVisible}
      />










    </>
  );
};

export default SignUp;
