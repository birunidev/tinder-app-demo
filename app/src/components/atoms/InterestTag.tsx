import React from "react";
import { Badge } from "./Badge";

interface InterestTagProps {
  interest: string;
}

export function InterestTag({ interest }: InterestTagProps) {
  return <Badge>{interest}</Badge>;
}

