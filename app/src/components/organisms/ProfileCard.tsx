import { ProfileHeader } from "@/components/molecules/ProfileHeader";
import { People } from "@/types";
import { Image as ExpoImage } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { State, TapGestureHandler } from "react-native-gesture-handler";

interface ProfileCardProps {
  people: People;
}

export const ProfileCard = React.memo(
  function ProfileCard({ people }: ProfileCardProps) {
    const images = useMemo(
      () =>
        people?.pictures?.length && people?.pictures?.length > 0
          ? people.pictures?.map((picture) => picture.url)
          : [],
      [people?.pictures]
    );

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const imagesLengthRef = useRef(images.length);

    React.useEffect(() => {
      imagesLengthRef.current = images.length;
    }, [images.length]);

    const changeImage = useCallback(
      (direction: "next" | "prev") => {
        if (imagesLengthRef.current <= 1) return;
        setCurrentImageIndex((prevIndex) => {
          const newIndex =
            direction === "next"
              ? (prevIndex + 1) % imagesLengthRef.current
              : (prevIndex - 1 + imagesLengthRef.current) %
                imagesLengthRef.current;

          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }).start();
          });

          return newIndex;
        });
      },
      [fadeAnim]
    );

    const handleLeftTap = useCallback(() => {
      changeImage("prev");
    }, [changeImage]);

    const handleRightTap = useCallback(() => {
      changeImage("next");
    }, [changeImage]);

    const handleLeftTapStateChange = useCallback(
      ({ nativeEvent }: any) => {
        if (nativeEvent.state === State.END) {
          handleLeftTap();
        }
      },
      [handleLeftTap]
    );

    const handleRightTapStateChange = useCallback(
      ({ nativeEvent }: any) => {
        if (nativeEvent.state === State.END) {
          handleRightTap();
        }
      },
      [handleRightTap]
    );

    const imageIndicators = useMemo(() => {
      if (images.length <= 1) return null;
      return images.map((imageUrl, index) => (
        <View
          key={`image-indicator-${index}-${imageUrl || ""}`}
          className={`flex-1 h-1 rounded-full ${
            index === currentImageIndex ? "bg-white" : "bg-white/40"
          }`}
        />
      ));
    }, [images, currentImageIndex]);

    const gradientColors = useMemo(
      () => ["transparent", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"],
      []
    );
    const gradientLocations = useMemo(() => [0, 0.5, 1], []);

    const currentImageUri = useMemo(
      () => images[currentImageIndex],
      [images, currentImageIndex]
    );

    return (
      <View className="flex-1 rounded-3xl overflow-hidden bg-white shadow-lg">
        <View className="flex-1 relative">
          <Animated.View
            style={[
              styles.imageContainer,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <ExpoImage
              source={{ uri: currentImageUri }}
              style={styles.image}
              contentFit="cover"
              transition={200}
              cachePolicy="memory-disk"
              priority="high"
              recyclingKey={currentImageUri}
            />
          </Animated.View>

          {images.length > 1 && (
            <TapGestureHandler
              onHandlerStateChange={handleLeftTapStateChange}
              maxDurationMs={250}
              maxDeltaX={10}
              maxDeltaY={10}
            >
              <View style={styles.leftTapArea} />
            </TapGestureHandler>
          )}

          {images.length > 1 && (
            <TapGestureHandler
              onHandlerStateChange={handleRightTapStateChange}
              maxDurationMs={250}
              maxDeltaX={10}
              maxDeltaY={10}
            >
              <View style={styles.rightTapArea} />
            </TapGestureHandler>
          )}

          {images.length > 1 && (
            <View className="absolute top-2 left-4 right-4 flex-row gap-1 z-10">
              {imageIndicators}
            </View>
          )}

          <LinearGradient
            colors={[...gradientColors] as [string, string, ...string[]]}
            locations={gradientLocations as [number, number, ...number[]]}
            style={styles.gradient}
          />
          <View className="absolute bottom-32 left-4 right-4 flex flex-col gap-4">
            <ProfileHeader profile={people} />
          </View>
        </View>
      </View>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.people?.id === nextProps.people?.id &&
      prevProps.people?.pictures?.length === nextProps.people?.pictures?.length
    );
  }
);

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  leftTapArea: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "50%",
    zIndex: 1,
  },
  rightTapArea: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: "50%",
    zIndex: 1,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
  },
});
