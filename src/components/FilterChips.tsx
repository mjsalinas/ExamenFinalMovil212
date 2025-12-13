import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { TaskStatus } from '../services/dummyData';

type FilterOption = 'all' | TaskStatus;

interface FilterChipsProps {
  selectedFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
}

// ANTIPRÁCTICA: Este componente mantiene su propio estado interno
// además de recibir el estado del padre. Esto causa duplicación
// y posibles inconsistencias.
function FilterChips({
  selectedFilter,
  onFilterChange,
}: FilterChipsProps) {
  // TODO: Este estado local duplicado debería eliminarse al migrar a Redux
  const [internalFilter, setInternalFilter] = useState<FilterOption>(selectedFilter);

  const filters: { key: FilterOption; label: string }[] = [
    { key: 'all', label: 'Todas' },
    { key: 'pending', label: 'Pendientes' },
    { key: 'inProgress', label: 'En progreso' },
    { key: 'completed', label: 'Completadas' },
  ];

  function handleFilterPress(filter: FilterOption) {
    setInternalFilter(filter);
    onFilterChange(filter);
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter.key}
          style={[
            styles.chip,
            selectedFilter === filter.key && styles.chipSelected,
          ]}
          onPress={() => handleFilterPress(filter.key)}
        >
          <Text
            style={[
              styles.chipText,
              selectedFilter === filter.key && styles.chipTextSelected,
            ]}
          >
            {filter.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  chipSelected: {
    backgroundColor: '#4f46e5',
    borderColor: '#4f46e5',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  chipTextSelected: {
    color: '#ffffff',
  },
});

export default FilterChips;
export type { FilterOption };
