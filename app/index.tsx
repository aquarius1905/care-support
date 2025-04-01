import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, StatusBar, ListRenderItemInfo } from 'react-native';

// データの型を定義
interface AppointmentItem {
  id: number;
  name: string;
  time: string;
}

export default function App() {
  // サンプルデータ
  const data: AppointmentItem[] = [
    { id: 1, name: "田中 太郎", time: "08:30" },
    { id: 2, name: "佐藤 花子", time: "09:00" }
  ];

  // 各アイテムのレンダリング（型付き）
  const renderItem = ({ item }: ListRenderItemInfo<AppointmentItem>) => (
    <View style={styles.item}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.timeContainer}>
          <Text style={styles.timeLabel}>予約時間</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ご利用者様一覧</Text>
      </View>
      <FlatList<AppointmentItem>
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f6ff',
    paddingTop: StatusBar.currentHeight || 0,
  },
  header: {
    backgroundColor: '#447FFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  list: {
    padding: 16,
  },
  item: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    marginVertical: 12,
    borderRadius: 12,
    borderLeftWidth: 5,
    borderLeftColor: '#447FFF',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  timeLabel: {
    fontSize: 16,
    color: '#447FFF',
    marginRight: 8,
  },
  time: {
    fontSize: 20,
    color: '#4a6fa5',
    fontWeight: '500',
  },
});