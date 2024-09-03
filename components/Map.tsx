import { ActivityIndicator, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { useLocationStore, userDriverStore } from "@/store";
import {
  calculateDriverTimes,
  calculateRegion,
  generateMarkersFromData,
} from "@/lib/map";
import { useEffect, useState } from "react";
import { icons } from "@/constants";
import { MarkerData } from "@/types/type";
import { useFetch } from "@/lib/fetch";
import MapViewDirections from "react-native-maps-directions";

const Map = () => {
  const { data: drivers, loading, error } = useFetch("/(api)/driver");
  const {
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

  const { selectedDriver, setDrivers } = userDriverStore();
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  useEffect(() => {
    if (Array.isArray(drivers)) {
      if (!userLatitude || !userLongitude) return;

      const newMarkers = generateMarkersFromData({
        data: drivers,
        userLatitude,
        userLongitude,
      });

      setMarkers(newMarkers);
    }
  }, [drivers, userLatitude, userLongitude]);
  useEffect(() => {
    if (
      markers.length > 0 &&
      destinationLatitude !== undefined &&
      destinationLongitude !== undefined
    ) {
      // calculateDriverTimes({
      //   markers,
      //   userLongitude,
      //   userLatitude,
      //   destinationLatitude,
      //   destinationLongitude,
      // }).then((drivers) => setDrivers(drivers as MarkerData[]));
      const filterDrivers = markers.map((driver) => ({
        ...driver,
        price: "25",
        time: 5,
      }));
      setDrivers(filterDrivers as MarkerData[]);
    }
  }, [markers, destinationLatitude, destinationLongitude]);

  if (loading || !userLatitude || !userLongitude) {
    return (
      <View className={"flex w-full justify-between items-center"}>
        <ActivityIndicator size={"large"} color={"#000"} />
      </View>
    );
  }

  if (error) {
    return (
      <View className={"flex h-full justify-between items-center"}>
        <Text className={"text-xl text-red-700"}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      className={"w-full h-full rounded-2xl"}
      tintColor={"black"}
      initialRegion={region}
      mapType={"mutedStandard"}
      showsPointsOfInterest={false}
      // showsUserLocation={true}
      userInterfaceStyle={"light"}
    >
      {destinationLatitude && destinationLongitude && (
        <>
          <Marker
            coordinate={{
              latitude: userLatitude,
              longitude: userLongitude,
            }}
            title={"source"}
            key={"source"}
            image={icons.pin}
          />
        </>
      )}
      {markers.map((marker, index) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          image={
            selectedDriver === marker.id ? icons.selectedMarker : icons.marker
          }
        />
      ))}

      {destinationLatitude && destinationLongitude && (
        <>
          <Marker
            coordinate={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            title={"Destination"}
            key={"destination"}
            image={icons.pin}
            style={{ backgroundColor: "red" }}
          />
        </>
      )}
      <>
        <MapViewDirections
          origin={{
            latitude: userLatitude!,
            longitude: userLongitude!,
          }}
          destination={{
            latitude: destinationLatitude!,
            longitude: destinationLongitude!,
          }}
          apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY!}
          strokeColor={"#0286ff"}
          strokeWidth={3}
        />
      </>
    </MapView>
  );
};
export default Map;
