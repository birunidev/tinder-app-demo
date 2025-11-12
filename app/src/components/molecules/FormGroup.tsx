import { View } from "react-native";
import { FormLabel } from "../atoms/FormLabel";
import { Text } from "../ui/text";

export const FormGroup = ({
  label,
  children,
  errorMessage,
}: {
  label: string;
  children: React.ReactNode;
  errorMessage?: string;
}) => {
  return (
    <View className="mb-4">
      <FormLabel>{label}</FormLabel>
      {children}
      {errorMessage && (
        <Text className="text-red-500 text-sm">{errorMessage}</Text>
      )}
    </View>
  );
};
