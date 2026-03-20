import React from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from "react-native";
import { User, Gear, Question, SignOut, Certificate, Star, MapPin } from "phosphor-react-native";

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScrollView className="flex-1">
        {/* Profile Header */}
        <View className="items-center py-10 bg-white border-b border-customBorder">
          <View className="w-24 h-24 bg-primary rounded-full items-center justify-center mb-4 shadow-xl">
            <Text className="text-surface font-bold text-3xl">P</Text>
          </View>
          <Text className="text-2xl font-bold text-text-primary">Pak Budi Hartono</Text>
          <Text className="text-text-secondary">Lahan: 1.2 Ha • Kediri, Jatim</Text>
          
          <View className="flex-row mt-6 space-x-4">
            <View className="items-center bg-surface px-6 py-3 rounded-2xl border border-customBorder">
              <Text className="text-primary font-bold text-xl">78</Text>
              <Text className="text-text-secondary text-[10px] font-bold">AgriScore</Text>
            </View>
            <View className="items-center bg-surface px-6 py-3 rounded-2xl border border-customBorder">
              <Text className="text-primary font-bold text-xl">12</Text>
              <Text className="text-text-secondary text-[10px] font-bold">Panen</Text>
            </View>
          </View>
        </View>

        {/* Menu List */}
        <View className="p-6">
          <MenuButton icon={<Star size={24} color="#1B4D1B" />} label="Program Unggulan Petani" />
          <MenuButton icon={<Certificate size={24} color="#1B4D1B" />} label="Sertifikat Digital" />
          <MenuButton icon={<MapPin size={24} color="#1B4D1B" />} label="Pengaturan Lahan" />
          <View className="h-[1px] bg-customBorder my-4" />
          <MenuButton icon={<Gear size={24} color="#1B4D1B" />} label="Pengaturan Akun" />
          <MenuButton icon={<Question size={24} color="#1B4D1B" />} label="Pusat Bantuan" />
          <TouchableOpacity className="flex-row items-center py-4">
            <View className="w-10 h-10 bg-danger/10 rounded-full items-center justify-center mr-4">
              <SignOut size={24} color="#B91C1C" />
            </View>
            <Text className="text-lg font-bold text-danger">Keluar</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-center text-text-secondary text-xs mb-10">Versi 1.0.0 (AgriFlow Foundation)</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const MenuButton = ({ icon, label }) => (
  <TouchableOpacity className="flex-row items-center py-4">
    <View className="w-10 h-10 bg-surface rounded-full items-center justify-center mr-4 border border-customBorder">
      {icon}
    </View>
    <Text className="text-lg font-bold text-text-primary flex-1">{label}</Text>
  </TouchableOpacity>
);
