import { Tabs } from "expo-router";
import { House, Handshake, Scan, Wallet, User } from "phosphor-react-native";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#635BFF", // Stripe Indigo
        tabBarInactiveTintColor: "#425466", // Stripe Slate
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E6EBF1",
          height: 88, // Taller for modern iOS feel
          paddingBottom: 28,
          borderTopWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Beranda",
          tabBarIcon: ({ color }) => <House size={24} color={color} weight="fill" />,
        }}
      />
      <Tabs.Screen
        name="sell"
        options={{
          title: "Jual",
          tabBarIcon: ({ color }) => <Handshake size={24} color={color} weight="fill" />,
        }}
      />
      <Tabs.Screen
        name="detect"
        options={{
          title: "Deteksi AI",
          tabBarIcon: ({ color }) => (
            <View style={{ backgroundColor: '#635BFF', padding: 12, borderRadius: 99, marginTop: -24, borderWidth: 4, borderColor: '#FFFFFF' }}>
              <Scan size={28} color="#FFFFFF" weight="bold" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Dompet",
          tabBarIcon: ({ color }) => <Wallet size={24} color={color} weight="fill" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => <User size={24} color={color} weight="fill" />,
        }}
      />
    </Tabs>
  );
}
