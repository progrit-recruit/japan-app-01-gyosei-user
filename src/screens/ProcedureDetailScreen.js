import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { t } from '../i18n';

export default function ProcedureDetailScreen({ lang, goBack, procedure }) {
  const [checkedDocs, setCheckedDocs] = useState({});

  if (!procedure) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>手続きが見つかりません</Text>
      </View>
    );
  }

  function toggleDoc(docId) {
    setCheckedDocs((prev) => ({ ...prev, [docId]: !prev[docId] }));
  }

  function getDocName(doc) {
    return doc[lang] || doc.ja;
  }

  function getStepText(step) {
    return step[lang] || step.ja;
  }

  const checkedCount = Object.values(checkedDocs).filter(Boolean).length;
  const totalDocs = procedure.documents.length;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.heroCard}>
        <View style={styles.heroIconWrap}>
          <Ionicons name={procedure.icon} size={40} color={colors.primary} />
        </View>
        <Text style={styles.heroTitle}>{t(lang, procedure.nameKey)}</Text>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Ionicons name="location-outline" size={18} color={colors.secondary} />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>{t(lang, 'office')}</Text>
            <Text style={styles.infoValue}>
              {procedure.officeTextTranslations[lang] || procedure.officeText}
            </Text>
          </View>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="cash-outline" size={18} color={colors.warning} />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>{t(lang, 'fee')}</Text>
            <Text style={styles.infoValue}>
              {procedure.feeTranslations[lang] || procedure.fee}
            </Text>
          </View>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="time-outline" size={18} color={colors.primary} />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>{t(lang, 'processing_time')}</Text>
            <Text style={styles.infoValue}>
              {procedure.processingTimeTranslations[lang] || procedure.processingTime}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="checkbox-outline" size={20} color={colors.primary} />
          <Text style={styles.sectionTitle}>{t(lang, 'required_docs')}</Text>
          <View style={styles.progressBadge}>
            <Text style={styles.progressText}>{checkedCount}/{totalDocs}</Text>
          </View>
        </View>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              { width: totalDocs > 0 ? `${(checkedCount / totalDocs) * 100}%` : '0%' },
            ]}
          />
        </View>
        {procedure.documents.map((doc) => (
          <TouchableOpacity
            key={doc.id}
            style={styles.docItem}
            onPress={() => toggleDoc(doc.id)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={checkedDocs[doc.id] ? 'checkbox' : 'square-outline'}
              size={24}
              color={checkedDocs[doc.id] ? colors.secondary : colors.border}
            />
            <Text
              style={[
                styles.docText,
                checkedDocs[doc.id] && styles.docTextChecked,
              ]}
            >
              {getDocName(doc)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="list-outline" size={20} color={colors.primary} />
          <Text style={styles.sectionTitle}>{t(lang, 'steps')}</Text>
        </View>
        {procedure.steps.map((step, idx) => (
          <View key={step.id} style={styles.stepItem}>
            <View style={styles.stepNumberWrap}>
              <Text style={styles.stepNumber}>{idx + 1}</Text>
            </View>
            <Text style={styles.stepText}>{getStepText(step)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.notesCard}>
        <View style={styles.sectionHeader}>
          <Ionicons name="warning-outline" size={20} color={colors.warning} />
          <Text style={[styles.sectionTitle, { color: colors.warning }]}>
            {t(lang, 'notes')}
          </Text>
        </View>
        <Text style={styles.notesText}>
          {procedure.notes[lang] || procedure.notes.ja}
        </Text>
      </View>

      <View style={styles.bottomPad} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    color: colors.textLight,
  },
  heroCard: {
    backgroundColor: colors.card,
    margin: 16,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  heroIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  infoRow: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 10,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 8,
    flex: 1,
  },
  progressBadge: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 6,
    backgroundColor: colors.secondary,
    borderRadius: 3,
  },
  docItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  docText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  docTextChecked: {
    textDecorationLine: 'line-through',
    color: colors.textLight,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepNumberWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 1,
  },
  stepNumber: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  stepText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
    lineHeight: 22,
  },
  notesCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  notesText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
  },
  bottomPad: {
    height: 20,
  },
});
