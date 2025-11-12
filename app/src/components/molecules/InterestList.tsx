import React from "react";
import { View } from "react-native";
import { InterestTag } from "@/components/atoms/InterestTag";
import type { Profile } from "@/types";

interface InterestListProps {
  interests: Profile["interests"];
}

export function InterestList({ interests }: InterestListProps) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {interests.map((interest, index) => (
        <InterestTag key={index} interest={interest} />
      ))}
    </View>
  );
}

