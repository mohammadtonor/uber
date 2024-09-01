import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { Stack } from "expo-router";

const Home = () => {
  return (
    <Stack>
      <Stack.Screen name={"(tabs)"} options={{ headerShown: false }} />
      <Stack.Screen name={"find-ride"} options={{ headerShown: false }} />
      <Stack.Screen name={"confirm-ride"} options={{ headerShown: false }} />
      {/*<Stack.Screen name={"book-ride"} options={{ headerShown: false }} />*/}
    </Stack>
  );
};
export default Home;
