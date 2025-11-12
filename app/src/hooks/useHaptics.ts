import * as Haptics from "expo-haptics";

export function useHaptics() {
  const triggerImpact = (
    style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light
  ) => {
    Haptics.impactAsync(style);
  };

  const triggerNotification = (type: Haptics.NotificationFeedbackType) => {
    Haptics.notificationAsync(type);
  };

  const triggerSuccess = () => {
    triggerNotification(Haptics.NotificationFeedbackType.Success);
  };

  const triggerError = () => {
    triggerNotification(Haptics.NotificationFeedbackType.Error);
  };

  return {
    triggerImpact,
    triggerNotification,
    triggerSuccess,
    triggerError,
  };
}

