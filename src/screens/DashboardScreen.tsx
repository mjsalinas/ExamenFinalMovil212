import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import TaskCard from '../components/TaskCard';
import FilterChips, { FilterOption } from '../components/FilterChips';
import { Task, Subject, TaskStatus } from '../services/dummyData';

type TabParamList = {
  Dashboard: undefined;
  Subjects: undefined;
  Tasks: undefined;
  Settings: undefined;
};

interface DashboardScreenProps {
  route: RouteProp<TabParamList, 'Dashboard'>;
  userName: string;
  // TODO: Este estado debería moverse a un store global (Redux) para evitar prop drilling.
  subjects: Subject[];
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  activeStatusFilter: FilterOption;
  setActiveStatusFilter: React.Dispatch<React.SetStateAction<FilterOption>>;
}

function DashboardScreen({
  userName,
  subjects,
  tasks,
  setTasks,
  activeStatusFilter,
  setActiveStatusFilter,
}: DashboardScreenProps) {
  // Calcular estadísticas
  const stats = useMemo(() => {
    const total = tasks.length;
    const pending = tasks.filter((t) => t.status === 'pending').length;
    const inProgress = tasks.filter((t) => t.status === 'inProgress').length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    return { total, pending, inProgress, completed };
  }, [tasks]);

  // Filtrar tareas según el filtro activo
  const filteredTasks = useMemo(() => {
    let result = [...tasks];
    
    if (activeStatusFilter !== 'all') {
      result = result.filter((t) => t.status === activeStatusFilter);
    }

    // Ordenar por fecha y tomar las 3 más próximas
    result.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    return result.slice(0, 3);
  }, [tasks, activeStatusFilter]);

  // Cambiar estado de una tarea
  function handleChangeStatus(taskId: string, newStatus: TaskStatus) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  }

  // Obtener la materia de una tarea
  function getSubjectForTask(subjectId: string): Subject | undefined {
    return subjects.find((s) => s.id === subjectId);
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Header de bienvenida */}
        <View style={styles.header}>
          <Text style={styles.greeting}>¡Hola, {userName}! 👋</Text>
          <Text style={styles.headerSubtitle}>
            Este es tu resumen académico
          </Text>
        </View>

        {/* Tarjetas de estadísticas */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.statTotal]}>
            <Text style={styles.statNumber}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={[styles.statCard, styles.statPending]}>
            <Text style={styles.statNumber}>{stats.pending}</Text>
            <Text style={styles.statLabel}>Pendientes</Text>
          </View>
          <View style={[styles.statCard, styles.statProgress]}>
            <Text style={styles.statNumber}>{stats.inProgress}</Text>
            <Text style={styles.statLabel}>En progreso</Text>
          </View>
          <View style={[styles.statCard, styles.statCompleted]}>
            <Text style={styles.statNumber}>{stats.completed}</Text>
            <Text style={styles.statLabel}>Completadas</Text>
          </View>
        </View>

        {/* Filtros */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Filtrar por estado</Text>
          <FilterChips
            selectedFilter={activeStatusFilter}
            onFilterChange={setActiveStatusFilter}
          />
        </View>

        {/* Tareas próximas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Próximas tareas {activeStatusFilter !== 'all' && `(${activeStatusFilter})`}
          </Text>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                subject={getSubjectForTask(task.subjectId)}
                onChangeStatus={handleChangeStatus}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                No hay tareas para mostrar con este filtro
              </Text>
            </View>
          )}
        </View>

        {/* Info de materias */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tus materias ({subjects.length})</Text>
          <View style={styles.subjectsRow}>
            {subjects.map((subject) => (
              <View
                key={subject.id}
                style={[styles.subjectChip, { backgroundColor: subject.color + '20' }]}
              >
                <View style={[styles.subjectDot, { backgroundColor: subject.color }]} />
                <Text style={[styles.subjectName, { color: subject.color }]}>
                  {subject.name}
                </Text>
              </View>
            ))}
          </View>
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
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1f2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  statTotal: {
    backgroundColor: '#e0e7ff',
  },
  statPending: {
    backgroundColor: '#fef3c7',
  },
  statProgress: {
    backgroundColor: '#dbeafe',
  },
  statCompleted: {
    backgroundColor: '#dcfce7',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
  },
  emptyState: {
    backgroundColor: '#f3f4f6',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  subjectsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  subjectChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  subjectDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  subjectName: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default DashboardScreen;
