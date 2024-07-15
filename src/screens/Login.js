import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from "../config/firebase"; // Importar la instancia de app de firebase.js

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const auth = getAuth(app);

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                Alert.alert('Éxito', 'Sesión iniciada exitosamente');
                const user = userCredential.user;
                console.log(user);
                setEmail("");
                setPassword("");
                goToHome();
            })
            .catch(error => {
                console.log(error);
                Alert.alert(error.message);
            });
    };

    const goToHome = () => {
        navigation.navigate('Home');
    };

    const irRegistrar = () => {
        navigation.navigate('Registro');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../images/vector.png')}
                    style={styles.logo}
                />
            </View>
            <Text style={styles.welcomeText}>Bienvenido</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
                autoCapitalize="none"
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={irRegistrar}>
                <Text style={styles.signupText}>
                    ¿No tienes una cuenta? <Text style={styles.signupLink}>Regístrate</Text>
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    logoContainer: {
        marginBottom: 40,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#4294FF',
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#4294FF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signupText: {
        color: '#888',
    },
    signupLink: {
        color: '#4294FF',
        fontWeight: 'bold',
    },
});

export default Login;
