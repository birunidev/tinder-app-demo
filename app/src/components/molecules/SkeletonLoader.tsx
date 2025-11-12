import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export function SkeletonLoader() {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmer = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    shimmer.start();
    return () => shimmer.stop();
  }, [shimmerAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  return (
    <View className="flex-1 rounded-3xl overflow-hidden bg-gray-200 shadow-lg">
      <View className="flex-1 relative">
        {/* Skeleton image placeholder */}
        <View className="flex-1 bg-gray-300" />

        {/* Shimmer effect */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              transform: [{ translateX }],
            },
          ]}
        >
          <LinearGradient
            colors={["transparent", "rgba(255,255,255,0.3)", "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>

        {/* Skeleton gradient overlay */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}
          locations={[0, 0.5, 1]}
          style={styles.gradient}
        />

        {/* Skeleton text placeholders */}
        <View className="absolute bottom-32 left-4 right-4">
          <View className="h-10 bg-white/20 rounded-lg mb-3 w-48" />
          <View className="h-6 bg-white/15 rounded-lg w-32" />
        </View>

        {/* Skeleton progress bars */}
        <View className="absolute top-2 left-4 right-4 flex-row gap-1">
          <View className="flex-1 h-1 bg-white/40 rounded-full" />
          <View className="flex-1 h-1 bg-white/40 rounded-full" />
          <View className="flex-1 h-1 bg-white/40 rounded-full" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
  },
});
