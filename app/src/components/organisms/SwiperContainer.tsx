import { OverlayLabel } from "@/components/molecules/OverlayLabel";
import { People } from "@/types";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Swiper, SwiperCardRefType } from "rn-swiper-list";
import { EmptyState } from "../molecules";
import { ActionButtons } from "./ActionButtons";
import { ProfileCard } from "./ProfileCard";

interface SwiperContainerProps {
  people: People[];
  swiperRef: React.RefObject<SwiperCardRefType>;
  onSwipeLeft: (cardIndex: number) => void;
  onSwipeRight: (cardIndex: number) => void;
  onUndo: () => void;
  onNope: () => void;
  onLike: () => void;
  onSwipedAll: () => void;
  allPeopleInteracted: boolean;
}

export const SwiperContainer = React.memo(
  function SwiperContainer({
    people,
    swiperRef,
    onSwipeLeft,
    onSwipeRight,
    onUndo,
    onNope,
    onLike,
    onSwipedAll,
    allPeopleInteracted,
  }: SwiperContainerProps) {
    const renderCard = useCallback(
      (people: People) => <ProfileCard people={people} />,
      []
    );

    const renderOverlayLabelLeft = useCallback(
      () => <OverlayLabel type="nope" />,
      []
    );

    const renderOverlayLabelRight = useCallback(
      () => <OverlayLabel type="like" />,
      []
    );

    const getPeopleKey = useCallback((item: People, index: number): string => {
      return item.id ? `${item.id}-${index}` : `people-${index}`;
    }, []);

    if (allPeopleInteracted) {
      return <EmptyState />;
    }

    return (
      <View className="flex-1 justify-start items-center relative">
        <Swiper
          ref={swiperRef}
          data={people}
          renderCard={renderCard}
          cardStyle={styles.cardStyle}
          onSwipeLeft={onSwipeLeft}
          onSwipeRight={onSwipeRight}
          onSwipedAll={onSwipedAll}
          keyExtractor={getPeopleKey}
          disableTopSwipe
          disableBottomSwipe
          OverlayLabelLeft={renderOverlayLabelLeft}
          OverlayLabelRight={renderOverlayLabelRight}
        />
        <View className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <ActionButtons onUndo={onUndo} onNope={onNope} onLike={onLike} />
        </View>
      </View>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.allPeopleInteracted === nextProps.allPeopleInteracted &&
      prevProps.people.length === nextProps.people.length &&
      prevProps.people.every(
        (person, index) =>
          person.id === nextProps.people[index]?.id &&
          person.pictures?.length === nextProps.people[index]?.pictures?.length
      )
    );
  }
);

const styles = StyleSheet.create({
  cardStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
});
