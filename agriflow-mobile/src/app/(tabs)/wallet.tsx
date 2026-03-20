import React from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { Wallet, ShieldCheck, ArrowUpRight, ArrowDownLeft, ShieldStar, CloudRain } from "phosphor-react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function WalletScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScrollView className="flex-1 px-8 pt-10" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between mb-8">
          <Text className="text-4xl font-black text-accent tracking-tighter">Finance</Text>
          <View className="w-12 h-12 bg-white rounded-2xl items-center justify-center shadow-sm border border-customBorder">
             <Wallet size={24} color="#635BFF" weight="bold" />
          </View>
        </div>

        {/* Premium Balance Card */}
        <LinearGradient
          colors={["#635BFF", "#0a2540"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-[40px] p-8 mb-10 shadow-2xl shadow-primary/30 relative overflow-hidden"
        >
          <View className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mb-24"></View>
          <Text className="text-white/60 text-[11px] font-black uppercase tracking-[0.2em] mb-2">Available Balance</Text>
          <Text className="text-white text-4xl font-black tracking-tighter mb-8 italic">Rp 12.450.000</Text>
          
          <View className="flex-row space-x-4">
            <TouchableOpacity className="flex-1 bg-white/10 py-4 rounded-[20px] flex-row items-center justify-center border border-white/20 shadow-lg">
              <ArrowDownLeft size={20} color="#FFF" weight="bold" />
              <Text className="text-white font-black text-xs uppercase tracking-widest ml-3">Withdraw</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-white/10 py-4 rounded-[20px] flex-row items-center justify-center border border-white/20">
              <ArrowUpRight size={20} color="#FFF" weight="bold" />
              <Text className="text-white font-black text-xs uppercase tracking-widest ml-3">History</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Insurance Ecosystem */}
        <View className="bg-white rounded-[40px] p-8 border border-customBorder mb-8 shadow-xl shadow-accent/5">
          <View className="flex-row justify-between items-center mb-8">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-secondary/10 rounded-2xl items-center justify-center mr-4 border border-secondary/10">
                <ShieldCheck size={28} color="#00D924" weight="fill" />
              </View>
              <Text className="text-2xl font-black text-accent tracking-tight">AgriShield</Text>
            </View>
            <View className="bg-secondary px-4 py-1.5 rounded-full shadow-lg shadow-secondary/20">
              <Text className="text-white font-black text-[10px] uppercase tracking-wider">SECURE</Text>
            </View>
          </View>

          <View className="flex-row items-center mb-10 bg-surface/50 p-6 rounded-[28px] border border-customBorder/50">
             <View className="w-16 h-16 bg-white rounded-2xl items-center justify-center mr-5 shadow-sm border border-customBorder">
                <CloudRain size={36} color="#635BFF" weight="duotone" />
             </View>
             <View className="flex-1">
                <Text className="text-text-secondary text-[11px] font-black uppercase tracking-widest opacity-40 mb-1">Environmental Scan</Text>
                <Text className="text-accent font-black text-lg tracking-tight">Optimal Conditions</Text>
             </View>
          </View>

          <Text className="text-text-secondary text-sm font-bold opacity-60 mb-8 leading-relaxed">Your 2 Ha Chili plantation is fully insured against drought and hyper-precipitation.</Text>
          
          <TouchableOpacity className="bg-accent py-5 rounded-[24px] items-center shadow-2xl">
            <Text className="text-white font-black text-xs uppercase tracking-[0.2em]">Manage Policy</Text>
          </TouchableOpacity>
        </View>

        {/* Yield Savings */}
        <View className="bg-primary/5 rounded-[40px] p-8 mb-16 border border-primary/10">
          <View className="flex-row items-center mb-5">
            <ShieldStar size={28} color="#635BFF" weight="fill" />
            <Text className="text-xl font-black text-accent ml-3 tracking-tight">Yield Savings</Text>
          </View>
          <Text className="text-text-secondary text-xs font-bold opacity-60 mb-5 leading-relaxed">Accumulating 3% surplus value from every settled transaction automatically.</Text>
          <View className="h-3 bg-white rounded-full overflow-hidden shadow-inner mb-3">
            <LinearGradient
               colors={["#635BFF", "#00D924"]}
               start={{ x: 0, y: 0 }}
               end={{ x: 1, y: 0 }}
               className="h-full w-[45%] rounded-full shadow-[0_0_10px_rgba(99,91,255,0.4)]"
            />
          </View>
          <View className="flex-row justify-between items-center">
             <Text className="text-text-secondary text-[10px] font-black uppercase tracking-widest opacity-30">Rp 450.000 saved</Text>
             <Text className="text-primary text-[10px] font-black uppercase tracking-widest underline italic">Target: 1.0M</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
