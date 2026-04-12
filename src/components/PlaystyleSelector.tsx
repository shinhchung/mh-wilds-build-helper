import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Playstyle } from '../types';
import { colors } from '../theme/colors';

const labels: Record<Playstyle, { title: string; description: string }> = {
  attack: {
    title: '攻擊型',
    description: '偏向輸出、會追求高火力同弱點打擊。',
  },
  defense: {
    title: '防守型',
    description: '偏向穩陣、生存力高，容錯率較好。',
  },
  balanced: {
    title: '全能型',
    description: '輸出、防守、手感比較平均，適合大部分玩家。',
  },
};

type Props = {
  selected: Playstyle;
  onSelect: (value: Playstyle) => void;
};

export function PlaystyleSelector({ selected, onSelect }: Props) {
  return (
    <View style={styles.container}>
      {(Object.keys(labels) as Playstyle[]).map((key) => {
        const active = key === selected;
        return (
          <Pressable
            key={key}
            onPress={() => onSelect(key)}
            style={[styles.button, active && styles.activeButton]}
          >
            <Text style={[styles.buttonTitle, active && styles.activeButtonTitle]}>{labels[key].title}</Text>
            <Text style={styles.buttonDescription}>{labels[key].description}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  button: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    gap: 6,
  },
  activeButton: {
    borderColor: colors.primary,
    backgroundColor: colors.elevatedCard,
  },
  buttonTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  activeButtonTitle: {
    color: colors.primaryMuted,
  },
  buttonDescription: {
    color: colors.subtext,
    fontSize: 13,
    lineHeight: 18,
  },
});
