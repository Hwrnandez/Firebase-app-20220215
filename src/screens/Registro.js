import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../config/firebase";

const Registro = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");

    const auth = getAuth(app);

    const handleSignIn = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                Alert.alert('Éxito', 'Cuenta registrada exitosamente');
                irLogin();
                const user = userCredential.user;
                console.log(user);
                setEmail("");
                setName("");
                setLastName("");
                setPassword("");
            })
            .catch(error => {
                console.log(error);
                Alert.alert(error.message);
            });
    };

    const irLogin = async () => {
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../images/vector.png')}
                    style={styles.logo}
                />
            </View>
            <Text style={styles.welcomeText}>Regístrate</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={name}
                onChangeText={setName}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Apellido"
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
            />
            <TouchableOpacity style={styles.RegistroButton} onPress={handleSignIn}>
                <Text style={styles.RegistroButtonText}>REGISTRARSE</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={irLogin}>
                <Text style={styles.loginText}>
                    ¿Ya tienes una cuenta? <Text style={styles.loginLink}>Inicia sesión</Text>
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
    RegistroButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#4294FF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    RegistroButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginText: {
        color: '#888',
    },
    loginLink: {
        color: '#4294FF',
        fontWeight: 'bold',
    },
});

export default Registro;
