import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

export function ChatIcon({
  size = 44,
  showBadge = true,
}: {
  size?: number;
  showBadge?: boolean;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      <G clipPath="url(#clip0_1_14293)">
        <Path
          d="M21.5473 26.8335C21.5473 23.5423 24.6121 20.7517 28.5123 20.7517C29.4176 20.7517 30.3229 20.9663 31.1594 21.2533C31.1594 16.5307 26.4928 12.6667 20.8508 12.6667C15.0699 12.6667 10.3333 16.673 10.3333 21.4668C10.3333 24.5433 12.2839 27.4052 15.2099 28.8367V32.0567C15.2099 32.4148 15.4876 32.6283 15.9053 32.4148L20.0843 30.2682H21.1296C21.6173 30.2682 22.1049 30.2682 22.5226 30.1247C21.8261 29.1225 21.5473 27.978 21.5473 26.8335ZM28.5123 22.5402C25.5874 22.5402 23.2191 24.401 23.2191 26.8335C23.2191 29.266 25.5874 31.2692 28.4423 31.2692H28.7911L29.4876 31.5562L30.6017 32.2713C30.9506 32.2713 31.2983 32.2713 31.2983 31.842V30.554C32.6912 29.8388 33.6666 28.4073 33.6666 26.8335C33.6666 24.401 31.3682 22.5402 28.4423 22.5402H28.5123Z"
          fill="#7C8591"
        />
      </G>
      {showBadge && (
        <>
          <Rect x="27" y="9" width="8" height="8" rx="4" fill="#FF4458" />
          <Rect
            x="27"
            y="9"
            width="8"
            height="8"
            rx="4"
            stroke="white"
            strokeWidth="2"
          />
        </>
      )}
      <Defs>
        <ClipPath id="clip0_1_14293">
          <Rect
            width="28"
            height="28"
            fill="white"
            transform="translate(8 8)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
