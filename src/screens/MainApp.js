import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { t } from '../i18n';
import HomeScreen from './HomeScreen';
import ProcedureListScreen from './ProcedureListScreen';
import ProcedureDetailScreen from './ProcedureDetailScreen';
import PhraseHelperScreen from './PhraseHelperScreen';

const langFlags = { ja: '🇯🇵', zh: '🇨🇳', vi: '🇻🇳', ko: '🇰🇷', pt: '🇧🇷', ne: '🇳🇵' };

export default function MainApp({ lang }) {
  const [currentTab, setCurrentTab] = useState('home');
  const [currentScreen, setCurrentScreen] = useState('home');
  const [screenParams, setScreenParams] = useState({});
  const [screenHistory, setScreenHistory] = useState([]);

  function navigate(screen, params = {}) {
    setScreenHistory((prev) => [...prev, { screen: currentScreen, params: screenParams }]);
    setCurrentScreen(screen);
    setScreenParams(params);
  }

  function goBack() {
    if (screenHistory.length > 0) {
      const prev = screenHistory[screenHistory.length - 1];
      setScreenHistory((h) => h.slice(0, -1));
      setCurrentScreen(prev.screen);
      setScreenParams(prev.params);
    }
  }

  function switchTab(tab) {
    setCurrentTab(tab);
    setCurrentScreen(tab);
    setScreenParams({});
    setScreenHistory([]);
  }

  const tabs = [
    { key: 'home', icon: 'home-outline', labelKey: 'home' },
    { key: 'procedures', icon: 'document-text-outline', labelKey: 'procedures' },
    { key: 'phrases', icon: 'chatbubble-outline', labelKey: 'phrases' },
  ];

  function renderScreen() {
    if (currentScreen === 'procedureDetail') {
      return (
        <ProcedureDetailScreen
          lang={lang}
          goBack={goBack}
          procedure={screenParams.procedure}
        />
      );
    }
    if (currentScreen === 'home') {
      return <HomeScreen lang={lang} navigate={navigate} />;
    }
    if (currentScreen === 'procedures') {
      return <ProcedureListScreen lang={lang} navigate={navigate} />;
    }
    if (currentScreen === 'phrases') {
      return <PhraseHelperScreen lang={lang} />;
    }
    return <HomeScreen lang={lang} navigate={navigate} />;
  }

  const isDetail = currentScreen === 'procedureDetail';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {isDetail && (
            <TouchableOpacity onPress={goBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          )}
          <Text style={styles.headerTitle}>{t(lang, 'procedure_support')}</Text>
        </View>
        <View style={styles.langBadge}>
          <Text style={styles.langFlag}>{langFlags[lang] || ''}</Text>
          <Text style={styles.langCode}>{lang.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.content}>{renderScreen()}</View>

      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const active = currentTab === tab.key && !isDetail;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabItem}
              onPress={() => switchTab(tab.key)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={tab.icon}
                size={24}
                color={active ? colors.primary : colors.textLight}
              />
              <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
                {t(lang, tab.labelKey)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: 10,
    padding: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  langBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  langFlag: {
    fontSize: 16,
    marginRight: 4,
  },
  langCode: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    color: colors.textLight,
    marginTop: 2,
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: '600',
  },
});
