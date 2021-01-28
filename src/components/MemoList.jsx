import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { shape, string, instanceOf, arrayOf } from 'prop-types';

export default function MemoList(props) {
    const navigation = useNavigation();
    const { memos } = props;

    const renderItem = (item) => {
        return (
            <TouchableOpacity style={styles.memoListItem} onPress={() => { navigation.navigate('MemoDetail'); }}>
                <View>
                    <Text
                      style={styles.memoListItemTitle}
                      numberOfLines={1}
                    >
                        {item.item.bodyText}
                    </Text>
                    <Text style={styles.memoListItemData}>{String(item.item.updatedAt)}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => { Alert.alert('Are you sure?'); }}
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
