import React, { useContext, useState } from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import Color from "../Colors/Color";
import { AppContext } from "../Context/Context";

export default function Base({ children }) {

  const { loadUser,
    loadBarbers,
    loadServices } = useContext(AppContext)

  const [refreshing, setRefreshing] = useState(false);
  const getRefresh = () => {
    loadUser()
    loadBarbers()
    loadServices()
  }
  return (
    <SafeAreaView style={styles.container} >
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefresh} />} >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.backgroundColor,
  },
});
