import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

type DefaultView = 'Dashboard' | 'Tasks';
type TaskViewMode = 'date' | 'subject' | 'status';

interface SettingsScreenProps {
  userName: string;
}

function SettingsScreen({ userName }: SettingsScreenProps) {
  // Estado local - no persistido
  const [defaultView, setDefaultView] = useState<DefaultView>('Dashboard');
  const [taskViewMode, setTaskViewMode] = useState<TaskViewMode>('date');

  const viewOptions: { key: DefaultView; label: string }[] = [
    { key: 'Dashboard', label: 'Dashboard' },
    { key: 'Tasks', label: 'Tareas' },
  ];

  const taskViewOptions: { key: TaskViewMode; label: string; icon: string }[] = [
    { key: 'date', label: 'Por fecha', icon: '📅' },
    { key: 'subject', label: 'Por materia', icon: '📚' },
    { key: 'status', label: 'Por estado', icon: '📊' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Configuración</Text>
          <Text style={styles.subtitle}>Personaliza tu experiencia</Text>
        </View>

        {/* Perfil */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perfil</Text>
          <View style={styles.card}>
            <View style={styles.profileRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {userName.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{userName}</Text>
                <Text style={styles.profileRole}>Estudiante</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Vista por defecto */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vista por defecto</Text>
          <View style={styles.card}>
            <Text style={styles.optionDescription}>
              Elige qué pantalla ver al iniciar la app
            </Text>
            <View style={styles.optionGroup}>
              {viewOptions.map((option) => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.optionButton,
                    defaultView === option.key && styles.optionButtonSelected,
                  ]}
                  onPress={() => setDefaultView(option.key)}
                >
                  <Text
                    style={[
                      styles.optionButtonText,
                      defaultView === option.key &&
                        styles.optionButtonTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Modo de ver tareas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Modo de ver tareas</Text>
          <View style={styles.card}>
            <Text style={styles.optionDescription}>
              Ordena tus tareas de la forma que prefieras
            </Text>
            {taskViewOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.viewModeOption,
                  taskViewMode === option.key && styles.viewModeOptionSelected,
                ]}
                onPress={() => setTaskViewMode(option.key)}
              >
                <Text style={styles.viewModeIcon}>{option.icon}</Text>
                <Text
                  style={[
                    styles.viewModeLabel,
                    taskViewMode === option.key &&
                      styles.viewModeLabelSelected,
                  ]}
                >
                  {option.label}
                </Text>
                {taskViewMode === option.key && (
                  <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acerca de</Text>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Versión</Text>
              <Text style={styles.infoValue}>1.0.0</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Desarrollado por</Text>
              <Text style={styles.infoValue}>Estudiante CEUTEC</Text>
            </View>
          </View>
        </View>

        {/* Aviso */}
        <View style={styles.notice}>
          <Text style={styles.noticeIcon}>⚠️</Text>
          <Text style={styles.noticeText}>
            Los cambios en esta pantalla no se guardan permanentemente. 
            Todo se maneja en memoria local.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1f2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  profileRole: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  optionDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  optionGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: '#4f46e5',
  },
  optionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  optionButtonTextSelected: {
    color: '#ffffff',
  },
  viewModeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  viewModeOptionSelected: {
    backgroundColor: '#f0f0ff',
    marginHorizontal: -16,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderBottomWidth: 0,
  },
  viewModeIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  viewModeLabel: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  viewModeLabelSelected: {
    fontWeight: '600',
    color: '#4f46e5',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  infoLabel: {
    fontSize: 15,
    color: '#6b7280',
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
  },
  notice: {
    flexDirection: 'row',
    backgroundColor: '#fef3c7',
    padding: 16,
    borderRadius: 12,
    alignItems: 'flex-start',
  },
  noticeIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  noticeText: {
    flex: 1,
    fontSize: 13,
    color: '#92400e',
    lineHeight: 20,
  },
});

export default SettingsScreen;
