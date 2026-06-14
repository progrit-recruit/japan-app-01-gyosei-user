import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Clipboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { t } from '../i18n';

const phrases = [
  {
    id: '1',
    ja: '〜の手続きをしたいのですが',
    zh: '我想办理〜的手续',
    vi: 'Tôi muốn làm thủ tục〜',
    ko: '〜 절차를 진행하고 싶습니다',
    pt: 'Gostaria de realizar o procedimento de〜',
    ne: 'मैले〜को प्रक्रिया गर्न चाहन्छु',
  },
  {
    id: '2',
    ja: 'この書類で合っていますか？',
    zh: '这个文件对吗？',
    vi: 'Giấy tờ này có đúng không?',
    ko: '이 서류가 맞습니까?',
    pt: 'Este documento está correto?',
    ne: 'के यो कागजात सही छ?',
  },
  {
    id: '3',
    ja: '次はどこに行けばいいですか？',
    zh: '下一步该去哪里？',
    vi: 'Tiếp theo tôi cần đến đâu?',
    ko: '다음에는 어디로 가면 됩니까?',
    pt: 'Para onde devo ir a seguir?',
    ne: 'अर्को कहाँ जाने?',
  },
  {
    id: '4',
    ja: 'もう一度説明してもらえますか？',
    zh: '能再解释一次吗？',
    vi: 'Bạn có thể giải thích lại không?',
    ko: '한 번 더 설명해 주시겠습니까?',
    pt: 'Pode explicar novamente?',
    ne: 'फेरि एकपटक बुझाइदिनु हुन्छ?',
  },
  {
    id: '5',
    ja: '外国語対応の窓口はありますか？',
    zh: '有外语服务窗口吗？',
    vi: 'Có quầy hỗ trợ tiếng nước ngoài không?',
    ko: '외국어 대응 창구가 있습니까?',
    pt: 'Existe um balcão com atendimento em língua estrangeira?',
    ne: 'विदेशी भाषाको सेवा काउन्टर छ?',
  },
  {
    id: '6',
    ja: '記入の仕方を教えてください',
    zh: '请教我如何填写',
    vi: 'Xin hướng dẫn cách điền',
    ko: '기입 방법을 알려주세요',
    pt: 'Por favor, me ensine como preencher',
    ne: 'भर्ने तरिका सिकाइदिनुहोस्',
  },
  {
    id: '7',
    ja: 'いつできますか？',
    zh: '什么时候可以完成？',
    vi: 'Khi nào có thể hoàn thành?',
    ko: '언제 완료됩니까?',
    pt: 'Quando ficará pronto?',
    ne: 'कहिले हुन्छ?',
  },
  {
    id: '8',
    ja: '費用はいくらですか？',
    zh: '费用是多少？',
    vi: 'Chi phí là bao nhiêu?',
    ko: '비용은 얼마입니까?',
    pt: 'Qual é o custo?',
    ne: 'खर्च कति हो?',
  },
  {
    id: '9',
    ja: '領収書をください',
    zh: '请给我收据',
    vi: 'Xin cho tôi biên lai',
    ko: '영수증을 주세요',
    pt: 'Por favor, me dê o recibo',
    ne: 'रसिद दिनुहोस्',
  },
  {
    id: '10',
    ja: '担当者を呼んでください',
    zh: '请叫负责人来',
    vi: 'Xin gọi người phụ trách',
    ko: '담당자를 불러주세요',
    pt: 'Por favor, chame o responsável',
    ne: 'जिम्मेवार व्यक्तिलाई बोलाइदिनुहोस्',
  },
];

export default function PhraseHelperScreen({ lang }) {
  const [copiedId, setCopiedId] = useState(null);

  function handleCopy(phrase) {
    const text = phrase[lang] || phrase.ja;
    Clipboard.setString(text);
    setCopiedId(phrase.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  function renderPhrase({ item, index }) {
    const isCopied = copiedId === item.id;
    const translation = item[lang] || item.ja;
    const showBoth = lang !== 'ja';

    return (
      <TouchableOpacity
        style={styles.phraseCard}
        onPress={() => handleCopy(item)}
        activeOpacity={0.75}
      >
        <View style={styles.phraseHeader}>
          <View style={styles.phraseNumBadge}>
            <Text style={styles.phraseNum}>{index + 1}</Text>
          </View>
          <View style={styles.copyIndicator}>
            {isCopied ? (
              <>
                <Ionicons name="checkmark-circle" size={18} color={colors.secondary} />
                <Text style={styles.copiedText}>コピー済み</Text>
              </>
            ) : (
              <>
                <Ionicons name="copy-outline" size={16} color={colors.textLight} />
                <Text style={styles.copyHint}>{t(lang, 'tap_to_copy')}</Text>
              </>
            )}
          </View>
        </View>

        {showBoth && (
          <View style={styles.phraseJa}>
            <Text style={styles.phraseJaLabel}>🇯🇵 日本語</Text>
            <Text style={styles.phraseJaText}>{item.ja}</Text>
          </View>
        )}

        <View style={[styles.phraseLang, isCopied && styles.phraseLangCopied]}>
          <Text style={styles.phraseLangText}>{translation}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerInfo}>
        <Ionicons name="chatbubbles-outline" size={22} color={colors.primary} />
        <Text style={styles.headerInfoText}>{t(lang, 'phrase_title')}</Text>
      </View>
      <FlatList
        data={phrases}
        keyExtractor={(item) => item.id}
        renderItem={renderPhrase}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerInfoText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  list: {
    padding: 16,
    paddingBottom: 32,
  },
  phraseCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  phraseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  phraseNumBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phraseNum: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  copyIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copiedText: {
    fontSize: 12,
    color: colors.secondary,
    marginLeft: 4,
    fontWeight: '600',
  },
  copyHint: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 4,
  },
  phraseJa: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  phraseJaLabel: {
    fontSize: 11,
    color: colors.textLight,
    marginBottom: 4,
  },
  phraseJaText: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '500',
    lineHeight: 22,
  },
  phraseLang: {
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  phraseLangCopied: {
    backgroundColor: '#ECFDF5',
    borderLeftColor: colors.secondary,
  },
  phraseLangText: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '600',
    lineHeight: 22,
  },
  separator: {
    height: 12,
  },
});
