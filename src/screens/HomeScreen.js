import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { t } from '../i18n';
import procedures from '../data/mockData';

export default function HomeScreen({ lang, navigate }) {
  function getProcedureName(proc) {
    return proc.nameTranslations ? proc.nameTranslations[lang] || proc.nameJa : t(lang, proc.nameKey);
  }

  function renderProcedureCard({ item }) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigate('procedureDetail', { procedure: item })}
        activeOpacity={0.75}
      >
        <View style={styles.cardIconContainer}>
          <Ionicons name={item.icon} size={28} color={colors.primary} />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{t(lang, item.nameKey)}</Text>
          <Text style={styles.cardSub}>
            {item.officeTextTranslations[lang] || item.officeText}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
      </TouchableOpacity>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.welcomeCard}>
        <View style={styles.welcomeIconRow}>
          <Ionicons name="hand-right-outline" size={32} color="#FFFFFF" />
        </View>
        <Text style={styles.welcomeTitle}>{t(lang, 'welcome')} !</Text>
        <Text style={styles.welcomeMessage}>{t(lang, 'welcome_message')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t(lang, 'all_procedures')}</Text>
        <FlatList
          data={procedures}
          keyExtractor={(item) => item.id}
          renderItem={renderProcedureCard}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  welcomeCard: {
    backgroundColor: colors.primary,
    margin: 16,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  welcomeIconRow: {
    marginBottom: 10,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeMessage: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    lineHeight: 22,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
    marginLeft: 4,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  cardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 3,
  },
  cardSub: {
    fontSize: 13,
    color: colors.textLight,
  },
  separator: {
    height: 10,
  },
});
