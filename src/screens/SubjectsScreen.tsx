import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useAppSelector } from '../store/hooks';
import { RootState } from '../store';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SubjectCard from '../components/SubjectCard';
import { Subject, Task } from '../services/dummyData';
import { useAppDispatch } from '../store/hooks';
import { addSubjects, addSubject } from '../store/subjectsSlice';

interface SubjectsScreenProps {
  // TODO: Subjects debería ser una fuente de verdad global compartida (Redux slice subjects).
  
}

const COLORS = [
  '#4f46e5', // Indigo
  '#22c55e', // Green
  '#f97316', // Orange
  '#ef4444', // Red
  '#8b5cf6', // Purple
  '#06b6d4', // Cyan
  '#ec4899', // Pink
  '#f59e0b', // Amber
];

function SubjectsScreen() {

  const dispatch = useAppDispatch();
  const subjects = useAppSelector((state: RootState) => state.subjects.subjects )
  const tasks = useAppSelector((state: RootState) => state.tasks.tasks )
  const [modalVisible, setModalVisible] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  // Contar tareas por materia
  function getTaskCountForSubject(subjectId: string): number {
    return tasks.filter((t) => t.subjectId === subjectId).length;
  }

  // Agregar nueva materia
  function handleAddSubject() {
    if (!newSubjectName.trim()) {
      return;
    }

    const newSubject = {
      id: `subj-${Date.now()}`,
      name: newSubjectName.trim(),
      color: selectedColor,
    };

    dispatch(
      addSubject(newSubject)
    )

    //setSubjects((prev) => [...prev, newSubject]);
    setNewSubjectName('');
    setSelectedColor(COLORS[0]);
    setModalVisible(false);
  }

  function renderSubject({ item }: { item: Subject }) {
    return (
      <SubjectCard
        subject={item}
        taskCount={getTaskCountForSubject(item.id)}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Materias</Text>
        <Text style={styles.subtitle}>
          {subjects.length} {subjects.length === 1 ? 'materia' : 'materias'} registradas
        </Text>
      </View>

      {/* Lista de materias */}
      <FlatList
        data={subjects}
        keyExtractor={(item) => item.id}
        renderItem={renderSubject}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📖</Text>
            <Text style={styles.emptyText}>No hay materias registradas</Text>
            <Text style={styles.emptyHint}>
              Agrega tu primera materia para comenzar
            </Text>
          </View>
        }
      />

      {/* Botón flotante para agregar */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Modal para agregar materia */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nueva Materia</Text>

            <CustomInput
              label="Nombre de la materia"
              value={newSubjectName}
              onChangeText={setNewSubjectName}
              placeholder="Ej: Física, Química..."
            />

            <Text style={styles.colorLabel}>Selecciona un color</Text>
            <View style={styles.colorGrid}>
              {COLORS.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    selectedColor === color && styles.colorSelected,
                  ]}
                  onPress={() => setSelectedColor(color)}
                />
              ))}
            </View>

            <View style={styles.modalButtons}>
              <CustomButton
                title="Cancelar"
                onPress={() => {
                  setModalVisible(false);
                  setNewSubjectName('');
                }}
                variant="ghost"
              />
              <CustomButton
                title="Agregar"
                onPress={handleAddSubject}
                variant="primary"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1f2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  list: {
    padding: 20,
    paddingTop: 8,
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  emptyHint: {
    fontSize: 14,
    color: '#6b7280',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  fabText: {
    fontSize: 32,
    color: '#ffffff',
    fontWeight: '300',
    marginTop: -2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  colorLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  colorOption: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  colorSelected: {
    borderWidth: 3,
    borderColor: '#1f2937',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
});

export default SubjectsScreen;