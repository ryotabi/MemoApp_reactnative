import React, { useState } from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
import { shape, string } from 'prop-types';
import firebase from 'firebase';
import CircleButton from '../components/CircleButton';

export default function MemoEditScreen(props) {
    const { navigation, route } = props;
    const { id, bodyText } = route.params;
    const [body, setBody] = useState(bodyText);

    const handlePress = () => {
        const { currentUser } = firebase.auth();
        if (currentUser) {
            const db = firebase.firestore();
            const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
            ref.set({
                bodyText: body,
                upDatedAt: new Date(),
            }, { merge: true })
                .then(() => {
                    navigation.goBack();
                })
                .catch((error) => {
                    Alert.alert(error.code);
                });
        }
    };
    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                  value={body}
                  multiline
                  style={styles.input}
                  onChangeText={(text) => setBody(text)}
                />
            </View>
            <CircleButton
              name="check"
              onPress={handlePress}
            />
        </KeyboardAvoidingView>
    );
}

MemoEditScreen.propTypes = {
    route: shape({
        params: shape({ id: string, bodyText: string }),
    }).isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        paddingVertical: 32,
        paddingHorizontal: 27,
        flex: 1,
    },
    input: {
        flex: 1,
        textAlignVertical: 'top',
        fontSize: 16,
        lineHeight: 24,
    },
});
