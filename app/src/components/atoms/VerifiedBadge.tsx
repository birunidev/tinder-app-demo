import React from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/text";

export function VerifiedBadge() {
  return (
    <View className="w-6 h-6 rounded-full bg-blue-500 items-center justify-center">
      <Text className="text-white text-xs font-bold">✓</Text>
    </View>
  );
}

