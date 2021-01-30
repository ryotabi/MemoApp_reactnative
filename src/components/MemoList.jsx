import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { shape, string, instanceOf, arrayOf } from 'prop-types';
import firebase from 'firebase';
import dateToString from '../Utils/index';

export default function MemoList(props) {
    const navigation = useNavigation();
    const { memos } = props;

    const deleteMemo = (id) => {
        const { currentUser } = firebase.auth();
        if (currentUser) {
            const db = firebase.firestore();
            const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
            Alert.alert('メモを削除します', 'よろしいですか？', [
                {
                    text: 'キャンセル',
                    onPress: () => {},
                },
                {
                    text: '削除する',
                    style: 'destructive',
                    onPress: () => {
                        ref.delete().catch(() => {
                            Alert.alert('削除に失敗しました');
                        });
                    },
                },
            ]);
        }
    };

    const renderItem = (item) => {
        return (
            <TouchableOpacity style={styles.memoListItem} onPress={() => { navigation.navigate('MemoDetail', { id: item.item.id }); }}>
                <View>
                    <Text
                      style={styles.memoListItemTitle}
                      numberOfLines={1}
                    >
                        {item.item.bodyText}
                    </Text>
                    <Text style={styles.memoListItemData}>{dateToString(item.item.updatedAt)}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => { deleteMemo(item.item.id); }}
                  style={styles.memoDelete}
                >
                    <AntDesign name="close" size={16} color="gray" />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };
    return (
        <View style={styles.container}>
            <FlatList
              data={memos}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
        </View>
    );
}

MemoList.propTypes = {
    memos: arrayOf(shape({
        id: string,
        bodyText: string,
        updatedAt: instanceOf(Date),
    })).isRequired,
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
