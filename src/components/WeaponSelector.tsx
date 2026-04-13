import { Pressable, StyleSheet, Text, View } from 'react-native';
import { weaponTypes } from '../data/weapons';
import { colors } from '../theme/colors';

type Props = {
  selected: string | null;
  onSelect: (id: string) => void;
};

export function WeaponSelector({ selected, onSelect }: Props) {
  const melee = weaponTypes.filter((w) => w.category === 'melee');
  const ranged = weaponTypes.filter((w) => w.category === 'ranged');

  const renderWeapon = (w: (typeof weaponTypes)[number]) => {
    const active = selected === w.id;
    return (
      <Pressable
        key={w.id}
        onPress={() => onSelect(w.id)}
        style={[styles.card, active && styles.cardActive]}
      >
        <View style={[styles.badge, active && styles.badgeActive]}>
          <Text style={[styles.badgeText, active && styles.badgeTextActive]}>{w.badge}</Text>
        </View>
        <Text style={[styles.name, active && styles.nameActive]}>{w.name}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.categoryLabel}>◈ 近戰</Text>
      <View style={styles.grid}>{melee.map(renderWeapon)}</View>
      <Text style={[styles.categoryLabel, { marginTop: 12 }]}>◈ 遠程</Text>
      <View style={styles.grid}>{ranged.map(renderWeapon)}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  categoryLabel: {
    color: colors.subtext,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    minWidth: '46%',
    flex: 1,
  },
  cardActive: {
    borderColor: colors.primary,
    backgroundColor: colors.elevatedCard,
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 4,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeActive: {
    backgroundColor: colors.primary,
  },
  badgeText: {
    color: colors.subtext,
    fontSize: 14,
    fontWeight: '800',
  },
  badgeTextActive: {
    color: colors.background,
  },
  name: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  nameActive: {
    color: colors.primaryMuted,
  },
});
