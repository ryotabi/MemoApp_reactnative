import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import firebase from 'firebase';
import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';

export default function MemoListScreen(props) {
    const { navigation } = props;
    const [memos, setMemos] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <LogOutButton />,
        });
    }, []);

    useEffect(() => {
        const db = firebase.firestore();
        const { currentUser } = firebase.auth();
        const userMemos = [];
        let unSub = () => {};
        if (currentUser) {
        unSub = db.collection(`users/${currentUser.uid}/memos`).orderBy('upDatedAt', 'desc').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                userMemos.push({
                  id: doc.id,
                  bodyText: data.bodyText,
                  updatedAt: data.upDatedAt.toDate(),
                });
            });
            setMemos(userMemos);
        });
    }
        return unSub;
    }, []);
    return (
        <View style={styles.container}>
            <MemoList memos={memos} />
            <CircleButton
              name="plus"
              onPress={() => { navigation.navigate('MemoCreate'); }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
    },
});
