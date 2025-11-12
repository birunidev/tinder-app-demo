import React from "react";
import Svg, { Path, Rect } from "react-native-svg";

export function LikeIcon({
  size = 32,
  color = "#199A6A",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 71 70" fill="none">
      <Rect
        x="5.5"
        y="3.5"
        width="59"
        height="59"
        rx="29.5"
        stroke="#129E68"
        strokeWidth="1"
      />
      <Path
        d="M47.0762 30.8552C47.0762 26.5076 44.1822 23.349 40.1645 23.349C38.0137 23.349 36.8573 24.1308 35.0049 25.9288C33.1429 24.1308 31.9853 23.3333 29.8429 23.3333C25.8252 23.3333 22.9167 26.4992 22.9167 30.8625C22.9167 32.6991 23.5656 34.427 24.7691 35.7876L34.4648 44.6773C34.762 44.9432 35.2466 44.9432 35.5354 44.6773L44.2922 36.7265L44.8238 36.242L45.0196 36.022L45.2226 35.8118C46.4268 34.4477 47.0889 32.6893 47.0834 30.8697"
        fill={color}
      />
    </Svg>
  );
}
