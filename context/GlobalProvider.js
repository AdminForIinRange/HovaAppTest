import React, { createContext, useContext, useEffect, useState } from "react";

// import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {

  const countries = [
    { code: "+61", flag: "🇦🇺", name: "Australia" },
    { code: "+1", flag: "🇺🇸", name: "United States" },
    { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
    { code: "+64", flag: "🇳🇿", name: "New Zealand" },
    { code: "+86", flag: "🇨🇳", name: "China" },
  ];
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // initially set to false but it should be true
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDob] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [structuredPhoneNumber, setStructuredPhoneNumber] = useState("");
  // useEffect(() => {
  //   getCurrentUser()
  //     .then((res) => {
  //       if (res) {
  //         setIsLogged(true);
  //         setUser(res);
  //       } else {
  //         setIsLogged(false);
  //         setUser(null);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    console.log("Name:", name);
    console.log("Phone Number:", phoneNumber);
    console.log("structuredPhoneNumber:", structuredPhoneNumber);
    console.log("Gender:", gender);
    console.log("Date of Birth:", dateOfBirth);

  }, [name, phoneNumber, gender, dateOfBirth, structuredPhoneNumber,]);

  return (
    <GlobalContext.Provider
      value={{
        structuredPhoneNumber,
        setStructuredPhoneNumber,
        selectedCountry,
        setSelectedCountry,
        name,
        setName,
        phoneNumber,
        setPhoneNumber,
        gender,
        setGender,
        dateOfBirth,
        setDob,
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

