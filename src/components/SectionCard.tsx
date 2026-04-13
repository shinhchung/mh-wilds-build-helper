import { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

type Props = PropsWithChildren<{
  title: string;
  subtitle?: string;
  step?: number;
}>;

export function SectionCard({ title, subtitle, step, children }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.accentBar} />
      <View style={styles.inner}>
        <View style={styles.header}>
          {step != null && (
            <View style={styles.stepBadge}>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          )}
          <Text style={styles.title}>{title}</Text>
        </View>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        <View style={styles.content}>{children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  accentBar: {
    width: 3,
    backgroundColor: colors.primary,
  },
  inner: {
    flex: 1,
    padding: 16,
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stepBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: '800',
  },
  title: {
    color: colors.primaryMuted,
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  subtitle: {
    color: colors.subtext,
    fontSize: 13,
    lineHeight: 18,
  },
  content: {
    gap: 10,
  },
});
