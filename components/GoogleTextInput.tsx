import { Text, View } from "react-native";
import { GoogleInputProps } from "@/types/type";
import { flex } from "nativewind/dist/postcss/to-react-native/properties/flex";

const GoogleTextInput = ({
  icon,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
  initialLocation,
}: GoogleInputProps) => {
  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle} mb-5`}
    >
      <Text>Search</Text>
    </View>
  );
};
export default GoogleTextInput;
