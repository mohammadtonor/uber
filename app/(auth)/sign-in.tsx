import { Alert, Image, ScrollView, Text, View } from "react-native";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import { useCallback, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignIn } from "@clerk/clerk-expo";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home");
      } else {
        Alert.alert("Error", "Error");
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  }, [isLoaded, form.email, form.password]);

  return (
    <ScrollView className={"bg-white flex-1 "}>
      <View className={"flex-1 bg-white"}>
        <View className={"w-full h-[250px] relative"}>
          <Image className={"w-full h-full z-0"} source={images.signUpCar} />
          <Text
            className={"text-2xl font-JakartaSemiBold absolute bottom-5 left-5"}
          >
            Welcome to Ryde
          </Text>
        </View>
        <View className={"p-5"}>
          <InputField
            label={"Email"}
            placeholder={"Enter Your Email"}
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label={"Password"}
            placeholder={"Enter Your Password"}
            icon={icons.lock}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          <CustomButton
            title={"Log In"}
            onPress={onSignInPress}
            className={"mt-6"}
          />

          <OAuth />

          <Link
            href={"/(auth)/sign-up"}
            className={"mt-10 text-general-200 text-center text-lg"}
          >
            <Text>Hav not an account? </Text>
            <Text className={"text-primary-500"}>Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};
export default SignIn;
