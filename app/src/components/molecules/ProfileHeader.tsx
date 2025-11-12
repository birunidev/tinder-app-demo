import { GetRecommendedPeople200DataItem } from "@/api/tinder-api/models";
import { VerifiedBadge } from "@/components/atoms/VerifiedBadge";
import { Text } from "@/components/ui/text";
import React from "react";
import { View } from "react-native";

interface ProfileHeaderProps {
  profile: GetRecommendedPeople200DataItem;
}

export const ProfileHeader = React.memo(function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <View>
      <View className="flex-row items-center gap-2 mb-2">
        <Text className="text-white text-4xl font-bold">
          {profile?.name}, {profile?.age}
        </Text>
        <VerifiedBadge />
      </View>
      <Text className="text-white font-bold text-slate-100">
        {profile?.location}
      </Text>
    </View>
  );
}, (prevProps, nextProps) => {
  return prevProps.profile?.id === nextProps.profile?.id &&
         prevProps.profile?.name === nextProps.profile?.name &&
         prevProps.profile?.age === nextProps.profile?.age &&
         prevProps.profile?.location === nextProps.profile?.location;
});
