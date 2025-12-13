import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { addTask, updateTaskStatus } from '../store/tasksSlice';
import { setStatusFilter, setSubjectFilter } from '../store/filtersSlice';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import TaskCard from '../components/TaskCard';
import FilterChips from '../components/FilterChips';
import { Task, Subject, TaskStatus } from '../services/dummyData';

function TasksScreen() {
  // 🔹 Redux
  const subjects = useSelector((state: RootState) => state.subjects.subjects);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const statusFilter = useSelector(
    (state: RootState) => state.filters.statusFilter
  );
  const subjectFilter = useSelector(
    (state: RootState) => state.filters.subjectFilter
  );
  const dispatch = useDispatch();

  // Estado local SOLO para el formulario
  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [newTaskSubject, setNewTaskSubject] = useState<string>('');

  // Filtrar tareas
  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (statusFilter !== 'all') {
      result = result.filter((t) => t.status === statusFilter);
    }

    if (subjectFilter !== 'all') {
      result = result.filter((t) => t.subjectId === subjectFilter);
    }

    result.sort(
      (a, b) =>
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );

    return result;
  }, [tasks, statusFilter, subjectFilter]);

  // Obtener materia de una tarea
  function getSubjectForTask(subjectId: string): Subject | undefined {
    return subjects.find((s) => s.id === subjectId);
  }

  // Cambiar estado de tarea
  function handleChangeStatus(taskId: string, newStatus: TaskStatus) {
    dispatch(updateTaskStatus({ id: taskId, status: newStatus }));
  }

  // Agregar nueva tarea
  function handleAddTask() {
    if (!newTaskTitle.trim() || !newTaskSubject || !newTaskDueDate.trim()) {
      return;
    }

    const newTask: Task = {
      id: `task-${Date.now()}`,
      subjectId: newTaskSubject,
      title: newTaskTitle.trim(),
      description: newTaskDescription.trim() || undefined,
      dueDate: newTaskDueDate.trim(),
      status: 'pending',
    };

    dispatch(addTask(newTask));
    resetForm();
    setModalVisible(false);
  }

  function resetForm() {
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskDueDate('');
    setNewTaskSubject('');
  }

  function renderTask({ item }: { item: Task }) {
    return (
      <TaskCard
        task={item}
        subject={getSubjectForTask(item.subjectId)}
        onChangeStatus={handleChangeStatus}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Tareas</Text>
        <Text style={styles.subtitle}>
          {filteredTasks.length} de {tasks.length} tareas
        </Text>
      </View>

      {/* Filtros de estado */}
      <View style={styles.filtersSection}>
        <Text style={styles.filterLabel}>Por estado:</Text>
        <FilterChips
          selectedFilter={statusFilter}
          onFilterChange={(filter) => dispatch(setStatusFilter(filter))}
        />
      </View>

      {/* Filtros de materia */}
      <View style={styles.subjectFilters}>
        <Text style={styles.filterLabel}>Por materia:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.subjectChip,
              subjectFilter === 'all' && styles.subjectChipSelected,
            ]}
            onPress={() => dispatch(setSubjectFilter('all'))}
          >
            <Text
              style={[
                styles.subjectChipText,
                subjectFilter === 'all' &&
                  styles.subjectChipTextSelected,
              ]}
            >
              Todas
            </Text>
          </TouchableOpacity>

          {subjects.map((subject) => (
            <TouchableOpacity
              key={subject.id}
              style={[
                styles.subjectChip,
                subjectFilter === subject.id &&
                  styles.subjectChipSelected,
                { borderColor: subject.color },
              ]}
              onPress={() => dispatch(setSubjectFilter(subject.id))}
            >
              <View
                style={[
                  styles.subjectDot,
                  { backgroundColor: subject.color },
                ]}
              />
              <Text
                style={[
                  styles.subjectChipText,
                  subjectFilter === subject.id &&
                    styles.subjectChipTextSelected,
                ]}
              >
                {subject.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Lista de tareas */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>✅</Text>
            <Text style={styles.emptyText}>
              No hay tareas con estos filtros
            </Text>
            <Text style={styles.emptyHint}>
              Intenta cambiar los filtros o agregar una nueva tarea
            </Text>
          </View>
        }
      />

      {/* Botón flotante */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Modal para agregar tarea */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>Nueva Tarea</Text>

              <CustomInput
                label="Título"
                value={newTaskTitle}
                onChangeText={setNewTaskTitle}
                placeholder="Nombre de la tarea"
              />

              <CustomInput
                label="Descripción (opcional)"
                value={newTaskDescription}
                onChangeText={setNewTaskDescription}
                placeholder="Detalles de la tarea"
                multiline
              />

              <CustomInput
                label="Fecha de entrega (YYYY-MM-DD)"
                value={newTaskDueDate}
                onChangeText={setNewTaskDueDate}
                placeholder="2025-12-25"
              />

              <Text style={styles.selectLabel}>Selecciona materia:</Text>
              <View style={styles.subjectOptions}>
                {subjects.map((subject) => (
                  <TouchableOpacity
                    key={subject.id}
                    style={[
                      styles.subjectOption,
                      { borderColor: subject.color },
                      newTaskSubject === subject.id && {
                        backgroundColor: subject.color + '20',
                        borderWidth: 2,
                      },
                    ]}
                    onPress={() => setNewTaskSubject(subject.id)}
                  >
                    <View
                      style={[
                        styles.subjectOptionDot,
                        { backgroundColor: subject.color },
                      ]}
                    />
                    <Text style={styles.subjectOptionText}>
                      {subject.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {subjects.length === 0 && (
                <Text style={styles.noSubjectsWarning}>
                  Primero debes agregar materias en la sección "Materias"
                </Text>
              )}

              <View style={styles.modalButtons}>
                <CustomButton
                  title="Cancelar"
                  onPress={() => {
                    setModalVisible(false);
                    resetForm();
                  }}
                  variant="ghost"
                />
                <CustomButton
                  title="Agregar"
                  onPress={handleAddTask}
                  variant="primary"
                />
              </View>
            </ScrollView>
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
  filtersSection: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
  },
  subjectFilters: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  subjectChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  subjectChipSelected: {
    backgroundColor: '#4f46e5',
    borderColor: '#4f46e5',
  },
  subjectChipText: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
  },
  subjectChipTextSelected: {
    color: '#ffffff',
  },
  subjectDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
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
    textAlign: 'center',
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
    maxHeight: '85%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  selectLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  subjectOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  subjectOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
  },
  subjectOptionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  subjectOptionText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  noSubjectsWarning: {
    fontSize: 14,
    color: '#f59e0b',
    textAlign: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#fef3c7',
    borderRadius: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
  },
});

export default TasksScreen;
