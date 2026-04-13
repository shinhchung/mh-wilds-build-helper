import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { ElementType } from '../types';

type Props = {
  selected: ElementType | null;
  onSelect: (element: ElementType) => void;
};

const ELEMENTS: { id: ElementType; label: string; color: string; bg: string; border: string }[] = [
  { id: 'fire',    label: '火', color: '#ef4444', bg: '#3b0a0a', border: '#7f1d1d' },
  { id: 'water',   label: '水', color: '#60a5fa', bg: '#0a1e3b', border: '#1e3a5f' },
  { id: 'thunder', label: '雷', color: '#f59e0b', bg: '#3d2400', border: '#78350f' },
  { id: 'ice',     label: '冰', color: '#67e8f9', bg: '#071e26', border: '#0e4a5c' },
  { id: 'dragon',  label: '龍', color: '#c084fc', bg: '#1e073b', border: '#4c1d7f' },
  { id: 'none',    label: '無屬性', color: '#94a3b8', bg: '#0a1120', border: '#1e2d45' },
];

export function ElementSelector({ selected, onSelect }: Props) {
  return (
    <View style={styles.grid}>
      {ELEMENTS.map((el) => {
        const active = selected === el.id;
        return (
          <Pressable
            key={el.id}
            onPress={() => onSelect(el.id)}
            style={[
              styles.chip,
              { borderColor: active ? el.color : el.border, backgroundColor: active ? el.bg : colors.card },
            ]}
          >
            <View style={[styles.dot, { backgroundColor: el.color }]} />
            <Text style={[styles.label, { color: active ? el.color : colors.text }]}>{el.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
    borderWidth: 1,
    minWidth: '30%',
    flex: 1,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
  },
});
