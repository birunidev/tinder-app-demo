import { useGetLikedPeople } from "@/api/tinder-api/api";
import { SkeletonLoader } from "@/components/molecules/SkeletonLoader";
import { BottomNav } from "@/components/organisms/BottomNav";
import { SwiperContainer } from "@/components/organisms/SwiperContainer";
import { useUser } from "@/providers/user-provider";
import { People } from "@/types";
import { Redirect } from "expo-router";
import React, { useMemo, useRef } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SwiperCardRefType } from "rn-swiper-list";

export default function LikedPage() {
  const { isUserReady, isLoading } = useUser();
  const swiperRef = useRef<SwiperCardRefType>(null);
  const { data: likedPeopleResponse, isLoading: isLoadingLiked } =
    useGetLikedPeople({
      query: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      },
    });

  // Convert GetLikedPeople200DataItem[] to People[] (they have the same structure)
  const likedPeople: People[] = useMemo(
    () => (likedPeopleResponse?.data ?? []) as People[],
    [likedPeopleResponse]
  );

  if (isLoading || isLoadingLiked) {
    return (
      <SafeAreaView className="flex-1">
        <View className="flex-1 justify-start items-center relative px-4 py-8">
          <SkeletonLoader />
        </View>
        <BottomNav />
      </SafeAreaView>
    );
  }

  if (!isUserReady) {
    return <Redirect href="/login" />;
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <SwiperContainer
          people={likedPeople}
          swiperRef={swiperRef as React.RefObject<SwiperCardRefType>}
          onSwipedAll={() => {}}
          allPeopleInteracted={likedPeople.length === 0}
          readOnly={true}
          loop={true}
        />
        <BottomNav />
      </View>
    </SafeAreaView>
  );
}
