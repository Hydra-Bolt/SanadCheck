export interface GlossaryItem {
  term: string;
  definition: string;
  arabic?: string;
  category: "hadith" | "rijal" | "technical" | "general";
  relatedTerms?: string[];
}

const glossaryData: GlossaryItem[] = [
  {
    term: "Sanad",
    arabic: "سند",
    definition:
      "The chain of transmission for a hadith, listing all the narrators who transmitted the saying, action, or approval from the Prophet (peace be upon him) down to the compiler of the hadith collection.",
    category: "hadith",
    relatedTerms: ["Isnad", "Rijal", "Hadith"],
  },
  {
    term: "Isnad",
    arabic: "إسناد",
    definition:
      "Another term for sanad; the chain of authorities or narrators through which a hadith has been transmitted.",
    category: "hadith",
    relatedTerms: ["Sanad", "Matn"],
  },
  {
    term: "Matn",
    arabic: "متن",
    definition:
      "The actual text or content of a hadith, as opposed to its chain of transmission (sanad).",
    category: "hadith",
    relatedTerms: ["Sanad", "Hadith"],
  },
  {
    term: "Rijal",
    arabic: "رجال",
    definition:
      "The science of studying the narrators of hadith, including their biographical details, reliability, and trustworthiness. Also refers to the narrators themselves.",
    category: "rijal",
    relatedTerms: ["Jarh wa Ta'dil", "Thiqah", "Da'if"],
  },
  {
    term: "Thiqah",
    arabic: "ثقة",
    definition:
      "A reliable and trustworthy narrator whose reports are accepted. This is the highest grade of narrator reliability in hadith criticism.",
    category: "rijal",
    relatedTerms: ["Rijal", "Saduq", "Da'if"],
  },
  {
    term: "Da'if",
    arabic: "ضعيف",
    definition:
      "A weak narrator or hadith that fails to meet the standards of authenticity due to issues with the chain of transmission or the narrators involved.",
    category: "rijal",
    relatedTerms: ["Thiqah", "Hasan", "Sahih"],
  },
  {
    term: "Sahih",
    arabic: "صحيح",
    definition:
      "An authentic hadith that meets all the criteria for acceptance: continuous chain, reliable narrators, no hidden defects, and no contradiction with established sources.",
    category: "hadith",
    relatedTerms: ["Hasan", "Da'if", "Thiqah"],
  },
  {
    term: "Hasan",
    arabic: "حسن",
    definition:
      "A good hadith that meets most criteria for authenticity but may have slightly less rigorous transmission standards than sahih hadith.",
    category: "hadith",
    relatedTerms: ["Sahih", "Da'if", "Rijal"],
  },
  {
    term: "Jarh wa Ta'dil",
    arabic: "جرح وتعديل",
    definition:
      "The science of criticism and authentication of hadith narrators, involving the evaluation of their character, memory, accuracy, and reliability.",
    category: "rijal",
    relatedTerms: ["Rijal", "Thiqah", "Da'if"],
  },
  {
    term: "Mursal",
    arabic: "مرسل",
    definition:
      "A hadith where a successor (tabi'i) reports directly from the Prophet without mentioning the companion who transmitted it to them.",
    category: "hadith",
    relatedTerms: ["Muttasil", "Munqati", "Sanad"],
  },
  {
    term: "Muttasil",
    arabic: "متصل",
    definition:
      "A hadith with an unbroken chain of transmission where each narrator clearly received the report from their immediate predecessor.",
    category: "hadith",
    relatedTerms: ["Mursal", "Munqati", "Sanad"],
  },
  {
    term: "Munqati",
    arabic: "منقطع",
    definition:
      "A hadith with a broken chain of transmission where one or more narrators are missing from the sequence.",
    category: "hadith",
    relatedTerms: ["Muttasil", "Mursal", "Sanad"],
  },
  {
    term: "Tabi'i",
    arabic: "تابعي",
    definition:
      "A successor; someone who met and learned from the companions of the Prophet but did not meet the Prophet himself.",
    category: "general",
    relatedTerms: ["Sahabi", "Tabi' al-Tabi'i"],
  },
  {
    term: "Sahabi",
    arabic: "صحابي",
    definition:
      "A companion of the Prophet; someone who met the Prophet, believed in him, and died as a Muslim.",
    category: "general",
    relatedTerms: ["Tabi'i", "Hadith"],
  },
  {
    term: "Matruk",
    arabic: "متروك",
    definition:
      "A narrator whose reports are abandoned or rejected due to severe reliability issues, lying, or gross errors.",
    category: "rijal",
    relatedTerms: ["Da'if", "Majhul", "Rijal"],
  },
  {
    term: "Majhul",
    arabic: "مجهول",
    definition:
      "An unknown narrator about whom insufficient information is available to determine their reliability.",
    category: "rijal",
    relatedTerms: ["Matruk", "Thiqah", "Rijal"],
  },
  {
    term: "Tadlis",
    arabic: "تدليس",
    definition:
      "A practice where a narrator conceals a weakness in their chain by omitting a narrator or using ambiguous language.",
    category: "technical",
    relatedTerms: ["Sanad", "Rijal"],
  },
  {
    term: "Shudhudh",
    arabic: "شذوذ",
    definition:
      "An anomalous or irregular report that contradicts more reliable narrations, making it unacceptable despite having a strong chain.",
    category: "technical",
    relatedTerms: ["Sahih", "Shadh", "Hadith"],
  },
  {
    term: "Illa",
    arabic: "علة",
    definition:
      "A hidden defect in a hadith that affects its authenticity, discovered through detailed analysis by experts.",
    category: "technical",
    relatedTerms: ["Sahih", "Hadith", "Rijal"],
  },
  {
    term: "Fiqh al-Hadith",
    arabic: "فقه الحديث",
    definition:
      "The understanding and interpretation of hadith texts to derive legal and religious rulings.",
    category: "general",
    relatedTerms: ["Hadith", "Matn", "Fiqh"],
  },
];

export default glossaryData;
