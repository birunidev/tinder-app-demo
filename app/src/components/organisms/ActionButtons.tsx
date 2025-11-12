import React, { useCallback } from "react";
import { Pressable, View } from "react-native";
import * as Haptics from "expo-haptics";
import { LikeIcon } from "@/components/icons/LikeIcon";
import { NopeIcon } from "@/components/icons/NopeIcon";
import { UndoIcon } from "@/components/icons/UndoIcon";
import { useHaptics } from "@/hooks/useHaptics";

interface ActionButtonsProps {
  onUndo: () => void;
  onNope: () => void;
  onLike: () => void;
}

export const ActionButtons = React.memo(function ActionButtons({ onUndo, onNope, onLike }: ActionButtonsProps) {
  const { triggerImpact } = useHaptics();

  const handlePress = useCallback((
    callback: () => void,
    impactStyle: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light
  ) => {
    triggerImpact(impactStyle);
    callback();
  }, [triggerImpact]);

  return (
    <View className="flex-row gap-4 px-6 py-4 items-center justify-center">
      <Pressable
        onPress={() =>
          handlePress(onUndo, Haptics.ImpactFeedbackStyle.Light)
        }
      >
        <UndoIcon size={58} />
      </Pressable>

      <Pressable
        onPress={() =>
          handlePress(onNope, Haptics.ImpactFeedbackStyle.Medium)
        }
      >
        <NopeIcon size={70} />
      </Pressable>

      <Pressable
        onPress={() =>
          handlePress(onLike, Haptics.ImpactFeedbackStyle.Medium)
        }
      >
        <LikeIcon size={70} />
      </Pressable>
    </View>
  );
});

