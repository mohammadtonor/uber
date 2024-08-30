import { useUser } from "@clerk/clerk-expo";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images, recentRides } from "@/constants";
import RideCard from "@/components/RideCard";
import GoogleTextInput from "@/components/GoogleTextInput";

export default function Home() {
  const { user } = useUser();
  const loading = true;

  const handleSignOut = () => {};
  const handleGoogleSearch = () => {};

  return (
    <SafeAreaView className="bg-general-500 h-full">
      <FlatList
        data={recentRides.slice(0, 5)}
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
            <View className={"flex flex-row items-center justify-between my-5"}>
              <Text className={"text-2xl font-JakartaBold capitalize"}>
                Welcome{", "}
                {user?.firstName ||
                  user?.emailAddresses[0].emailAddress.split("@")[0]}{" "}
                👋
              </Text>
              <TouchableOpacity
                onPress={handleSignOut}
                className={
                  "justify-center items-center rounded-full bg-white w-10 h-10"
                }
              >
                <Image
                  source={icons.out}
                  className={"w-4 h-4"}
                  resizeMode={"contain"}
                />
              </TouchableOpacity>
            </View>

            <GoogleTextInput
              icon={icons.search}
              initialLocation={""}
              containerStyle={"bg-white"}
              handlePress={handleGoogleSearch}
            />

            <Text className="text-xl font-JakartaBold mt-5 mb-3">
              Your Current Location
            </Text>
          </>
        }
      />
    </SafeAreaView>
  );
}
