import React from "react";
import { Pressable, View } from "react-native";
import { ChatIcon } from "@/components/icons/ChatIcon";
import { ExploreIcon } from "@/components/icons/ExploreIcon";
import { HomeIcon } from "@/components/icons/HomeIcon";
import { LikesYouIcon } from "@/components/icons/LikesYouIcon";
import { UserIcon } from "@/components/icons/UserIcon";

export function BottomNav() {
  return (
    <View className="flex-row justify-around items-center bg-white px-4 py-3">
      <Pressable className="items-center">
        <HomeIcon size={44} />
      </Pressable>

      <Pressable className="items-center">
        <ExploreIcon size={44} />
      </Pressable>

      <Pressable className="items-center">
        <LikesYouIcon size={44} badgeCount="99+" />
      </Pressable>

      <Pressable className="items-center">
        <ChatIcon size={44} showBadge={true} />
      </Pressable>

      <Pressable className="items-center">
        <UserIcon size={44} />
      </Pressable>
    </View>
  );
}

