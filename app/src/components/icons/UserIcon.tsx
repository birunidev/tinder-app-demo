import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

export function UserIcon({ size = 44 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      <G clipPath="url(#clip0_1_14299)">
        <Path
          d="M26.7659 23.197C28.265 22.0595 29.2019 20.1345 29.2019 16.722C29.2019 13.222 26.1102 10.3333 22.3641 10.3333C18.6167 10.3333 15.5251 13.1333 15.5251 16.7208C15.5251 20.2208 16.4619 22.2345 18.0544 23.3708C14.8694 25.2095 11.7777 28.7095 12.9024 30.4595C15.2439 34.572 30.5132 34.8345 32.3857 30.6345C33.1359 28.622 30.0454 25.2095 26.7659 23.197Z"
          fill="#7C8591"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_14299">
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
