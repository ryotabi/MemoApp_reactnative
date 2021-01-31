import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import firebase from 'firebase';
import Button from '../components/Button';
import { translateErrors } from '../Utils';

export default function SignUpScreen(props) {
    const { navigation } = props;
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');

    const handlePress = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'MemoList' }],
            });
          })
          .catch((error) => {
              const errorMsg = translateErrors(error.code);
              Alert.alert(errorMsg.title, errorMsg.description);
          });
    };
    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={(text) => {
                      SetEmail(text);
                  }}
                  autoCaoitalize="none"
                  keyboardType="email-address"
                  placeholder="Email Address"
                  textContentType="emailAddress"
                />
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={(text) => {
                    SetPassword(text);
                }}
                  autoCaoitalize="none"
                  placeholder="Password"
                  secureTextEntry
                  textContentType="password"
                />
                <Button
                  label="submit"
                  onPress={handlePress}
                />
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already registered?</Text>
                    <TouchableOpacity
                      onPress={() => {
                          navigation.reset({
                          index: 0,
                          routes: [{
                              name: 'LogIn',
                          }],
                      });
                      }}
                    >
                        <Text style={styles.footerLink}>Log In here!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
    },
    inner: {
        paddingVertical: 27,
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    input: {
        fontSize: 16,
        height: 48,
        backgroundColor: '#ffffff',
        borderColor: '#dddddd',
        borderWidth: 1,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    footerText: {
        fontSize: 16,
        lineHeight: 24,
        marginRight: 8,
    },
    footerLink: {
        fontSize: 16,
        lineHeight: 24,
        color: '#467fd3',
    },
    footer: {
        flexDirection: 'row',
    },
});
