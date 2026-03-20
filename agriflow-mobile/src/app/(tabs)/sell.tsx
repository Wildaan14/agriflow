import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, TextInput, Switch } from "react-native";
import { Microphone, Camera, Calendar, MapPin, CheckCircle, ArrowRight, X } from "phosphor-react-native";
import { MotiView } from "moti";

export default function LaporStokScreen() {
  const [mode, setMode] = useState<"ketik" | "suara">("ketik");
  const [isRecording, setIsRecording] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-surface">
      {/* Premium Tab Switcher */}
      <View className="p-6 pt-10 bg-white border-b border-customBorder">
        <View className="flex-row bg-surface rounded-[24px] p-1.5 w-full">
          <TouchableOpacity 
            onPress={() => setMode("ketik")}
            className={`flex-1 py-4 rounded-[20px] items-center ${mode === "ketik" ? "bg-primary shadow-lg shadow-primary/30" : ""}`}
          >
            <Text className={`font-black text-xs uppercase tracking-widest ${mode === "ketik" ? "text-white" : "text-text-secondary opacity-60"}`}>Manual Entry</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setMode("suara")}
            className={`flex-row flex-1 py-4 rounded-[20px] items-center justify-center ${mode === "suara" ? "bg-primary shadow-lg shadow-primary/30" : ""}`}
          >
            <Microphone size={18} color={mode === "suara" ? "#FFF" : "#425466"} weight="bold" className="mr-2" />
            <Text className={`font-black text-xs uppercase tracking-widest ${mode === "suara" ? "text-white" : "text-text-secondary opacity-60"}`}>Voice AI</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 24 }}>
        {mode === "ketik" ? (
          <View className="space-y-8">
            <InputGroup label="Commodity Name" placeholder="e.g. Red Chili" />
            
            <View className="flex-row space-x-5">
              <View className="flex-1">
                <InputGroup label="Quantity" placeholder="0" keyboardType="numeric" />
              </View>
              <View className="w-28">
                <Text className="text-[11px] font-black text-text-secondary mb-3 uppercase tracking-widest opacity-40">Unit</Text>
                <View className="bg-white border border-customBorder rounded-[20px] p-5 items-center shadow-sm">
                  <Text className="font-black text-accent">Kg</Text>
                </View>
              </View>
            </View>

            <InputGroup label="Target Price (per Kg)" placeholder="Rp 0" keyboardType="numeric" />

            <View>
              <Text className="text-[11px] font-black text-text-secondary mb-3 uppercase tracking-widest opacity-40">Quality Grade</Text>
              <View className="flex-row space-x-3">
                {["A", "B", "C"].map((g) => (
                  <TouchableOpacity key={g} className={`flex-1 p-5 rounded-[24px] border items-center ${g === "A" ? "bg-primary/5 border-primary shadow-sm" : "bg-white border-customBorder"}`}>
                    <Text className={`font-black ${g === "A" ? "text-primary" : "text-accent text-sm opacity-60"}`}>Grade {g}</Text>
                    {g === "A" && <View className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity className="border-2 border-dashed border-primary/20 rounded-[32px] p-10 items-center justify-center bg-primary/[0.02]">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-primary/10 mb-4">
                <Camera size={32} color="#635BFF" weight="duotone" />
              </div>
              <Text className="text-accent font-black text-sm tracking-tight">Capture Crop Photo</Text>
              <Text className="text-text-secondary text-[10px] font-bold uppercase tracking-widest opacity-40 mt-1 text-center">AI Quality Verification Analysis</Text>
            </TouchableOpacity>

            <View className="flex-row space-x-5">
              <View className="flex-1">
                <InputGroup icon={<Calendar size={20} color="#635BFF" weight="bold" />} label="Harvest Date" placeholder="18/03/2026" />
              </View>
              <View className="flex-1">
                <InputGroup icon={<MapPin size={20} color="#635BFF" weight="bold" />} label="Location" placeholder="Surabaya" />
              </View>
            </View>

            <TouchableOpacity className="bg-primary py-5 rounded-[24px] items-center shadow-2xl shadow-primary/30 mt-6">
              <Text className="text-white text-lg font-black uppercase tracking-[0.2em]">Broadcast to Market</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex-1 items-center justify-center py-20 px-8">
            <View className="w-24 h-2 bg-customBorder rounded-full mb-12 opacity-30" />
            <Text className="text-3xl font-black text-accent mb-4 text-center tracking-tight">Voice Enrollment</Text>
            <Text className="text-text-secondary text-center mb-16 font-bold opacity-60 leading-relaxed">
              "I have 200kg of grade A rice ready in Malang for fifteen thousand per kilo."
            </Text>

            <TouchableOpacity 
              onPressIn={() => setIsRecording(true)}
              onPressOut={() => setIsRecording(false)}
              className={`w-44 h-44 rounded-full items-center justify-center border-[12px] bg-white shadow-2xl ${isRecording ? "border-danger/10" : "border-primary/5 shadow-primary/20"}`}
            >
              <View className={`w-32 h-32 rounded-full items-center justify-center ${isRecording ? "bg-danger" : "bg-primary"}`}>
                <Microphone size={56} color="#FFF" weight="fill" />
              </View>
            </TouchableOpacity>

            <Text className="text-text-secondary font-black text-xs uppercase tracking-[0.3em] mt-12 opacity-40">
              {isRecording ? "Listening..." : "Hold to Speak"}
            </Text>

            {isRecording && (
              <View className="flex-row items-center space-x-1.5 mt-10">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <View key={i} className="w-1.5 bg-danger h-10 rounded-full" style={{ opacity: Math.random() + 0.2, transform: [{scaleY: Math.random() + 0.5}] }} />
                ))}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const InputGroup = ({ label, placeholder, keyboardType = "default", icon = null }) => (
  <View>
    <Text className="text-[11px] font-black text-text-secondary mb-3 uppercase tracking-widest opacity-40">{label}</Text>
    <View className="flex-row items-center bg-white border border-customBorder rounded-[20px] p-5 shadow-sm focus:border-primary">
      {icon && <View className="mr-4">{icon}</View>}
      <TextInput 
        placeholder={placeholder} 
        placeholderTextColor="#42546655"
        keyboardType={keyboardType} 
        className="flex-1 text-lg font-bold text-accent"
      />
    </View>
  </View>
);

const InputGroup = ({ label, placeholder, keyboardType = "default", icon = null }) => (
  <View>
    <Text className="text-sm font-bold text-text-secondary mb-2">{label}</Text>
    <View className="flex-row items-center bg-white border border-customBorder rounded-xl p-4">
      {icon && <View className="mr-3">{icon}</View>}
      <TextInput 
        placeholder={placeholder} 
        keyboardType={keyboardType} 
        className="flex-1 text-lg text-text-primary"
      />
    </View>
  </View>
);
