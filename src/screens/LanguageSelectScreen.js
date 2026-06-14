import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { colors } from '../theme';

const languages = [
  { code: 'ja', label: '日本語', flag: '🇯🇵', sub: 'Japanese' },
  { code: 'zh', label: '中文（简体）', flag: '🇨🇳', sub: 'Chinese' },
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳', sub: 'Vietnamese' },
  { code: 'ko', label: '한국어', flag: '🇰🇷', sub: 'Korean' },
  { code: 'pt', label: 'Português', flag: '🇧🇷', sub: 'Portuguese' },
  { code: 'ne', label: 'नेपाली', flag: '🇳🇵', sub: 'Nepali' },
];

export default function LanguageSelectScreen({ onSelect }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>手続きサポート</Text>
        <Text style={styles.title}>言語を選択 / Select Language</Text>
        <Text style={styles.subtitle}>使用する言語を選んでください</Text>
      </View>
      <FlatList
        data={languages}
        keyExtractor={(item) => item.code}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.langItem}
            onPress={() => onSelect(item.code)}
            activeOpacity={0.7}
          >
            <Text style={styles.flag}>{item.flag}</Text>
            <View style={styles.langTextContainer}>
              <Text style={styles.langLabel}>{item.label}</Text>
              <Text style={styles.langSub}>{item.sub}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  appName: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 8,
    letterSpacing: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  langItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  flag: {
    fontSize: 36,
    marginRight: 16,
  },
  langTextContainer: {
    flex: 1,
  },
  langLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  langSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
  },
  arrow: {
    fontSize: 28,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '300',
  },
});
