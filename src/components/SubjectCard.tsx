import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Subject } from '../services/dummyData';

interface SubjectCardProps {
  subject: Subject;
  taskCount: number;
  onPress?: () => void;
}

function SubjectCard({
  subject,
  taskCount,
  onPress,
}: SubjectCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={!onPress}
    >
      <View style={[styles.colorBar, { backgroundColor: subject.color }]} />
      <View style={styles.content}>
        <Text style={styles.name}>{subject.name}</Text>
        <Text style={styles.taskCount}>
          {taskCount} {taskCount === 1 ? 'tarea' : 'tareas'}
        </Text>
      </View>
      <View style={[styles.colorDot, { backgroundColor: subject.color }]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  colorBar: {
    width: 6,
    height: '100%',
    minHeight: 70,
  },
  content: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  taskCount: {
    fontSize: 14,
    color: '#6b7280',
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 16,
  },
});

export default SubjectCard;