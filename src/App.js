import { useState, useEffect, useRef } from "react";

// ─── CONTENT BY LEVEL ────────────────────────────────────────────────────────

const CONTENT = {
  A1: {
    color: "#4ade80",
    accent: "#166534",
    label: "Boshlang'ich",
    emoji: "🌱",
    words: [
      { word: "Hello", meaning: "Salom", example: "Hello! How are you?", tip: "Eng asosiy so'rov" },
      { word: "Thank you", meaning: "Rahmat", example: "Thank you very much!", tip: "Minnatdorchilik bildirish" },
      { word: "Family", meaning: "Oila", example: "My family is big.", tip: "Oila a'zolari haqida gapirganda" },
      { word: "House", meaning: "Uy", example: "This is my house.", tip: "Yashash joyi" },
      { word: "Food", meaning: "Ovqat", example: "I like this food.", tip: "Taom haqida gapirganda" },
      { word: "Water", meaning: "Suv", example: "I drink water every day.", tip: "Eng zarur so'z" },
      { word: "Work", meaning: "Ish", example: "I go to work at 8.", tip: "Kasb-kor haqida" },
      { word: "Friend", meaning: "Do'st", example: "She is my best friend.", tip: "Munosabat so'zi" },
      { word: "Happy", meaning: "Xursand", example: "I am very happy today.", tip: "His-tuyg'u bildirish" },
      { word: "Beautiful", meaning: "Go'zal", example: "What a beautiful day!", tip: "Tavsif berish" },
    ],
    grammar: [
      { q: "I ___ a student.", opts: ["am", "is", "are", "be"], ans: 0, exp: "'I' bilan 'am' ishlatiladi — bu to be fe'lining birinchi shaxsidir." },
      { q: "She ___ a teacher.", opts: ["am", "is", "are", "be"], ans: 1, exp: "She/He/It bilan 'is' ishlatiladi." },
      { q: "They ___ happy.", opts: ["am", "is", "are", "be"], ans: 2, exp: "We/You/They bilan 'are' ishlatiladi." },
      { q: "I ___ tea every morning.", opts: ["drink", "drinks", "drinking", "drank"], ans: 0, exp: "Present Simple: I bilan fe'l o'zgarmaydi." },
      { q: "This is ___ apple.", opts: ["a", "an", "the", "—"], ans: 1, exp: "Unli tovush bilan boshlangan so'z oldida 'an' ishlatiladi." },
    ],
    quiz: [
      { q: "'Thank you' so'zining ma'nosi?", opts: ["Xayr", "Rahmat", "Salom", "Iltimos"], ans: 1 },
      { q: "Oilani inglizcha nima deyiladi?", opts: ["Friend", "House", "Family", "Food"], ans: 2 },
      { q: "To'g'ri jumlani toping:", opts: ["I is happy", "I are happy", "I am happy", "I be happy"], ans: 2 },
      { q: "'Beautiful' nima demak?", opts: ["Katta", "Go'zal", "Tez", "Qiziq"], ans: 1 },
      { q: "Qaysi biri to'g'ri?", opts: ["She drink tea", "She drinks tea", "She drinking tea", "She drank tea"], ans: 1 },
    ],
    chatPrompt: "You are a friendly English tutor for absolute beginners (A1 level) from Uzbekistan. Use very simple English with Uzbek translations for every English word or phrase. Speak slowly and clearly. Use basic vocabulary only. Encourage the student a lot with emojis. If they make mistakes, gently correct them and explain in Uzbek.",
  },
  A2: {
    color: "#60a5fa",
    accent: "#1e3a5f",
    label: "Boshlang'ich+",
    emoji: "🌿",
    words: [
      { word: "Describe", meaning: "Tasvirlamoq", example: "Can you describe your city?", tip: "Tavsif so'rash uchun" },
      { word: "Journey", meaning: "Sayohat, yo'l", example: "The journey took 3 hours.", tip: "Travel so'ziga o'xshash" },
      { word: "Opportunity", meaning: "Imkoniyat", example: "This is a great opportunity.", tip: "Chance so'ziga sinonim" },
      { word: "Suggest", meaning: "Taklif qilmoq", example: "I suggest we leave early.", tip: "Maslahat berish uchun" },
      { word: "Careful", meaning: "Ehtiyotkor", example: "Be careful on the road.", tip: "Ogohlantirish iborasi" },
      { word: "Probably", meaning: "Ehtimol", example: "It will probably rain today.", tip: "Taxmin bildirish" },
      { word: "Enough", meaning: "Yetarli", example: "I have enough money.", tip: "Miqdor bildirish" },
      { word: "Improve", meaning: "Yaxshilamoq", example: "Practice will improve your English.", tip: "Taraqqiyot haqida" },
      { word: "Remember", meaning: "Eslamoq", example: "Do you remember his name?", tip: "Xotira fe'li" },
      { word: "Explain", meaning: "Tushuntirmoq", example: "Please explain this rule.", tip: "Talabalar uchun muhim" },
    ],
    grammar: [
      { q: "I ___ TV when you called.", opts: ["watch", "watches", "was watching", "watched"], ans: 2, exp: "Past Continuous: o'tmishda davom etayotgan harakat. 'was/were + V-ing'" },
      { q: "___ you ever been to London?", opts: ["Did", "Do", "Have", "Are"], ans: 2, exp: "Present Perfect: 'Have you ever...' — hayotdagi tajriba haqida savol." },
      { q: "She ___ her keys. Now she can't find them.", opts: ["loses", "lost", "has lost", "lose"], ans: 2, exp: "Present Perfect: hozirgi natijaga ta'sir etuvchi o'tmish hodisa." },
      { q: "You should ___ more water.", opts: ["drink", "drinks", "drinking", "drank"], ans: 0, exp: "'Should' modal fe'lidan keyin infinitiv (V1) keladi." },
      { q: "This is the book ___ I told you about.", opts: ["who", "which", "what", "where"], ans: 1, exp: "Narsa/predmet uchun relative pronoun 'which' ishlatiladi." },
    ],
    quiz: [
      { q: "'Suggest' so'zining ma'nosi?", opts: ["So'ramoq", "Taklif qilmoq", "Rozi bo'lmoq", "Rad etmoq"], ans: 1 },
      { q: "Past Continuous qaysi?", opts: ["I watched", "I watch", "I was watching", "I have watched"], ans: 2 },
      { q: "'Probably' nima demak?", opts: ["Albatta", "Hech qachon", "Ehtimol", "Doim"], ans: 2 },
      { q: "To'g'ri jumlani toping:", opts: ["Have you ever go there?", "Have you ever been there?", "Did you ever been there?", "Were you ever go there?"], ans: 1 },
      { q: "'Improve' so'zi?", opts: ["Yomonlashtirmoq", "Saqlash", "Yaxshilamoq", "O'chirmoq"], ans: 2 },
    ],
    chatPrompt: "You are a friendly English tutor for elementary (A2 level) Uzbek students. Use simple English with occasional Uzbek explanations. Introduce new vocabulary in context. Gently correct grammar mistakes. Ask follow-up questions to keep conversation going. Use encouraging emojis.",
  },
  B1: {
    color: "#f59e0b",
    accent: "#78350f",
    label: "O'rta",
    emoji: "🌻",
    words: [
      { word: "Ambiguous", meaning: "Noaniq, ikki ma'noli", example: "The message was ambiguous.", tip: "Unclear bilan sinonim" },
      { word: "Elaborate", meaning: "Batafsil tushuntirmoq", example: "Can you elaborate on that?", tip: "Expand your answer deyarli bir xil" },
      { word: "Inevitable", meaning: "Muqarrar", example: "Change is inevitable.", tip: "Can't be avoided — sinonim" },
      { word: "Perceive", meaning: "Idrok etmoq", example: "How do you perceive this?", tip: "Understand dan chuqurroq ma'no" },
      { word: "Substantial", meaning: "Muhim, sezilarli", example: "There was a substantial change.", tip: "Significant bilan sinonim" },
      { word: "Compromise", meaning: "Kelishuv", example: "We reached a compromise.", tip: "Win-win situation yaratish" },
      { word: "Dedicate", meaning: "Bag'ishlamoq", example: "She dedicated her life to art.", tip: "Devote bilan sinonim" },
      { word: "Persevere", meaning: "Qat'iyat bilan davom etmoq", example: "You must persevere.", tip: "Never give up — iborasi" },
      { word: "Contemplate", meaning: "Mushohada qilmoq", example: "I'm contemplating a change.", tip: "Think deeply about" },
      { word: "Eloquent", meaning: "Notiq, ravon so'zlovchi", example: "An eloquent speaker.", tip: "Speaking beautifully" },
    ],
    grammar: [
      { q: "If I ___ you, I would apologize.", opts: ["am", "was", "were", "be"], ans: 2, exp: "Second Conditional: hayoliy vaziyat. 'If + were' — hatto I bilan ham 'were' ishlatiladi." },
      { q: "By 2020, she ___ working there for 10 years.", opts: ["has been", "had been", "was", "is"], ans: 1, exp: "Past Perfect Continuous: o'tmishda davom etib kelgan harakat." },
      { q: "The report ___ by Friday.", opts: ["will finish", "will be finished", "finishes", "is finishing"], ans: 1, exp: "Future Passive: 'will be + V3' — birovlar tomonidan bajariladi." },
      { q: "I'm used to ___ early.", opts: ["wake", "woke", "waking", "woken"], ans: 2, exp: "'Be used to' + gerund (-ing). 'Used to' (odatda) va 'be used to' (odatlangan) farqi bor." },
      { q: "She wishes she ___ more time.", opts: ["has", "had", "have", "will have"], ans: 1, exp: "'Wish' + Past Simple: hozirgi voqelikka munosabat bildirish." },
    ],
    quiz: [
      { q: "'Ambiguous' so'zi?", opts: ["Aniq", "Noaniq", "Katta", "Tez"], ans: 1 },
      { q: "Second Conditional qaysi?", opts: ["If I will go", "If I go", "If I went, I would", "If I went, I will"], ans: 2 },
      { q: "'Inevitable' ma'nosi?", opts: ["Mumkin", "Muqarrar", "Imkonsiz", "Qiyin"], ans: 1 },
      { q: "To'g'ri Passive jumlani toping:", opts: ["The report will finish", "The report finishes", "The report will be finished", "The report finishing"], ans: 2 },
      { q: "'Persevere' nima demak?", opts: ["To'xtatmoq", "Boshlash", "Qat'iyat bilan davom etmoq", "O'zgarmoq"], ans: 2 },
    ],
    chatPrompt: "You are an English tutor for B1 (intermediate) level Uzbek students. Respond primarily in English but give Uzbek explanations for difficult grammar or vocabulary. Introduce idiomatic expressions. Discuss everyday topics. Correct mistakes with brief explanations. Be encouraging and use emojis.",
  },
  B2: {
    color: "#e879f9",
    accent: "#581c87",
    label: "O'rta-yuqori",
    emoji: "🌸",
    words: [
      { word: "Tenacious", meaning: "Qat'iyatli, qayshar", example: "A tenacious negotiator.", tip: "Persistent dan kuchliroq" },
      { word: "Nuance", meaning: "Nozik farq, qirra", example: "The nuance of the argument.", tip: "Subtle difference" },
      { word: "Pragmatic", meaning: "Amaliy, pragmatik", example: "A pragmatic approach.", tip: "Practical bilan yaqin" },
      { word: "Ambivalent", meaning: "Ikkilanayotgan", example: "I feel ambivalent about it.", tip: "Having mixed feelings" },
      { word: "Scrutinize", meaning: "Sinchkovlik bilan tekshirmoq", example: "Scrutinize the contract.", tip: "Examine very carefully" },
      { word: "Eloquence", meaning: "Notiqlik san'ati", example: "His eloquence won votes.", tip: "Eloquent otga aylanadi" },
      { word: "Discrepancy", meaning: "Tafovut, nomuvofiqlik", example: "A discrepancy in the data.", tip: "Inconsistency sinonimi" },
      { word: "Paramount", meaning: "Eng muhim, ustuvor", example: "Safety is paramount.", tip: "Of utmost importance" },
      { word: "Reciprocal", meaning: "O'zaro, ikki tomonlama", example: "A reciprocal agreement.", tip: "Mutual bilan sinonim" },
      { word: "Mitigate", meaning: "Yumshatmoq, kamaytirmoq", example: "Mitigate the risks.", tip: "Reduce/lessen sinonim" },
    ],
    grammar: [
      { q: "Had she known, she ___ differently.", opts: ["acted", "would act", "would have acted", "had acted"], ans: 2, exp: "Third Conditional: o'tmishdagi afsus. 'Had + V3 → would have + V3'" },
      { q: "The policy, ___ was controversial, passed.", opts: ["who", "that", "which", "what"], ans: 2, exp: "Non-defining relative clause: vergul bilan ajratilganda 'which' ishlatiladi, 'that' emas." },
      { q: "She ___ have known about it.", opts: ["must", "can", "should have", "ought"], ans: 0, exp: "'Must have + V3' — o'tmishdagi kuchli xulosa yoki ehtimol bildiradi." },
      { q: "Not only ___ he arrive late, he forgot the files.", opts: ["did", "had", "was", "has"], ans: 0, exp: "Inversion after 'Not only': 'Not only did + subject + verb' — ta'kidlash uchun." },
      { q: "I'd rather you ___ that in public.", opts: ["don't say", "didn't say", "won't say", "hadn't said"], ans: 1, exp: "'I'd rather + subject + Past Simple' — boshqa kishiga nisbatan xohish bildirish." },
    ],
    quiz: [
      { q: "'Nuance' so'zi nima demak?", opts: ["Katta farq", "Nozik farq/qirra", "Aniq ma'no", "Umumiy fikr"], ans: 1 },
      { q: "Third Conditional qaysi?", opts: ["If I go, I will", "If I went, I would", "If I had gone, I would have", "If I go, I would"], ans: 2 },
      { q: "'Paramount' ma'nosi?", opts: ["Kam muhim", "O'rtacha", "Eng muhim", "Noaniq"], ans: 2 },
      { q: "To'g'ri inversionni toping:", opts: ["Not only he was late", "Not only was he late", "Not only did he late", "Not only he did late"], ans: 1 },
      { q: "'Mitigate' so'zi?", opts: ["Kuchaytirmoq", "Yumshatmoq", "To'xtatmoq", "Boshlash"], ans: 1 },
    ],
    chatPrompt: "You are an English tutor for B2 (upper-intermediate) level Uzbek students. Converse almost entirely in English. Introduce advanced vocabulary, idioms, and collocations naturally. Discuss abstract topics: culture, society, career, global issues. Give concise grammar corrections inline. Challenge the student with follow-up questions. Use Uzbek only when explaining very complex grammar points.",
  },
  C1: {
    color: "#f87171",
    accent: "#7f1d1d",
    label: "Yuqori",
    emoji: "🔥",
    words: [
      { word: "Ephemeral", meaning: "O'tkinchi, qisqa umrli", example: "Fame is ephemeral.", tip: "Fleeting/transient sinonim" },
      { word: "Juxtapose", meaning: "Yonma-yon qo'yib taqqoslamoq", example: "Juxtapose the two styles.", tip: "Compare by placing side by side" },
      { word: "Axiom", meaning: "Aksiyoma, isbotlanmagan haqiqat", example: "A mathematical axiom.", tip: "Self-evident truth" },
      { word: "Vicarious", meaning: "Boshqa orqali his etilgan", example: "Vicarious pleasure.", tip: "Living through others' experience" },
      { word: "Sycophant", meaning: "Yolg'oqchi, xushomadgo'y", example: "Surrounded by sycophants.", tip: "Flatterer/yes-man" },
      { word: "Taciturn", meaning: "Kam so'z, jimjit", example: "A taciturn personality.", tip: "Reticent bilan sinonim" },
      { word: "Catharsis", meaning: "Ruhiy tozalanish", example: "The film provided catharsis.", tip: "Emotional release" },
      { word: "Obfuscate", meaning: "Chalkashtirib yubormoq", example: "Don't obfuscate the issue.", tip: "To deliberately confuse" },
      { word: "Sanguine", meaning: "Optimistik, umidvor", example: "A sanguine outlook.", tip: "Optimistic about outcome" },
      { word: "Equivocate", meaning: "Noaniq gapirmoq, bo'yin tovlamoq", example: "Politicians often equivocate.", tip: "Avoid committing to a clear answer" },
    ],
    grammar: [
      { q: "Rarely ___ such dedication in modern workplaces.", opts: ["we see", "do we see", "we do see", "see we"], ans: 1, exp: "Fronted negative adverb: 'Rarely/Seldom/Never + auxiliary + subject + verb' — kuchli ta'kid." },
      { q: "The data, ___ analyzed thoroughly, revealed flaws.", opts: ["having been", "being", "have been", "was"], ans: 0, exp: "Perfect participle passive: 'having been + V3' — parallel harakat, passiv shaklda." },
      { q: "It is high time we ___ this policy.", opts: ["revise", "revised", "will revise", "revising"], ans: 1, exp: "'It is high time + Past Subjunctive' — ish kech qolayotganini ta'kidlash." },
      { q: "She is said ___ the most brilliant scholar.", opts: ["being", "to be", "that she is", "she is"], ans: 1, exp: "Reporting verb + infinitive: 'is said to be' — xabar berish konstruksiyasi." },
      { q: "No sooner ___ arrived than trouble started.", opts: ["she had", "had she", "she has", "has she"], ans: 1, exp: "'No sooner had + subject + V3 + than' — inversion bilan ikki ketma-ket o'tmish hodisa." },
    ],
    quiz: [
      { q: "'Ephemeral' ma'nosi?", opts: ["Doimiy", "O'tkinchi", "Kuchli", "Noaniq"], ans: 1 },
      { q: "To'g'ri inversionni toping:", opts: ["Rarely we see this", "Rarely do we see this", "Rarely we do see this", "Rarely see we this"], ans: 1 },
      { q: "'Sycophant' so'zi?", opts: ["Donishmand", "Tanqidchi", "Yolg'oqchi", "Rahbar"], ans: 2 },
      { q: "'It is high time' dan keyin keladi:", opts: ["Present Simple", "Future", "Past Simple", "Infinitive"], ans: 2 },
      { q: "'Catharsis' nima demak?", opts: ["Ruhiy tozalanish", "Jismoniy mashq", "Aqliy tahlil", "Hissiy urilish"], ans: 0 },
    ],
    chatPrompt: "You are an advanced English tutor for C1 level Uzbek students. Converse entirely in English. Discuss sophisticated topics: philosophy, literature, global economics, abstract ideas. Use advanced vocabulary and complex grammar naturally. Point out subtle errors in word choice or register. Challenge with nuanced questions. Only use Uzbek if explaining an exceptionally complex linguistic concept.",
  },
};

// ─── ONBOARDING ───────────────────────────────────────────────────────────────

const LEVELS = [
  { id: "A1", label: "A1", sublabel: "Boshlang'ich", desc: "Salom, men, oila — eng asosiy so'zlar", emoji: "🌱", color: "#4ade80" },
  { id: "A2", label: "A2", sublabel: "Boshlang'ich+", desc: "Kichik suhbatlar, oddiy grammatika", emoji: "🌿", color: "#60a5fa" },
  { id: "B1", label: "B1", sublabel: "O'rta", desc: "Erkin suhbat, murakkab mavzular", emoji: "🌻", color: "#f59e0b" },
  { id: "B2", label: "B2", sublabel: "O'rta-yuqori", desc: "Professional muloqot, idiomalar", emoji: "🌸", color: "#e879f9" },
  { id: "C1", label: "C1", sublabel: "Yuqori", desc: "Akademik inglizcha, murakkab grammatika", emoji: "🔥", color: "#f87171" },
];

function Onboarding({ onSelect }) {
  const [hoveredLevel, setHoveredLevel] = useState(null);
  const [selected, setSelected] = useState(null);
  const [animIn, setAnimIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimIn(true), 50);
  }, []);

  const handleSelect = (id) => {
    setSelected(id);
    setTimeout(() => onSelect(id), 600);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 30% 20%, #0d1b2a 0%, #0a0a1a 60%, #050510 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "32px 20px",
      fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Background stars */}
      {[...Array(30)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: Math.random() * 2 + 1,
          height: Math.random() * 2 + 1,
          background: "#fff",
          borderRadius: "50%",
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.5 + 0.1,
          animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
        }} />
      ))}

      <style>{`
        @keyframes twinkle { 0%,100%{opacity:0.1} 50%{opacity:0.7} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
      `}</style>

      {/* Logo */}
      <div style={{
        animation: animIn ? "fadeUp 0.8s ease forwards" : "none",
        opacity: 0,
        textAlign: "center",
        marginBottom: 48,
      }}>
        <div style={{ fontSize: 52, marginBottom: 8, filter: "drop-shadow(0 0 20px rgba(255,255,255,0.3))" }}>🇬🇧</div>
        <div style={{
          fontSize: 38,
          fontWeight: "bold",
          background: "linear-gradient(135deg, #fff 20%, #a78bfa 60%, #60a5fa 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundSize: "200% auto",
          animation: "shimmer 4s linear infinite",
          letterSpacing: 2,
        }}>
          EnglishPro
        </div>
        <div style={{ color: "#6b7ea3", fontSize: 15, marginTop: 6, letterSpacing: 1 }}>
          O'zbek tilida ingliz tili kursi
        </div>
      </div>

      {/* Question */}
      <div style={{
        animation: animIn ? "fadeUp 0.8s 0.2s ease forwards" : "none",
        opacity: 0,
        textAlign: "center",
        marginBottom: 32,
      }}>
        <div style={{ fontSize: 20, color: "#e2e8f0", fontWeight: "bold", marginBottom: 6 }}>
          Sizning inglizcha darajangiz qanday?
        </div>
        <div style={{ fontSize: 13, color: "#64748b" }}>
          Darajangizga mos mashqlar taklif qilinadi
        </div>
      </div>

      {/* Level Cards */}
      <div style={{ width: "100%", maxWidth: 480, display: "flex", flexDirection: "column", gap: 12 }}>
        {LEVELS.map((lv, i) => (
          <div
            key={lv.id}
            onClick={() => handleSelect(lv.id)}
            onMouseEnter={() => setHoveredLevel(lv.id)}
            onMouseLeave={() => setHoveredLevel(null)}
            style={{
              animation: animIn ? `fadeUp 0.6s ${0.3 + i * 0.1}s ease forwards` : "none",
              opacity: 0,
              background: selected === lv.id
                ? `linear-gradient(135deg, ${lv.color}30, ${lv.color}15)`
                : hoveredLevel === lv.id
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(255,255,255,0.04)",
              border: selected === lv.id
                ? `1.5px solid ${lv.color}`
                : hoveredLevel === lv.id
                  ? "1.5px solid rgba(255,255,255,0.2)"
                  : "1.5px solid rgba(255,255,255,0.07)",
              borderRadius: 16,
              padding: "18px 22px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 16,
              transition: "all 0.25s ease",
              transform: selected === lv.id ? "scale(1.02)" : hoveredLevel === lv.id ? "translateX(4px)" : "none",
              backdropFilter: "blur(10px)",
            }}
          >
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: `${lv.color}20`,
              border: `1px solid ${lv.color}50`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, flexShrink: 0,
            }}>
              {lv.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3 }}>
                <span style={{
                  color: lv.color, fontWeight: "bold", fontSize: 18,
                  textShadow: selected === lv.id ? `0 0 20px ${lv.color}80` : "none",
                }}>
                  {lv.label}
                </span>
                <span style={{ color: "#94a3b8", fontSize: 14 }}>{lv.sublabel}</span>
              </div>
              <div style={{ color: "#64748b", fontSize: 13 }}>{lv.desc}</div>
            </div>
            <div style={{
              color: selected === lv.id ? lv.color : "#334155",
              fontSize: 20, transition: "all 0.2s",
              transform: selected === lv.id ? "translateX(4px)" : "none",
            }}>→</div>
          </div>
        ))}
      </div>

      <div style={{
        animation: animIn ? "fadeUp 0.6s 0.9s ease forwards" : "none",
        opacity: 0,
        marginTop: 28, color: "#334155", fontSize: 12, textAlign: "center",
      }}>
        Keyinchalik darajangizni o'zgartirish mumkin
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [level, setLevel] = useState(null);
  const [tab, setTab] = useState("flashcard");

  // Flashcard state
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState([]);

  // Grammar state
  const [gIdx, setGIdx] = useState(0);
  const [gSel, setGSel] = useState(null);
  const [gScore, setGScore] = useState(0);
  const [gDone, setGDone] = useState(false);

  // Quiz state
  const [qIdx, setQIdx] = useState(0);
  const [qSel, setQSel] = useState(null);
  const [qScore, setQScore] = useState(0);
  const [qDone, setQDone] = useState(false);

  // Chat state
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleLevelSelect = (lvl) => {
    setLevel(lvl);
    setCardIndex(0); setFlipped(false); setKnown([]);
    setGIdx(0); setGSel(null); setGScore(0); setGDone(false);
    setQIdx(0); setQSel(null); setQScore(0); setQDone(false);
    const greet = `Salom! Men sizning ${CONTENT[lvl].label} darajasidagi ingliz tili murabbiyingizman ${CONTENT[lvl].emoji}. Mashqni boshlaylikmi?`;
    setMessages([{ role: "assistant", content: greet }]);
    setTab("flashcard");
  };

  const changeLevel = () => setLevel(null);

  if (!level) return <Onboarding onSelect={handleLevelSelect} />;

  const C = CONTENT[level];
  const card = C.words[cardIndex];
  const gq = C.grammar[gIdx];
  const qq = C.quiz[qIdx];

  const nextCard = (isKnown) => {
    if (isKnown) setKnown(k => [...k, cardIndex]);
    setFlipped(false);
    setTimeout(() => setCardIndex(i => (i + 1) % C.words.length), 120);
  };

  const handleGrammar = (i) => {
    if (gSel !== null) return;
    setGSel(i);
    if (i === gq.ans) setGScore(s => s + 1);
  };

  const nextGrammar = () => {
    if (gIdx + 1 >= C.grammar.length) { setGDone(true); return; }
    setGIdx(i => i + 1); setGSel(null);
  };

  const handleQuiz = (i) => {
    if (qSel !== null) return;
    setQSel(i);
    if (i === qq.ans) setQScore(s => s + 1);
  };

  const nextQuiz = () => {
    if (qIdx + 1 >= C.quiz.length) { setQDone(true); return; }
    setQIdx(i => i + 1); setQSel(null);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
headers: { "Content-Type": "application/json", "Authorization": "Bearer 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" },
        body: JSON.stringify({
          model: "openrouter/free",
          max_tokens: 1000,
          system: C.chatPrompt,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "Xatolik yuz berdi.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages(m => [...m, { role: "assistant", content: "Tarmoq xatosi. Qayta urinib ko'ring." }]);
    }
    setLoading(false);
  };

  const tabs = [
    { id: "flashcard", label: "📚 So'zlar" },
    { id: "grammar", label: "✏️ Grammatika" },
    { id: "chat", label: "💬 AI Tutor" },
    { id: "quiz", label: "🏆 Test" },
  ];

  const scoreEmoji = (s, total) => {
    const pct = s / total;
    if (pct === 1) return "🏆 Mukammal!";
    if (pct >= 0.8) return "🌟 Ajoyib!";
    if (pct >= 0.6) return "👍 Yaxshi!";
    return "💪 Davom eting!";
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080818",
      fontFamily: "'Palatino Linotype', Palatino, serif",
      color: "#e2e8f0",
    }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cardFlip { from{transform:rotateY(0)} to{transform:rotateY(180deg)} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 2px; }
      `}</style>

      {/* Header */}
      <div style={{
        background: "rgba(8,8,24,0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${C.color}30`,
        padding: "14px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>🇬🇧</span>
          <div>
            <div style={{ fontSize: 17, fontWeight: "bold", color: "#f1f5f9", letterSpacing: 0.5 }}>EnglishPro</div>
            <div style={{ fontSize: 11, color: C.color }}>{C.emoji} {C.label} daraja</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            background: `${C.color}20`, border: `1px solid ${C.color}50`,
            borderRadius: 20, padding: "5px 12px", fontSize: 12, color: C.color,
          }}>
            ✓ {known.length} so'z
          </div>
          <button onClick={changeLevel} style={{
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 10, padding: "6px 12px", color: "#64748b", fontSize: 12, cursor: "pointer",
          }}>
            Daraja
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex", background: "#0d0d1f",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, padding: "12px 4px",
            background: "transparent", border: "none",
            borderBottom: tab === t.id ? `2px solid ${C.color}` : "2px solid transparent",
            color: tab === t.id ? C.color : "#475569",
            cursor: "pointer", fontSize: 12, fontWeight: tab === t.id ? "bold" : "normal",
            transition: "all 0.2s", fontFamily: "inherit",
          }}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding: "24px 20px", maxWidth: 560, margin: "0 auto" }}>

        {/* ── FLASHCARDS ── */}
        {tab === "flashcard" && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            {/* Progress bar */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#475569", marginBottom: 6 }}>
                <span>{cardIndex + 1} / {C.words.length}</span>
                <span style={{ color: C.color }}>{card.level || level}</span>
              </div>
              <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
                <div style={{
                  height: "100%", borderRadius: 2,
                  width: `${((cardIndex + 1) / C.words.length) * 100}%`,
                  background: `linear-gradient(90deg, ${C.color}80, ${C.color})`,
                  transition: "width 0.4s ease",
                }} />
              </div>
            </div>

            {/* Card */}
            <div onClick={() => setFlipped(!flipped)} style={{
              background: flipped
                ? `linear-gradient(135deg, ${C.color}12, rgba(255,255,255,0.03))`
                : "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
              border: `1px solid ${flipped ? C.color + "50" : "rgba(255,255,255,0.08)"}`,
              borderRadius: 22, padding: "44px 28px",
              textAlign: "center", cursor: "pointer",
              minHeight: 240, display: "flex", flexDirection: "column",
              justifyContent: "center", alignItems: "center",
              boxShadow: flipped ? `0 0 40px ${C.color}15` : "0 20px 60px rgba(0,0,0,0.4)",
              transition: "all 0.35s ease",
            }}>
              {!flipped ? (
                <>
                  <div style={{ fontSize: 40, fontWeight: "bold", color: C.color, letterSpacing: 2, marginBottom: 12 }}>
                    {card.word}
                  </div>
                  <div style={{ color: "#334155", fontSize: 13 }}>👆 Bosing — tarjimani ko'ring</div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 26, color: "#f1f5f9", fontWeight: "bold", marginBottom: 14 }}>
                    {card.meaning}
                  </div>
                  <div style={{
                    background: "rgba(255,255,255,0.04)", borderRadius: 14,
                    padding: "12px 18px", fontSize: 14, color: "#94a3b8",
                    fontStyle: "italic", marginBottom: 12,
                  }}>
                    "{card.example}"
                  </div>
                  <div style={{
                    background: `${C.color}15`, borderRadius: 10,
                    padding: "8px 14px", fontSize: 12, color: C.color,
                  }}>
                    💡 {card.tip}
                  </div>
                </>
              )}
            </div>

            {flipped ? (
              <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
                <button onClick={() => nextCard(false)} style={{
                  flex: 1, padding: "15px", borderRadius: 16,
                  background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
                  color: "#f87171", fontSize: 15, cursor: "pointer", fontFamily: "inherit", fontWeight: "bold",
                }}>
                  😕 Bilmadim
                </button>
                <button onClick={() => nextCard(true)} style={{
                  flex: 1, padding: "15px", borderRadius: 16,
                  background: `${C.color}15`, border: `1px solid ${C.color}50`,
                  color: C.color, fontSize: 15, cursor: "pointer", fontFamily: "inherit", fontWeight: "bold",
                }}>
                  ✅ Bildim!
                </button>
              </div>
            ) : (
              <button onClick={() => nextCard(false)} style={{
                width: "100%", marginTop: 14, padding: "13px",
                borderRadius: 14, background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#475569", cursor: "pointer", fontFamily: "inherit", fontSize: 14,
              }}>
                O'tkazib yuborish →
              </button>
            )}
          </div>
        )}

        {/* ── GRAMMAR ── */}
        {tab === "grammar" && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            {gDone ? (
              <div style={{ textAlign: "center", padding: "50px 20px" }}>
                <div style={{ fontSize: 70, marginBottom: 16 }}>
                  {gScore >= 4 ? "🎉" : gScore >= 3 ? "👍" : "📚"}
                </div>
                <div style={{ fontSize: 30, fontWeight: "bold", color: C.color, marginBottom: 8 }}>
                  {gScore}/{C.grammar.length} ball
                </div>
                <div style={{ color: "#64748b", fontSize: 16, marginBottom: 28 }}>
                  {scoreEmoji(gScore, C.grammar.length)}
                </div>
                <button onClick={() => { setGIdx(0); setGSel(null); setGScore(0); setGDone(false); }} style={{
                  padding: "14px 36px", borderRadius: 16,
                  background: `linear-gradient(135deg, ${C.color}, ${C.color}80)`,
                  border: "none", color: "#fff", fontSize: 16, cursor: "pointer", fontFamily: "inherit",
                }}>
                  🔄 Qayta boshlash
                </button>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#475569", marginBottom: 14 }}>
                  <span>Savol {gIdx + 1}/{C.grammar.length}</span>
                  <span style={{ color: C.color }}>✓ {gScore} to'g'ri</span>
                </div>
                <div style={{
                  background: "rgba(255,255,255,0.03)", border: `1px solid ${C.color}30`,
                  borderRadius: 18, padding: "26px 22px", marginBottom: 18,
                  fontSize: 19, lineHeight: 1.6, color: "#f1f5f9",
                }}>
                  {gq.q}
                </div>
                {gq.opts.map((opt, i) => {
                  let bg = "rgba(255,255,255,0.03)";
                  let bd = "rgba(255,255,255,0.08)";
                  let cl = "#cbd5e1";
                  if (gSel !== null) {
                    if (i === gq.ans) { bg = "rgba(74,222,128,0.12)"; bd = "rgba(74,222,128,0.5)"; cl = "#4ade80"; }
                    else if (i === gSel) { bg = "rgba(239,68,68,0.12)"; bd = "rgba(239,68,68,0.5)"; cl = "#f87171"; }
                  } else if (gSel === null) {
                    // hover handled via state would require more code, keeping simple
                  }
                  return (
                    <button key={i} onClick={() => handleGrammar(i)} style={{
                      width: "100%", padding: "15px 20px", marginBottom: 10,
                      borderRadius: 14, background: bg, border: `1px solid ${bd}`,
                      color: cl, textAlign: "left", cursor: gSel === null ? "pointer" : "default",
                      fontSize: 15, fontFamily: "inherit", transition: "all 0.2s",
                    }}>
                      <span style={{ color: "#475569", marginRight: 8 }}>{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </button>
                  );
                })}
                {gSel !== null && (
                  <>
                    <div style={{
                      background: `${C.color}0f`, border: `1px solid ${C.color}30`,
                      borderRadius: 14, padding: "14px 18px", marginBottom: 14,
                      color: "#94a3b8", fontSize: 13, lineHeight: 1.6,
                    }}>
                      💡 <strong style={{ color: C.color }}>Izoh:</strong> {gq.exp}
                    </div>
                    <button onClick={nextGrammar} style={{
                      width: "100%", padding: "15px", borderRadius: 16,
                      background: `linear-gradient(135deg, ${C.color}cc, ${C.color}80)`,
                      border: "none", color: "#fff", fontSize: 16, cursor: "pointer", fontFamily: "inherit",
                    }}>
                      Keyingisi →
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        )}

        {/* ── CHAT ── */}
        {tab === "chat" && (
          <div style={{ animation: "fadeUp 0.4s ease", display: "flex", flexDirection: "column", height: "calc(100vh - 180px)" }}>
            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, paddingBottom: 12 }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  {m.role === "assistant" && (
                    <div style={{ width: 30, height: 30, borderRadius: 10, background: `${C.color}20`, border: `1px solid ${C.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, marginRight: 8, flexShrink: 0, marginTop: 4 }}>
                      {C.emoji}
                    </div>
                  )}
                  <div style={{
                    maxWidth: "78%",
                    background: m.role === "user"
                      ? `linear-gradient(135deg, ${C.color}cc, ${C.color}90)`
                      : "rgba(255,255,255,0.05)",
                    borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    padding: "12px 16px", fontSize: 14, lineHeight: 1.65,
                    border: m.role === "assistant" ? "1px solid rgba(255,255,255,0.07)" : "none",
                    color: m.role === "user" ? "#fff" : "#cbd5e1",
                    whiteSpace: "pre-wrap",
                  }}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: "flex" }}>
                  <div style={{ width: 30, height: 30, borderRadius: 10, background: `${C.color}20`, border: `1px solid ${C.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, marginRight: 8 }}>
                    {C.emoji}
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "18px 18px 18px 4px", padding: "14px 18px", color: "#475569", fontSize: 14 }}>
                    ✍️ Yozilmoqda...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 14, display: "flex", gap: 10 }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
                placeholder="Inglizcha yoki o'zbekcha yozing..."
                style={{
                  flex: 1, padding: "14px 18px", borderRadius: 16,
                  background: "rgba(255,255,255,0.05)", border: `1px solid ${C.color}40`,
                  color: "#f1f5f9", fontSize: 14, outline: "none", fontFamily: "inherit",
                }}
              />
              <button onClick={sendMessage} disabled={loading} style={{
                padding: "14px 18px", borderRadius: 16,
                background: `linear-gradient(135deg, ${C.color}cc, ${C.color}80)`,
                border: "none", color: "#fff", cursor: "pointer", fontSize: 18, flexShrink: 0,
              }}>
                ➤
              </button>
            </div>
          </div>
        )}

        {/* ── QUIZ ── */}
        {tab === "quiz" && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            {qDone ? (
              <div style={{ textAlign: "center", padding: "50px 20px" }}>
                <div style={{ fontSize: 70, marginBottom: 16 }}>
                  {qScore === C.quiz.length ? "🏆" : qScore >= 3 ? "🥈" : "📖"}
                </div>
                <div style={{ fontSize: 30, fontWeight: "bold", color: C.color, marginBottom: 8 }}>
                  {qScore}/{C.quiz.length} ball
                </div>
                <div style={{ color: "#64748b", fontSize: 16, marginBottom: 10 }}>
                  {scoreEmoji(qScore, C.quiz.length)}
                </div>
                <div style={{ color: "#334155", fontSize: 13, marginBottom: 28 }}>
                  {level} daraja • {C.label}
                </div>
                <button onClick={() => { setQIdx(0); setQSel(null); setQScore(0); setQDone(false); }} style={{
                  padding: "14px 36px", borderRadius: 16,
                  background: `linear-gradient(135deg, ${C.color}, ${C.color}80)`,
                  border: "none", color: "#fff", fontSize: 16, cursor: "pointer", fontFamily: "inherit",
                }}>
                  🔄 Qayta boshlash
                </button>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#475569", marginBottom: 14 }}>
                  <span>Savol {qIdx + 1}/{C.quiz.length}</span>
                  <span style={{ color: C.color }}>🏆 {qScore} ball</span>
                </div>
                <div style={{ height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, marginBottom: 18 }}>
                  <div style={{
                    height: "100%", borderRadius: 2,
                    width: `${((qIdx) / C.quiz.length) * 100}%`,
                    background: `linear-gradient(90deg, ${C.color}80, ${C.color})`,
                    transition: "width 0.4s",
                  }} />
                </div>
                <div style={{
                  background: "rgba(255,255,255,0.03)", border: `1px solid ${C.color}30`,
                  borderRadius: 18, padding: "26px 22px", marginBottom: 18,
                  fontSize: 18, lineHeight: 1.6, color: "#f1f5f9",
                }}>
                  {qq.q}
                </div>
                {qq.opts.map((opt, i) => {
                  let bg = "rgba(255,255,255,0.03)";
                  let bd = "rgba(255,255,255,0.08)";
                  let cl = "#cbd5e1";
                  if (qSel !== null) {
                    if (i === qq.ans) { bg = "rgba(74,222,128,0.12)"; bd = "rgba(74,222,128,0.5)"; cl = "#4ade80"; }
                    else if (i === qSel) { bg = "rgba(239,68,68,0.12)"; bd = "rgba(239,68,68,0.5)"; cl = "#f87171"; }
                  }
                  return (
                    <button key={i} onClick={() => handleQuiz(i)} style={{
                      width: "100%", padding: "15px 20px", marginBottom: 10,
                      borderRadius: 14, background: bg, border: `1px solid ${bd}`,
                      color: cl, textAlign: "left", cursor: qSel === null ? "pointer" : "default",
                      fontSize: 15, fontFamily: "inherit", transition: "all 0.2s",
                    }}>
                      <span style={{ color: "#475569", marginRight: 8 }}>{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </button>
                  );
                })}
                {qSel !== null && (
                  <button onClick={nextQuiz} style={{
                    width: "100%", marginTop: 6, padding: "15px", borderRadius: 16,
                    background: `linear-gradient(135deg, ${C.color}cc, ${C.color}80)`,
                    border: "none", color: "#fff", fontSize: 16, cursor: "pointer", fontFamily: "inherit",
                  }}>
                    Keyingisi →
                  </button>
                )}
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
