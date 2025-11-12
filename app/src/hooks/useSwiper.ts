import {
  getGetInteractedPeopleIdsQueryKey,
  useDislikePerson,
  useLikePerson,
  useUndoLastAction,
} from "@/api/tinder-api/api";
import { People } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import { SwiperCardRefType } from "rn-swiper-list";
import { useHaptics } from "./useHaptics";

interface UseSwiperProps {
  people?: People[];
}

export function useSwiper({ people = [] }: UseSwiperProps = {}) {
  const swiperRef = useRef<SwiperCardRefType>(null);
  const lastSwipedIndexRef = useRef<number | null>(null);
  const lastActionPersonIdRef = useRef<number | null>(null);
  const queryClient = useQueryClient();
  const { triggerSuccess, triggerError, triggerImpact } = useHaptics();

  const likePersonMutation = useLikePerson();
  const dislikePersonMutation = useDislikePerson();
  const undoLastActionMutation = useUndoLastAction();

  const handleSwipeLeft = useCallback(
    (cardIndex: number) => {
      lastSwipedIndexRef.current = cardIndex;
      triggerError();

      const swipedPerson = people[cardIndex];
      if (swipedPerson?.id) {
        lastActionPersonIdRef.current = swipedPerson.id;
        setTimeout(() => {
          dislikePersonMutation.mutate(
            { data: { people_id: swipedPerson.id } },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: getGetInteractedPeopleIdsQueryKey(),
                });
              },
              onError: (error) => {
                console.error("Failed to dislike person:", error);
              },
            }
          );
        }, 0);
      }
    },
    [triggerError, people, dislikePersonMutation, queryClient]
  );

  const handleSwipeRight = useCallback(
    (cardIndex: number) => {
      lastSwipedIndexRef.current = cardIndex;
      triggerSuccess();

      const swipedPerson = people[cardIndex];
      if (swipedPerson?.id) {
        lastActionPersonIdRef.current = swipedPerson.id;
        setTimeout(() => {
          likePersonMutation.mutate(
            { data: { people_id: swipedPerson.id } },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: getGetInteractedPeopleIdsQueryKey(),
                });
              },
              onError: (error) => {
                console.error("Failed to like person:", error);
              },
            }
          );
        }, 0);
      }
    },
    [triggerSuccess, people, likePersonMutation, queryClient]
  );

  const handleUndo = useCallback(() => {
    if (swiperRef.current && lastSwipedIndexRef.current !== null) {
      undoLastActionMutation.mutate(undefined, {
        onSuccess: () => {
          swiperRef.current?.swipeBack();
          triggerImpact();
          setTimeout(() => {
            lastSwipedIndexRef.current = null;
            lastActionPersonIdRef.current = null;
          }, 100);
          queryClient.invalidateQueries({
            queryKey: getGetInteractedPeopleIdsQueryKey(),
          });
        },
        onError: (error) => {
          console.error("Failed to undo last action:", error);
          swiperRef.current?.swipeBack();
          triggerImpact();
          setTimeout(() => {
            lastSwipedIndexRef.current = null;
            lastActionPersonIdRef.current = null;
          }, 100);
        },
      });
    }
  }, [triggerImpact, undoLastActionMutation, queryClient]);

  const handleNope = useCallback(() => {
    const currentPerson = people[0];
    if (currentPerson?.id) {
      const personId = currentPerson.id;
      lastActionPersonIdRef.current = personId;
      swiperRef.current?.swipeLeft();
      triggerImpact();
      setTimeout(() => {
        dislikePersonMutation.mutate(
          { data: { people_id: personId } },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: getGetInteractedPeopleIdsQueryKey(),
              });
            },
            onError: (error) => {
              console.error("Failed to dislike person:", error);
            },
          }
        );
      }, 0);
    } else {
      swiperRef.current?.swipeLeft();
      triggerImpact();
    }
  }, [triggerImpact, people, dislikePersonMutation, queryClient]);

  const handleLike = useCallback(() => {
    const currentPerson = people[0];
    if (currentPerson?.id) {
      const personId = currentPerson.id;
      lastActionPersonIdRef.current = personId;
      swiperRef.current?.swipeRight();
      triggerImpact();
      setTimeout(() => {
        likePersonMutation.mutate(
          { data: { people_id: personId } },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: getGetInteractedPeopleIdsQueryKey(),
              });
            },
            onError: (error) => {
              console.error("Failed to like person:", error);
            },
          }
        );
      }, 0);
    } else {
      swiperRef.current?.swipeRight();
      triggerImpact();
    }
  }, [triggerImpact, people, likePersonMutation, queryClient]);

  return {
    swiperRef,
    handleSwipeLeft,
    handleSwipeRight,
    handleUndo,
    handleNope,
    handleLike,
  };
}
