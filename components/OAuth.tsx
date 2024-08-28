import { Image, Text, View } from "react-native";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";

``;

const OAuth = () => {
  const handleGooglSignIn = () => {};

  return (
    <View>
      <View
        className={"flex flex-row justify-center items-center mt-4 gap-x-3"}
      >
        <View className={"flex-1 h-[1px] bg-general-100"} />
        <Text className={"text-lg"}>Or</Text>
        <View className={"flex-1 h-[1px] bg-general-100"} />
      </View>
      <CustomButton
        title={"Log In with Google"}
        className={"mt-5 w-full shadow-none"}
        textVariant={"primary"}
        bgVariant={"outline"}
        IconLeft={() => (
          <Image
            source={icons.google}
            className={"mx-2 h-5 w-5 "}
            resizeMode={"contain"}
          />
        )}
        onPress={handleGooglSignIn}
      />
    </View>
  );
};
export default OAuth;
