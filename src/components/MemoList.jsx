import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function MemoList() {
    const navigation = useNavigation();
    return (
        <View>
            <TouchableOpacity style={styles.memoListItem} onPress={() => { navigation.navigate('MemoDetail'); }}>
                <View>
                    <Text style={styles.memoListItemTitle}>買い物リスト</Text>
                    <Text style={styles.memoListItemData}>2020年12月24日 10:00</Text>
                </View>
                <TouchableOpacity
                  onPress={() => { Alert.alert('Are you sure?'); }}
                  style={styles.memoDelete}
                >
                    <AntDesign name="close" size={16} color="gray" />
                </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity style={styles.memoListItem} onPress={() => { navigation.navigate('MemoDetail'); }}>
                <View>
                    <Text style={styles.memoListItemTitle}>買い物リスト</Text>
                    <Text style={styles.memoListItemData}>2020年12月24日 10:00</Text>
                </View>
                <TouchableOpacity
                  onPress={() => { Alert.alert('Are you sure?'); }}
                  style={styles.memoDelete}
                >
                    <AntDesign name="close" size={16} color="gray" />
                </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity style={styles.memoListItem} onPress={() => { navigation.navigate('MemoDetail'); }}>
                <View>
                    <Text style={styles.memoListItemTitle}>買い物リスト</Text>
                    <Text style={styles.memoListItemData}>2020年12月24日 10:00</Text>
                </View>
                <TouchableOpacity
                  onPress={() => { Alert.alert('Are you sure?'); }}
                  style={styles.memoDelete}
                >
                    <AntDesign name="close" size={16} color="gray" />
                </TouchableOpacity>
            </TouchableOpacity>

        </View>
    );
}
const styles = StyleSheet.create({
    memoListItem: {
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
        alignItems: 'center',
        borderBottomWidth: 1,
         borderColor: 'rgba(0,0,0, 0.15)',
      },
      memoListItemTitle: {
        fontSize: 16,
        lineHeight: 32,
      },
      memoListItemData: {
        fontSize: 12,
        lineHeight: 16,
        color: '#848484',
      },
      memoDelete: {
          padding: 8,
      },
});
