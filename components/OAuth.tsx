import { Alert, Image, Text, View } from "react-native";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import { useOAuth } from "@clerk/clerk-expo";
import { useCallback } from "react";
import { googleOAuth } from "@/lib/auth";
import { router } from "expo-router";

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const result = await googleOAuth(startOAuthFlow);

      if (result.code === "Session_exists") {
        Alert.alert("Success", "Session exists, Redirecting to home.");
        router.replace("/(root)/(tabs)/home");
      }
      Alert.alert(result.success ? "Success" : "Error", result.message);
    } catch (err) {
      console.error("OAuth error", err);
      Alert.alert("Error", `Error: ${err}`);
    }
  }, []);

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
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};
export default OAuth;
