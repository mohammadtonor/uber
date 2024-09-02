import { FlatList, Text, View } from "react-native";
import RideLayout from "@/components/RideLayout";
import DriverCard from "@/components/DriverCard";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { userDriverStore } from "@/store";

const ConfirmRide = () => {
  const { drivers, setSelectedDriver, selectedDriver } = userDriverStore();
  return (
    <RideLayout title={"Chose a Driver"} snapPoint={["65", "85"]}>
      <FlatList
        data={drivers}
        renderItem={({ item }) => (
          <DriverCard
            selected={selectedDriver}
            setSelected={() => setSelectedDriver(item?.id)}
            item={item}
          />
        )}
        ListFooterComponent={() => (
          <View className="mx-5 mt-10">
            <CustomButton
              title={"select Ride"}
              onPress={() => router.push("/(root)/book-ride")}
            />
          </View>
        )}
      />
    </RideLayout>
  );
};
export default ConfirmRide;
