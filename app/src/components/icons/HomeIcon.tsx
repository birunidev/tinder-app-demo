import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

export function HomeIcon({ size = 44 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      <G clipPath="url(#clip0_1_14278)">
        <Path
          d="M17.5783 19.76C17.555 19.76 17.5317 19.76 17.5083 19.7367C16.7267 18.6867 16.5283 16.89 16.47 16.2017C16.47 16.0733 16.3183 15.9917 16.2017 16.0617C13.7517 17.4267 11.5 20.67 11.5 23.7967C11.5 29.1633 15.2333 33.6667 21.65 33.6667C27.6583 33.6667 31.8 29.0233 31.8 23.7967C31.8 16.9483 26.9 12.3983 22.5483 10.345C22.523 10.331 22.4941 10.3247 22.4652 10.3266C22.4363 10.3285 22.4086 10.3386 22.3853 10.3558C22.362 10.373 22.3441 10.3965 22.3337 10.4235C22.3233 10.4505 22.3209 10.48 22.3267 10.5083C22.8867 14.195 22.1167 18.2083 17.5783 19.76Z"
          fill="#FF4458"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_14278">
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
