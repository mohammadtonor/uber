import { Alert, Image, ScrollView, Text, View } from "react-native";
import { images, icons } from "@/constants";
import InputField from "@/components/InputField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import { ReactNativeModal } from "react-native-modal";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          state: "failed",
          error: "Verification Failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        state: "failed",
        error: err.errors[0].longMessage,
      });
    }
  };

  return (
    <ScrollView className={"bg-white flex-1 "}>
      <View className={"flex-1 bg-white"}>
        <View className={"w-full h-[250px] relative"}>
          <Image className={"w-full h-full z-0"} source={images.signUpCar} />
          <Text
            className={"text-2xl font-JakartaSemiBold absolute bottom-5 left-5"}
          >
            Create New Account
          </Text>
        </View>
        <View className={"p-5"}>
          <InputField
            label={"Name"}
            placeholder={"Enter Your Name"}
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
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
            title={"Sign Up"}
            onPress={onSignUpPress}
            className={"mt-6"}
          />

          <OAuth />

          <Link
            href={"/(auth)/sign-in"}
            className={"mt-10 text-general-200 text-center text-lg"}
          >
            <Text>Already have an account? </Text>
            <Text className={"text-primary-500"}>Log In</Text>
          </Link>
        </View>

        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() =>
            setVerification({ ...verification, state: "success" })
          }
        >
          <View className={"bg-white px-5 py-9 min-h-[300px] rounded-2xl"}>
            <Text className={"text-2xl font-JakartaExtraBold mb-2"}>
              Verification
            </Text>
            <Text className={"mb-5 text-gray-400 font-Jakarta"}>
              We've sent a verification code to {form.email}
            </Text>
            <InputField
              label={"code"}
              icon={icons.lock}
              placeholder={"1234"}
              value={verification.code}
              keyboardType={"numeric"}
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />
            {verification.error && (
              <Text className={"text-red-500 text-sm mt-1"}>
                {verification.error}
              </Text>
            )}
            <CustomButton
              title={"Verify Email"}
              onPress={onPressVerify}
              className={"mt-5 bg-success-500"}
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={verification.state === "success"}>
          <View className={"bg-white px-7 py-9 min-h-[300px] rounded-2xl"}>
            <Image
              source={images.check}
              className={"w-[110px] h-[110px] mx-auto my-5"}
            />
            <Text className={"text-3xl font-JakartaBold text-center"}>
              Verified
            </Text>
            <Text
              className={
                "text-base font-Jakarta text-center text-gray-400 mt-2"
              }
            >
              You have successfully verified your account
            </Text>
            <CustomButton
              title={"Brows Home"}
              className={"mt-4"}
              onPress={() => router.replace("/(root)/(tabs)/home")}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};
export default SignUp;
