import { Text, View } from "react-native";
import { useLocationStore } from "@/store";
import RideLayout from "@/components/RideLayout";
import GoogleTextInput from "@/components/GoogleTextInput";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  // @ts-ignore
  // @ts-ignore
  return (
    <RideLayout title="Rides" snapPoint={["3", "80"]}>
      <View className={"my-3"}>
        <Text className="text-lg font-JakartaSemiBold mb-3">From</Text>
        <GoogleTextInput
          icon={icons.to}
          initialLocation={userAddress!}
          containerStyle={"bg-neutral-100"}
          textInputBackgroundColor={"transparent"}
          handlePress={(location) => setUserLocation(location)}
        />
      </View>
      <View className={"my-3"}>
        <Text className="text-lg font-JakartaSemiBold mb-3">To</Text>
        <GoogleTextInput
          icon={icons.map}
          initialLocation={destinationAddress!}
          containerStyle={"bg-neutral-100"}
          textInputBackgroundColor={"transparent"}
          handlePress={(location) => setDestinationLocation(location)}
        />
      </View>
      {/*@ts-ignore*/}
      <CustomButton
        title={"Find Now"}
        onPress={() => router.push("/(root)/confirm-ride")}
        className={"mt-4"}
      />
    </RideLayout>
  );
};
export default FindRide;
