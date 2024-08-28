import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { useRef, useState } from "react";
import { onboarding } from "@/constants";
import CustomButton from "@/components/CustomButton";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const lastScrean = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView
      className={"h-full flex items-center justify-between bg-white"}
    >
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/sign-up")}
        className={"flex justify-end items-end w-full p-5"}
      >
        <Text className={"text-black text-base font-JakartaBold"}>Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View
            key={item.id}
            className={"flex items-center justify-center p-5"}
          >
            <Image
              source={item.image}
              className={"w-full h-[300px]"}
              resizeMode={"contain"}
            />
            <View
              className={
                "flex flex-row items-center justify-center w-full mt-10"
              }
            >
              <Text
                className={"text-3xl text-center mx-10 font-bold text-black"}
              >
                {item.title}
              </Text>
            </View>
            <Text
              className={
                "text-base font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3"
              }
            >
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      <CustomButton
        title={!lastScrean ? "Next" : "Get Start!"}
        className="w-11/12 mt-6 mb-5"
        onPress={() =>
          lastScrean
            ? router.replace("/(auth)/sign-up")
            : swiperRef?.current?.scrollBy(1)
        }
      />
    </SafeAreaView>
  );
};
export default Onboarding;
