import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Loader } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const AuthLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  // if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="nameInput"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="dOBInput"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="genderInput"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="phoneInput"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <Loader isLoading={loading} />
      <StatusBar backgroundColor="#161622" style="dark" />
    </>
  );
};

export default AuthLayout;
