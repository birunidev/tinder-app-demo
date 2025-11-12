import React from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/text";

export function EmptyState() {
  return (
    <View className="items-center justify-center px-8 flex-1">
      <Text className="text-foreground text-2xl font-bold text-center mb-4">
        No more profiles!
      </Text>
      <Text className="text-muted-foreground text-center">
        Check back later for more matches
      </Text>
    </View>
  );
}

