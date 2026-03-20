import React from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image } from "react-native";
import { Bell, CaretUp, CaretDown, Package, Handshake, Camera, Truck } from "phosphor-react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeDashboard() {
  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-between mb-8">
          <View className="flex-row items-center">
            <View className="w-14 h-14 bg-accent rounded-[20px] items-center justify-center mr-4 shadow-xl shadow-accent/10">
              <Text className="text-white font-black text-xl">B</Text>
            </View>
            <View>
              <Text className="text-text-secondary text-xs font-black uppercase tracking-widest opacity-40">Good Morning,</Text>
              <Text className="text-accent text-xl font-black tracking-tight">Pak Budi</Text>
            </View>
          </View>
          <View className="flex-row items-center">
            <View className="bg-secondary/10 px-4 py-1.5 rounded-full mr-3 border border-secondary/20">
              <Text className="text-secondary font-black text-[10px] uppercase tracking-wider">Level 78</Text>
            </View>
            <TouchableOpacity className="relative bg-white p-3 rounded-2xl shadow-sm border border-customBorder">
              <Bell size={24} color="#0a2540" weight="bold" />
              <View className="absolute top-2 right-2 w-3 h-3 bg-danger rounded-full border-2 border-white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Card - Market Intelligence */}
        <LinearGradient
          colors={["#635BFF", "#0a2540"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-[40px] p-8 mb-8 overflow-hidden shadow-2xl shadow-primary/30"
        >
          <View className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></View>
          <Text className="text-white/60 text-xs font-black uppercase tracking-[0.2em] mb-2">Market Spot Price</Text>
          <View className="flex-row items-end mb-5">
            <Text className="text-white text-5xl font-black tracking-tighter">Rp 35.000</Text>
            <Text className="text-white/40 text-sm font-bold ml-2 mb-2 uppercase tracking-widest">/ kg</Text>
          </View>
          <View className="flex-row items-center mb-8">
            <View className="bg-[#00D924]/20 rounded-full px-3 py-1.5 flex-row items-center mr-3 border border-[#00D924]/30">
              <CaretUp size={16} color="#00D924" weight="bold" />
              <Text className="text-[#00D924] text-xs font-black ml-1">+12.4%</Text>
            </View>
            <Text className="text-white/40 text-[11px] font-bold uppercase tracking-widest">vs previous close</Text>
          </View>
          <TouchableOpacity className="bg-white/10 py-4 rounded-[20px] items-center border border-white/20">
            <Text className="text-white font-black text-xs uppercase tracking-[0.2em]">Run AI Prediction</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Quick Action Grid */}
        <View className="flex-row flex-wrap justify-between mb-8">
          <QuickActionIcon icon={<Package size={32} color="#635BFF" weight="duotone" />} label="Lapor Stok" color="white" />
          <QuickActionIcon icon={<Handshake size={32} color="#635BFF" weight="duotone" />} label="Cari Pembeli" color="white" />
          <QuickActionIcon icon={<Camera size={32} color="#635BFF" weight="duotone" />} label="Foto Panen" color="white" />
          <QuickActionIcon icon={<Truck size={32} color="#635BFF" weight="duotone" />} label="Lacak Kurir" color="white" />
        </View>

        {/* Alert Section - Modern */}
        <View className="bg-warning/10 border border-warning/20 rounded-[32px] p-6 mb-8 flex-row items-center shadow-sm">
          <View className="bg-warning w-12 h-12 rounded-2xl items-center justify-center mr-5 shadow-lg shadow-warning/20">
            <Text className="text-white font-black text-xl">!</Text>
          </View>
          <View className="flex-1">
            <Text className="text-accent font-black text-lg tracking-tight">Market Surplus Detected!</Text>
            <Text className="text-text-secondary text-sm font-bold opacity-60">Demand for Red Chili is spiking in Surabaya.</Text>
          </View>
        </View>

        {/* Recent Transactions */}
        <View className="mb-12">
          <View className="flex-row justify-between items-center mb-6 px-1">
            <Text className="text-2xl font-black text-accent tracking-tight">Recent Activity</Text>
            <TouchableOpacity>
              <Text className="text-primary font-black text-xs uppercase tracking-widest opacity-60">View All</Text>
            </TouchableOpacity>
          </View>
          
          {[1, 2, 3].map((_, i) => (
            <TransactionItem key={i} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const QuickActionIcon = ({ icon, label, color }) => (
  <TouchableOpacity 
    className="w-[48%] py-8 rounded-[32px] mb-5 items-center justify-center border border-customBorder shadow-lg shadow-accent/5"
    style={{ backgroundColor: color }}
  >
    <View className="mb-3 bg-primary/5 p-4 rounded-2xl">{icon}</View>
    <Text className="text-accent font-black text-[13px] uppercase tracking-widest">{label}</Text>
  </TouchableOpacity>
);

const TransactionItem = () => (
  <View className="flex-row items-center justify-between bg-white p-6 rounded-[28px] mb-4 border border-customBorder shadow-sm hover:border-primary transition-all">
    <View className="flex-row items-center">
      <View className="w-12 h-12 bg-secondary/10 rounded-2xl items-center justify-center mr-4 border border-secondary/10">
        <User size={24} color="#00D924" weight="bold" />
      </View>
      <View>
        <Text className="text-accent font-black text-[15px] tracking-tight">Urban Veggie Hub</Text>
        <Text className="text-text-secondary text-[11px] font-bold uppercase tracking-widest opacity-40 mt-1">Chili • 200 kg</Text>
      </View>
    </View>
    <View className="items-end">
      <Text className="text-accent font-black text-lg tracking-tight">Rp 7.0M</Text>
      <View className="bg-secondary/10 rounded-full px-3 py-1 mt-1">
        <Text className="text-secondary text-[10px] font-black uppercase tracking-widest">Settled</Text>
      </View>
    </View>
  </View>
);
