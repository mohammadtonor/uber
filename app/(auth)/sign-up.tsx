import { Image, ScrollView, Text, View } from "react-native";
import { images, icons } from "@/constants";
import InputField from "@/components/InputField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import OAuth from "@/components/OAuth";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignIpPress = async () => {};

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
            onPress={onSignIpPress}
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
      </View>
    </ScrollView>
  );
};
export default SignUp;
