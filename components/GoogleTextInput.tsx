import { Image, Text, View } from "react-native";
import { GoogleInputProps } from "@/types/type";
import { flex } from "nativewind/dist/postcss/to-react-native/properties/flex";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY!;

const GoogleTextInput = ({
  icon,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
  initialLocation,
}: GoogleInputProps) => {
  return (
    <View
      className={`flex flex-row items-center justify-center shadow-xl shadow-neutral-200 relative z-50 rounded-xl ${containerStyle} mb-5`}
    >
      <GooglePlacesAutocomplete
        placeholder={"Where you want go?"}
        fetchDetails={true}
        debounce={200}
        styles={{
          textInputContainer: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            marginHorizontal: 20,
            position: "relative",
            shadowColor: "#d4d4d4",
          },
          textInput: {
            backgroundColor: textInputBackgroundColor
              ? textInputBackgroundColor
              : "white",
            fontSize: 16,
            fontWeight: "600",
            marginTop: 5,
            width: "100%",
            borderRadius: 200,
          },
          listView: {
            backgroundColor: textInputBackgroundColor
              ? textInputBackgroundColor
              : "white",
            position: "relative",
            top: 0,
            width: "100%",
            borderRadius: 10,
            shadowColor: "#d4d4d4",
            zIndex: 99,
          },
        }}
        onPress={(data, details = null) => {
          handlePress({
            latitude: details?.geometry.location.lat!,
            longitude: details?.geometry.location.lng!,
            address: data?.description,
          });
        }}
        query={{
          key: googlePlacesApiKey,
          location: "en",
        }}
        renderLeftButton={() => (
          <View className={"justify-center h-5 w-6"}>
            <Image
              source={icon ? icon : icons.search}
              className={"h-6 w-6"}
              resizeMode={"contain"}
            />
          </View>
        )}
        textInputProps={{}}
      />

      <CustomButton
        title={"H"}
        className={"w-2/12 p-1 pb-1.5 mr-2"}
        bgVariant={"success"}
        onPress={() =>
          handlePress({
            latitude: 37.78825,
            longitude: -122.4324,
            address: "San Francisco Ca",
          })
        }
      />

      <CustomButton
        title={"De"}
        className={"w-2/12 p-1 pb-1.5  mr-2"}
        bgVariant={"danger"}
        onPress={() =>
          handlePress({
            latitude: 37.752979,
            longitude: -122.50457,
            address: "San Francisco Ca",
          })
        }
      />
    </View>
  );
};
export default GoogleTextInput;
