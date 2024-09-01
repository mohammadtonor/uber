import { Image, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router } from "expo-router";
import { icons } from "@/constants";
import Map from "@/components/Map";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRef } from "react";

const RideLayout = ({
  title,
  children,
  snapPoint,
}: {
  title: string;
  children: React.ReactNode;
  snapPoint?: string[];
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-white">
        <View className="flex flex-col h-full bg-blue-500">
          <View className="flex flex-row absolute z-10 top-16 items-center justify-start px-5">
            <TouchableOpacity onPress={() => router.back()}>
              <View className="w-7 h-7 rounded-full bg-white justify-center items-center">
                <Image
                  source={icons.backArrow}
                  className={"w-5 h-5 "}
                  resizeMode={"contain"}
                />
              </View>
            </TouchableOpacity>
            <Text className={"text-xl font-JakartaSemiBold ml-5"}>
              {title || "Go back"}
            </Text>
          </View>
          <Map />
        </View>
        <BottomSheet
          index={0}
          ref={bottomSheetRef}
          snapPoints={snapPoint || ["40%", "85%"]}
        >
          <BottomSheetView style={{ flex: 1, padding: 20 }}>
            {children}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};
export default RideLayout;
