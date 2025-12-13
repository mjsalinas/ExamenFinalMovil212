import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import StackNavigator from './src/navigation/StackNavigator';

/**
 * StudyPlannerApp - Planner de Estudios / Dashboard de Tareas Académicas
 * 
 * App para organizar materias, tareas y estado de avance 
 * (pendiente, en progreso, completado).
 * 
 

 * como antipráctica educativa. Más adelante se refactorizará 
 * para usar Redux/Redux Toolkit.
 * 
 * TODO: Migrar todo el estado global a Redux:
 * - subjects → Redux slice
 * - tasks → Redux slice  
 * - filters → Redux slice
 */

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <StackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
