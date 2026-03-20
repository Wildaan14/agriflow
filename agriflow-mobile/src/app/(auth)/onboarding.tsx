import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, SafeAreaView, Dimensions, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { ArrowRight, Globe, User, MapPin, Plant, Ruler } from "phosphor-react-native";

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState("");

  const nextStep = () => setStep((s) => s + 1);

  return (
    <SafeAreaView className="flex-1 bg-surface">
      {step === 1 && <SplashStep onNext={nextStep} />}
      {step === 2 && <LanguageStep onSelect={(lang) => { setLanguage(lang); nextStep(); }} />}
      {step === 3 && <RegistrationStep onNext={nextStep} />}
      {step === 4 && <TutorialStep onFinish={() => router.replace("/(tabs)")} />}
    </SafeAreaView>
  );
}

// Layar 1 — Splash & Welcome
const SplashStep = ({ onNext }) => (
  <View className="flex-1 items-center justify-between p-8 py-16">
    <View className="items-center mt-12">
      <View className="w-28 h-28 bg-primary rounded-[36px] items-center justify-center mb-8 shadow-2xl shadow-primary/30 rotate-3">
        <Plant size={72} color="#FFFFFF" weight="fill" />
      </View>
      <Text className="text-5xl font-black text-accent text-center tracking-tighter">AgriFlow</Text>
      <Text className="text-xl text-text-secondary text-center mt-4 font-bold opacity-80 px-6 leading-relaxed">
        High-performance agricultural infrastructure for the modern farmer.
      </Text>
    </View>

    <View className="w-full space-y-5">
      <TouchableOpacity 
        onPress={onNext}
        className="bg-primary py-5 rounded-[24px] items-center justify-center flex-row shadow-xl shadow-primary/20"
      >
        <Text className="text-white text-lg font-black mr-3 uppercase tracking-widest">Get Started</Text>
        <ArrowRight size={22} color="#FFFFFF" weight="bold" />
      </TouchableOpacity>
      
      <TouchableOpacity className="py-5 items-center">
        <Text className="text-primary font-black text-lg uppercase tracking-widest opacity-60">Sign In</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// Layar 2 — Pilih Bahasa
const LanguageStep = ({ onSelect }) => {
  const languages = [
    { id: "id", label: "Indonesia", native: "Indonesia" },
    { id: "jv", label: "Jawa", native: "Boso Jowo" },
    { id: "su", label: "Sunda", native: "Basa Sunda" },
    { id: "md", label: "Madura", native: "Basa Madura" },
    { id: "bt", label: "Batak", native: "Hata Batak" },
    { id: "bg", label: "Bugis", native: "Basa Ugi" },
  ];

  return (
    <View className="flex-1 p-8">
      <Text className="text-4xl font-black text-accent mb-3 mt-12 tracking-tight">Select Language</Text>
      <Text className="text-lg text-text-secondary mb-10 font-bold opacity-70">Empowering local intuition with global standards.</Text>
      
      <View className="flex-row flex-wrap justify-between">
        {languages.map((lang) => (
          <TouchableOpacity 
            key={lang.id}
            onPress={() => onSelect(lang.id)}
            className="w-[48%] bg-white border border-customBorder p-8 rounded-[32px] mb-5 items-center justify-center shadow-lg shadow-accent/5"
          >
            <Text className="text-xl font-black text-accent mb-2">{lang.native}</Text>
            <Text className="text-xs font-bold text-text-secondary uppercase tracking-widest opacity-40">{lang.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// Layar 3 — Registrasi Sederhana
const RegistrationStep = ({ onNext }) => (
  <View className="flex-1 p-8">
    <Text className="text-4xl font-black text-accent mb-3 mt-12 tracking-tight">Register</Text>
    <Text className="text-lg text-text-secondary mb-12 font-bold opacity-70">Join the elite network of digital-first producers.</Text>

    <View className="space-y-8">
      <View>
        <Text className="text-[11px] font-black text-text-secondary mb-3 uppercase tracking-widest opacity-40">Phone Number</Text>
        <View className="flex-row items-center border border-customBorder rounded-[24px] p-5 bg-white shadow-sm">
          <Text className="text-lg font-black mr-3 text-accent">+62</Text>
          <View className="w-[1px] h-6 bg-customBorder mr-4" />
          <Text className="text-lg font-bold text-text-secondary">812 3456 7890</Text>
        </View>
      </View>

      <View>
        <Text className="text-[11px] font-black text-text-secondary mb-3 uppercase tracking-widest opacity-40">Full Name</Text>
        <View className="border border-customBorder rounded-[24px] p-5 bg-white shadow-sm">
          <Text className="text-lg font-bold text-text-secondary">e.g. Pak Budi</Text>
        </View>
      </View>
    </View>

    <TouchableOpacity 
      onPress={onNext}
      className="bg-primary py-5 rounded-[24px] items-center mt-auto mb-10 shadow-xl shadow-primary/20"
    >
      <Text className="text-white text-lg font-black uppercase tracking-widest">Continue</Text>
    </TouchableOpacity>
  </View>
);

// Layar 4 — Tutorial Singkat
const TutorialStep = ({ onFinish }) => (
  <View className="flex-1 p-8 items-center justify-between py-16">
    <View className="items-center mt-12">
      <View className="w-72 h-72 bg-primary/5 rounded-full items-center justify-center mb-10 border border-primary/10">
        <View className="bg-white p-10 rounded-[48px] shadow-2xl">
          <Plant size={100} color="#635BFF" weight="duotone" />
        </View>
      </View>
      <Text className="text-3xl font-black text-accent text-center tracking-tight">Sell with Confidence</Text>
      <Text className="text-[17px] text-text-secondary font-bold text-center mt-5 px-6 leading-relaxed opacity-70">
        Record yields, analyze disease, and connect with urban buyers instantly.
      </Text>
    </View>

    <View className="w-full">
      <View className="flex-row justify-center space-x-3 mb-12">
        <View className="w-12 h-2.5 bg-primary rounded-full shadow-sm shadow-primary/40" />
        <View className="w-2.5 h-2.5 bg-customBorder rounded-full opacity-50" />
        <View className="w-2.5 h-2.5 bg-customBorder rounded-full opacity-50" />
      </View>
      
      <TouchableOpacity 
        onPress={onFinish}
        className="bg-accent py-5 rounded-[24px] items-center shadow-2xl"
      >
        <Text className="text-white text-lg font-black uppercase tracking-widest">Start Harvesting</Text>
      </TouchableOpacity>
    </View>
  </View>
);
