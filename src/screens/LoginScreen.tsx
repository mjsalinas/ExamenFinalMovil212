import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

type RootStackParamList = {
  Login: undefined;
  Tabs: { userName: string };
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

function LoginScreen({ navigation }: LoginScreenProps) {
  // Estado local para el formulario
  const [userName, setUserName] = useState<string>('');

  function handleLogin() {
    // Validación básica
    if (!userName.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu nombre o email');
      return;
    }

    // Navegar a Tabs pasando el nombre del usuario
    navigation.replace('Tabs', { userName: userName.trim() });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>📚</Text>
          </View>
          <Text style={styles.title}>Study Planner</Text>
          <Text style={styles.subtitle}>
            Organiza tus materias y tareas académicas
          </Text>
        </View>

        <View style={styles.form}>
          <CustomInput
            label="Nombre o Email"
            value={userName}
            onChangeText={setUserName}
            placeholder="Ingresa tu nombre o email"
          />

          <CustomButton
            title="Entrar al planner"
            onPress={handleLogin}
            variant="primary"
          />

          <Text style={styles.hint}>
            No se requiere contraseña para esta demo
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Planner de Estudios v1.0
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 30,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  icon: {
    fontSize: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  form: {
    marginBottom: 32,
  },
  hint: {
    fontSize: 13,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 16,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#9ca3af',
  },
});

export default LoginScreen;