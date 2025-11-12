import React from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <View
      className={cn(
        "px-3 py-1.5 rounded-full",
        variant === "default" &&
          "bg-white/20 border border-white/30",
        variant === "outline" &&
          "bg-transparent border border-white/30",
        className
      )}
    >
      <Text className="text-white text-sm font-medium">{children}</Text>
    </View>
  );
}

