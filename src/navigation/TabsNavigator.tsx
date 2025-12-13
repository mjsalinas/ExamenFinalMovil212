import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';

import DashboardScreen from '../screens/DashboardScreen';
import SubjectsScreen from '../screens/SubjectsScreen';
import TasksScreen from '../screens/TasksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { 
  initialSubjects, 
  initialTasks, 
  Subject, 
  Task 
} from '../services/dummyData';
import { FilterOption } from '../components/FilterChips';

export type TabParamList = {
  Dashboard: undefined;
  Subjects: undefined;
  Tasks: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Tabs: { userName: string };
};

const Tab = createBottomTabNavigator<TabParamList>();

interface TabsNavigatorProps {
  route: RouteProp<RootStackParamList, 'Tabs'>;
}

// TODO: Este estado debería moverse a un store global (Redux) para evitar prop drilling.
function TabsNavigator({ route }: TabsNavigatorProps) {
  const { userName } = route.params;

  // Estado centralizado de materias y tareas (ANTIPRÁCTICA: debería estar en Redux)
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeStatusFilter, setActiveStatusFilter] = useState<FilterOption>('all');

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#4f46e5',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIcon: ({ focused }) => {
          let icon = '';
          
          switch (route.name) {
            case 'Dashboard':
              icon = '🏠';
              break;
            case 'Subjects':
              icon = '📚';
              break;
            case 'Tasks':
              icon = '✅';
              break;
            case 'Settings':
              icon = '⚙️';
              break;
          }
          
          return <Text style={[styles.tabIcon, { opacity: focused ? 1 : 0.6 }]}>{icon}</Text>;
        },
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        options={{ tabBarLabel: 'Inicio' }}
      >
        {(props) => (
          <DashboardScreen
            {...props}
            userName={userName}
            subjects={subjects}
            tasks={tasks}
            setTasks={setTasks}
            activeStatusFilter={activeStatusFilter}
            setActiveStatusFilter={setActiveStatusFilter}
          />
        )}
      </Tab.Screen>

      <Tab.Screen 
        name="Subjects"
        options={{ tabBarLabel: 'Materias' }}
      >
        {(props) => (
          <SubjectsScreen
            {...props}
            subjects={subjects}
            setSubjects={setSubjects}
            tasks={tasks}
          />
        )}
      </Tab.Screen>

      <Tab.Screen 
        name="Tasks"
        options={{ tabBarLabel: 'Tareas' }}
      >
        {(props) => (
          <TasksScreen
            {...props}
            subjects={subjects}
            tasks={tasks}
            setTasks={setTasks}
          />
        )}
      </Tab.Screen>

      <Tab.Screen 
        name="Settings"
        options={{ tabBarLabel: 'Ajustes' }}
      >
        {(props) => (
          <SettingsScreen
            {...props}
            userName={userName}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#ffffff',
    borderTopWidth: 0,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    height: 80,
    paddingBottom: 20,
    paddingTop: 10,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  tabIcon: {
    fontSize: 22,
  },
});

export default TabsNavigator;