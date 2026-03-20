import React, { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image } from "react-native";
import { Camera, Scan, Bug, Sprout, Warning, CheckCircle } from "phosphor-react-native";

export default function DetectAIScreen() {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<null | "healthy" | "disease">(null);

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-1 p-6">
        <Text className="text-2xl font-bold text-text-primary mb-2 mt-4">Deteksi Tanaman AI</Text>
        <Text className="text-text-secondary mb-8">Ambil foto tanaman untuk cek kualitas atau deteksi penyakit secara instan.</Text>

        {!result ? (
          <View className="flex-1 items-center justify-center">
            <View className="w-full aspect-square bg-white rounded-3xl border-2 border-dashed border-customBorder items-center justify-center overflow-hidden">
              <Camera size={80} color="#C7E0B0" weight="duotone" />
              <Text className="text-text-secondary font-bold mt-4">Arahkan Kamera ke Tanaman</Text>
              
              {isScanning && (
                <View className="absolute inset-0 bg-primary/10 items-center justify-center">
                   <View className="w-full h-1 bg-primary absolute top-1/2" />
                   <Text className="text-primary font-bold mt-20">Sedang Menganalisis...</Text>
                </View>
              )}
            </View>

            <TouchableOpacity 
              onPress={() => {
                setIsScanning(true);
                setTimeout(() => {
                  setIsScanning(false);
                  setResult("healthy");
                }, 2000);
              }}
              className="bg-primary w-20 h-20 rounded-full items-center justify-center mt-12 shadow-lg"
            >
              <Scan size={40} color="#F4FAF0" weight="bold" />
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView className="flex-1">
            <View className="bg-white rounded-3xl p-6 border border-customBorder mb-6">
              <View className="flex-row items-center mb-4">
                <CheckCircle size={32} color="#4A9E3F" weight="fill" />
                <Text className="text-xl font-bold text-accent ml-2">Tanaman Sehat!</Text>
              </View>
              <Text className="text-text-secondary mb-4">Hasil analisis menunjukkan tanaman Anda dalam kondisi prima. Grade estimasi: A.</Text>
              
              <View className="bg-surface p-4 rounded-2xl">
                <View className="flex-row justify-between mb-2">
                  <Text className="text-text-secondary">Warna</Text>
                  <Text className="text-text-primary font-bold">Optimal</Text>
                </View>
                <View className="flex-row justify-between mb-2">
                  <Text className="text-text-secondary">Tekstur</Text>
                  <Text className="text-text-primary font-bold">Padat</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-text-secondary">Hama</Text>
                  <Text className="text-text-primary font-bold">Tidak Terdeteksi</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity 
              onPress={() => setResult(null)}
              className="bg-primary py-4 rounded-full items-center mb-4"
            >
              <Text className="text-surface font-bold">Deteksi Ulang</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-accent py-4 rounded-full items-center">
              <Text className="text-surface font-bold">Lapor Stok dari Hasil Ini</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
