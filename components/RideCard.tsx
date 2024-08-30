import { Image, Text, View } from "react-native";
import { Ride } from "@/types/type";
import { icons } from "@/constants";
import { formatDate, formatTime } from "@/lib/utils";

export const RideCard = ({ ride }: { ride: Ride }) => {
  return (
    <View className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
      <View className="flex flex-col items-center justify-between p-3">
        <View className="flex flex-row items-center justify-between">
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${ride.destination_longitude},${ride.destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            className="w-[80px] h-[90px] rounded-lg"
          />

          <View className="flex flex-col mx-5 gap-y-5 flex-1">
            <View className={"flex-row flex items-center jc gap-x-2"}>
              <Image source={icons.to} className="h-5 w-5" />
              <Text className="font-JakartaMedium text-md">
                {ride.origin_address}
              </Text>
            </View>

            <View className={"flex-row flex items-center jc gap-x-2"}>
              <Image source={icons.point} className="h-5 w-5" />
              <Text className="font-JakartaMedium text-md">
                {ride.destination_address}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex flex-col items-center justify-center w-full mt-5 p-3 bg-general-500 rounded-lg ">
          <View
            className={
              "flex flex-row w-full gap-x-3 items-center justify-between flex-1 mb-5"
            }
          >
            <Text className={"text-md font-JakartaMedium text-gray-500"}>
              Date & Time
            </Text>
            <Text className={"text-md font-JakartaMedium"}>
              {formatDate(ride.created_at)}, {formatTime(ride.ride_time)}
            </Text>
          </View>

          <View
            className={
              "flex flex-row w-full gap-x-3 items-center flex-1 justify-between mb-5"
            }
          >
            <Text className={"text-md font-JakartaMedium text-gray-500"}>
              Driver
            </Text>
            <Text className={"text-md font-JakartaMedium"}>
              {ride.driver.first_name} {ride.driver.last_name}
            </Text>
          </View>

          <View
            className={
              "flex flex-row w-full gap-x-3 items-center flex-1 justify-between mb-5"
            }
          >
            <Text className={"text-md font-JakartaMedium text-gray-500"}>
              Car Seats
            </Text>
            <Text className={"text-md font-JakartaMedium"}>
              {ride.driver.car_seats}
            </Text>
          </View>

          <View
            className={
              "flex flex-row w-full gap-x-3 items-center flex-1 justify-between mb-5"
            }
          >
            <Text className={"text-md font-JakartaMedium text-gray-500"}>
              Payment Status
            </Text>
            <Text
              className={`${ride.payment_status === "paid" ? "text-green-500" : "text-red-500"} capitalize text-md font-JakartaMedium`}
            >
              {ride.payment_status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RideCard;
