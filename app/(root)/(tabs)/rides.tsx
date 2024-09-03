import { useUser } from "@clerk/clerk-expo";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import RideCard from "@/components/RideCard";
import { useFetch } from "@/lib/fetch";
import { Ride } from "@/types/type";

export default function Home() {
  const { user } = useUser();
  const { data: recentRides, loading } = useFetch<Ride[]>(
    `/(api)/ride/${user?.id}`,
  );

  return (
    <SafeAreaView className="bg-general-500 h-full">
      <FlatList
        data={recentRides}
        renderItem={({ item }) => <RideCard ride={item} />}
        className={"px-2"}
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={{
          paddingBottom: 80,
          paddingTop: 10,
        }}
        ListEmptyComponent={() =>
          !loading ? (
            <View className={"flex flex-col items-center justify-center"}>
              <Image
                source={images.noResult}
                className={"h-40 w-40"}
                alt={"No recent rides found"}
                resizeMode={"contain"}
              />
              <Text className={"text-sm"}>No recent rides found</Text>
            </View>
          ) : (
            <ActivityIndicator size={"small"} color={"#000"} />
          )
        }
        ListHeaderComponent={
          <>
            <Text className="text-xl font-JakartaBold mt-5 mb-3">
              Recent rides
            </Text>
          </>
        }
      />
    </SafeAreaView>
  );
}
