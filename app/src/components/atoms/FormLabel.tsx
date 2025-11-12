import { Text } from "@/components/ui/text";

export const FormLabel = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text className="text-sm font-medium mb-2 text-gray-700">{children}</Text>
  );
};
