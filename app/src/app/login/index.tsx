import { useLoginUser } from "@/api/tinder-api/api";
import { FormGroup } from "@/components/molecules/FormGroup";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useUser } from "@/providers/user-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
  const router = useRouter();
  const { refetch } = useUser();
  const loginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLoginUser();

  const handleLogin = (data: z.infer<typeof loginSchema>) => {
    loginMutation.mutate(
      { data },
      {
        onSuccess: async (res) => {
          if (res.token) {
            await AsyncStorage.setItem("token", res.token);
            refetch();
            setTimeout(() => {
              router.replace("/");
            }, 2000);
          }
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow"
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center px-8 py-12">
            {/* Welcome Text */}
            <View className="mb-8">
              <Text variant="h1" className="text-center mb-2">
                Welcome back
              </Text>
              <Text variant="muted" className="text-center text-base">
                Sign in to continue
              </Text>
            </View>

            {/* Email Input */}
            <Controller
              name="email"
              control={loginForm.control}
              render={({ field }) => (
                <FormGroup
                  label="Email"
                  errorMessage={loginForm.formState.errors.email?.message}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#9CA3AF"
                    value={field.value}
                    onChangeText={field.onChange}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    editable={!loginMutation.isPending}
                  />
                </FormGroup>
              )}
            />

            {/* Password Input */}
            <Controller
              name="password"
              control={loginForm.control}
              render={({ field }) => (
                <FormGroup
                  label="Password"
                  errorMessage={loginForm.formState.errors.password?.message}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#9CA3AF"
                    value={field.value}
                    onChangeText={field.onChange}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="password"
                    editable={!loginMutation.isPending}
                  />
                </FormGroup>
              )}
            />

            {/* Login Button */}
            <Button
              onPress={loginForm.handleSubmit(handleLogin)}
              disabled={loginMutation.isPending}
              className="h-12 rounded-lg bg-[#FE3C72] active:bg-[#FE3C72]/90"
              size="lg"
            >
              {loginMutation.isPending ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-semibold text-base">
                  Log In
                </Text>
              )}
            </Button>

            {/* Demo Credentials Hint */}
            <View className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <Text className="text-xs text-gray-600 text-center mb-1">
                Demo Credentials:
              </Text>
              <Text className="text-xs text-gray-500 text-center">
                Email: demo@demo.app
              </Text>
              <Text className="text-xs text-gray-500 text-center">
                Password: password
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    paddingHorizontal: 16,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontSize: 16,
    color: "#111827",
  },
});
