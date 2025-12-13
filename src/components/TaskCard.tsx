import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Task, TaskStatus, Subject } from '../services/dummyData';

interface TaskCardProps {
  task: Task;
  subject?: Subject;
  onChangeStatus: (id: string, newStatus: TaskStatus) => void;
}

function TaskCard({ task, subject, onChangeStatus }: TaskCardProps) {
  function getStatusColor(status: TaskStatus): string {
    switch (status) {
      case 'pending':
        return '#f59e0b';
      case 'inProgress':
        return '#3b82f6';
      case 'completed':
        return '#22c55e';
      default:
        return '#6b7280';
    }
  }

  function getStatusLabel(status: TaskStatus): string {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'inProgress':
        return 'En progreso';
      case 'completed':
        return 'Completada';
      default:
        return status;
    }
  }

  function getNextStatus(currentStatus: TaskStatus): TaskStatus {
    switch (currentStatus) {
      case 'pending':
        return 'inProgress';
      case 'inProgress':
        return 'completed';
      case 'completed':
        return 'pending';
      default:
        return 'pending';
    }
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  return (
    <View style={styles.card}>
      <View
        style={[
          styles.statusIndicator,
          { backgroundColor: getStatusColor(task.status) },
        ]}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {task.title}
          </Text>
          {subject && (
            <View
              style={[styles.subjectBadge, { backgroundColor: subject.color + '20' }]}
            >
              <Text style={[styles.subjectText, { color: subject.color }]}>
                {subject.name}
              </Text>
            </View>
          )}
        </View>

        {task.description && (
          <Text style={styles.description} numberOfLines={2}>
            {task.description}
          </Text>
        )}

        <View style={styles.footer}>
          <Text style={styles.dueDate}>📅 {formatDate(task.dueDate)}</Text>
          <TouchableOpacity
            style={[
              styles.statusButton,
              { backgroundColor: getStatusColor(task.status) + '20' },
            ]}
            onPress={() => onChangeStatus(task.id, getNextStatus(task.status))}
          >
            <Text
              style={[styles.statusText, { color: getStatusColor(task.status) }]}
            >
              {getStatusLabel(task.status)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  statusIndicator: {
    width: 6,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    flex: 1,
    marginRight: 8,
  },
  subjectBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  subjectText: {
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dueDate: {
    fontSize: 13,
    color: '#6b7280',
  },
  statusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default TaskCard;