import { useGetInteractedPeopleIds } from "@/api/tinder-api/api";
import { SkeletonLoader } from "@/components/molecules/SkeletonLoader";
import { BottomNav } from "@/components/organisms/BottomNav";
import { SwiperContainer } from "@/components/organisms/SwiperContainer";
import { usePeople } from "@/hooks/usePeople";
import { useSwiper } from "@/hooks/useSwiper";
import { useUser } from "@/providers/user-provider";
import { Redirect } from "expo-router";
import React, { useCallback } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SwiperCardRefType } from "rn-swiper-list";

export default function Index() {
  const { people, handlePrefetchNextPage } = usePeople();
  const { isUserReady, isLoading } = useUser();
  const { data: interactedPeopleIds } = useGetInteractedPeopleIds();
  const {
    swiperRef,
    handleSwipeLeft: originalHandleSwipeLeft,
    handleSwipeRight: originalHandleSwipeRight,
    handleUndo,
    handleNope: originalHandleNope,
    handleLike: originalHandleLike,
  } = useSwiper({ people: people });

  const handleSwipeLeft = useCallback(
    (cardIndex: number) => {
      originalHandleSwipeLeft(cardIndex);
      if (cardIndex >= people.length - 2) {
        handlePrefetchNextPage();
      }
    },
    [originalHandleSwipeLeft, people.length, handlePrefetchNextPage]
  );

  const handleSwipeRight = useCallback(
    (cardIndex: number) => {
      originalHandleSwipeRight(cardIndex);
      if (cardIndex >= people.length - 2) {
        handlePrefetchNextPage();
      }
    },
    [originalHandleSwipeRight, people.length, handlePrefetchNextPage]
  );

  const handleNope = useCallback(() => {
    originalHandleNope();
    if (people.length <= 2) {
      handlePrefetchNextPage();
    }
  }, [originalHandleNope, people.length, handlePrefetchNextPage]);

  const handleLike = useCallback(() => {
    originalHandleLike();
    if (people.length <= 2) {
      handlePrefetchNextPage();
    }
  }, [originalHandleLike, people.length, handlePrefetchNextPage]);

  const handleSwipedAll = useCallback(async () => {
    await handlePrefetchNextPage();
  }, [handlePrefetchNextPage]);

  if (isLoading) {
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
          people={people}
          swiperRef={swiperRef as React.RefObject<SwiperCardRefType>}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
          onUndo={handleUndo}
          onNope={handleNope}
          onLike={handleLike}
          onSwipedAll={handleSwipedAll}
          allPeopleInteracted={
            interactedPeopleIds?.data?.length === people.length
          }
        />
        <BottomNav />
      </View>
    </SafeAreaView>
  );
}
