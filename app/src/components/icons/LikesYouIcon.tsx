import React from "react";
import { Text, View } from "react-native";
import Svg, {
  ClipPath,
  Defs,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from "react-native-svg";

export function LikesYouIcon({
  size = 44,
  badgeCount = "99+",
}: {
  size?: number;
  badgeCount?: string;
}) {
  return (
    <View style={{ position: "relative", width: size, height: size }}>
      <Svg width={52} height={size} viewBox="0 0 52 44" fill="none">
        <G clipPath="url(#clip0_1_14286)">
          <Path
            d="M21.9987 8.66666C21.9987 15.3347 28.6667 22 35.3334 22C28.6654 22 22.0001 29.176 22.0001 35.3333C22.0001 29.176 15.2974 22 8.66675 22C15.2987 22 21.9987 15.3347 21.9987 8.66666Z"
            fill="#7C8591"
          />
        </G>
        <Rect
          x="29"
          y="5.25"
          width="22.54"
          height="15.41"
          rx="7.705"
          fill="url(#paint0_linear_1_14286)"
        />
        <Defs>
          <LinearGradient
            id="paint0_linear_1_14286"
            x1="29"
            y1="20.66"
            x2="43.3592"
            y2="-0.343001"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#FD267A" />
            <Stop offset="1" stopColor="#FF6036" />
          </LinearGradient>
          <ClipPath id="clip0_1_14286">
            <Rect
              width="32"
              height="32"
              fill="white"
              transform="translate(6 6)"
            />
          </ClipPath>
        </Defs>
      </Svg>
      <View
        style={{
          position: "absolute",
          top: 5.25 * (size / 44),
          right: 0,
          width: 22.54 * (size / 44),
          height: 15.41 * (size / 44),
          borderRadius: 7.705 * (size / 44),
          backgroundColor: "#FF4458",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 9 * (size / 44),
            fontWeight: "bold",
          }}
        >
          {badgeCount}
        </Text>
      </View>
    </View>
  );
}
