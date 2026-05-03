import { LanguageLocales, type UserRole, type PredictionRawOutput, type PredictionEntry } from "@/shared/types";
import {
  Shovel,
  Syringe,
  Users,
  MapPinned,
  PawPrint,
  ScanHeart,
  Activity,
  MapPin,
  Map,
  ScanEye,
  Palette,
  FolderCog,
  UserCog,
  Sun,
  Moon,
  Laptop,
  Stethoscope,
  Beaker,
  UserCheck,
  UserPlus,
  Box,
  ClipboardList,
  Network,
  Waves,
  ListChecks,
  Wind,
  Shapes,
  Gauge,
  Droplets,
  Sparkles,
  PlusIcon,
  FileText,
  BarChart2,
} from "lucide-react";

export const REACT_QUERY_STALE_TIME = 20 * 60 * 1000; // 20 minutes

export const TABLE_QUERY_PARAMS = {
  PAGE: "page",
  SEARCH: "search",
  PER_PAGE: "perPage",
};

export const THEMES = [
  { name: "light", icon: Sun },
  { name: "dark", icon: Moon },
  { name: "system", icon: Laptop },
];

export const LOCALES = [
  { name: "O'zbek", locale: "uz" },
  { name: "Русский", locale: "ru" },
];

export const GENDERS = [
  { uz: "Erkak", ru: "Мужской", value: "MALE" },
  { uz: "Urgochi", ru: "Женский", value: "FEMALE" },
];

export const COMMON_LABELS = {
  CLOSE: { ru: "Закрыть", uz: "Yopish" },
};

export const ALERT_MESSAGES = {
  DATA_CREATED: {
    ru: "Данные успешно созданы!",
    uz: "Ma'lumot muvaffaqiyatli yaratildi!",
  },
  DATA_UPDATED: {
    ru: "Данные успешно обновлены!",
    uz: "Ma'lumot muvaffaqiyatli yangilandi!",
  },
  DATA_DELETED: {
    ru: "Данные успешно удалены!",
    uz: "Ma'lumot muvaffaqiyatli o'chirildi!",
  },
  DATA_NOT_FOUND: { ru: "Данные не найдены!", uz: "Ma'lumot topilmadi!" },
  INVALID_INPUT: {
    ru: "Введенные данные некорректны!",
    uz: "Kiritilgan ma'lumot noto'g'ri!",
  },
  ACCESS_DENIED: { ru: "Доступ запрещен!", uz: "Kirish taqiqlangan!" },
  LOGIN_SUCCESS: { ru: "Успешный вход!", uz: "Muvaffaqiyatli kirildi!" },
  LOGIN_FAILED: {
    ru: "Логин или пароль неверны!",
    uz: "Login yoki parol noto'g'ri!",
  },
  PERMISSION_REQUIRED: {
    ru: "Требуется разрешение!",
    uz: "Ruxsat talab qilinadi!",
  },
  SERVER_ERROR: {
    ru: "Произошла ошибка на сервере!",
    uz: "Serverda xatolik yuz berdi!",
  },
  OPERATION_FAILED: { ru: "Операция не выполнена!", uz: "Amal bajarilmadi!" },
  OPERATION_SUCCESS: {
    ru: "Операция выполнена успешно!",
    uz: "Amal muvaffaqiyatli bajarildi!",
  },
  LOADING: { ru: "Загрузка...", uz: "Yuklanmoqda..." },
  SAVING: { ru: "Сохранение...", uz: "Saqlanmoqda..." },
  UPLOADING: { ru: "Загрузка...", uz: "Yuklanmoqda..." },
  NO_DATA: { ru: "Данные отсутствуют!", uz: "Ma'lumot mavjud emas!" },
  DELETE_CONFIRM: {
    ru: "Вы уверены, что хотите удалить эти данные?",
    uz: "Ushbu ma'lumotni o'chirmoqchimisiz?",
  },
  SESSION_SUBMITTED: {
    ru: "Сессия успешно отправлена",
    uz: "Sessiya muvaffaqiyatli yuborildi",
  },
  SESSION_SUBMIT_ERROR: {
    ru: "Ошибка при отправке сессии",
    uz: "Sessiyani yuborishda xatolik yuz berdi",
  },
  EXCEL_IMPORT_SUCCESS: {
    ru: "Данные успешно импортированы",
    uz: "Ma'lumotlar muvaffaqiyatli import qilindi",
  },
  EXCEL_IMPORT_ERROR: {
    ru: "Ошибка при импорте файла",
    uz: "Faylni import qilishda xatolik yuz berdi",
  },
  NULL_FIELDS_PREFIX: {
    ru: "Не заполнены поля",
    uz: "To'ldirilmagan maydonlar",
  },
};

export const NULL_FIELD_LABELS: Record<string, { ru: string; uz: string }> = {
  pulse:               { ru: "Число пульсов",           uz: "Puls soni" },
  respiratoryRate:     { ru: "Число дыхания",            uz: "Nafas soni" },
  temperature:         { ru: "Температура тела",         uz: "Tana harorati" },
  erythrocyteCount:    { ru: "Количество эритроцитов",   uz: "Eritrotsitlar soni" },
  leukocyteCount:      { ru: "Количество лейкоцитов",    uz: "Leukotsitlar soni" },
  thrombocyteCount:    { ru: "Количество тромбоцитов",   uz: "Trombositlar soni" },
  coe:                 { ru: "КОЭ",                      uz: "KOE" },
  waterPercentage:     { ru: "Процент воды",             uz: "Suv foizi" },
  dryResidue:          { ru: "Сухой остаток",            uz: "Quruq qoldiq" },
  glutathione:         { ru: "Глутатион",                uz: "Glutathion" },
  hemoglobin:          { ru: "Гемоглобин",               uz: "Gemoglobin" },
  totalProtein:        { ru: "Общий белок",              uz: "Umumiy oqsil" },
  albumin:             { ru: "Альбумин",                 uz: "Albumin" },
  alphaGlobulin:       { ru: "Альфа-глобулин",           uz: "Alpha-globulin" },
  betaGlobulin:        { ru: "Бета-глобулин",            uz: "Beta-globulin" },
  gammaGlobulin:       { ru: "Гамма-глобулин",           uz: "Gamma-globulin" },
  residualNitrogen:    { ru: "Остаточный азот",          uz: "Qoldiq azot" },
  urea:                { ru: "Мочевина",                 uz: "Mochevina" },
  uricAcid:            { ru: "Мочевая кислота",          uz: "Moch kislotasi" },
  creatinine:          { ru: "Креатинин",                uz: "Kreatinin" },
  alkalineReserve:     { ru: "Щелочной резерв",          uz: "Ishqoriy zaxira" },
  glucose:             { ru: "Глюкоза",                  uz: "Glyukoza" },
  ketoneBodies:        { ru: "Кетоновые тела",           uz: "Keton tanachalari" },
  totalBilirubin:      { ru: "Общий билирубин",          uz: "Umumiy bilirubin" },
  directBilirubin:     { ru: "Прямой билирубин",         uz: "To'g'ri bilirubin" },
  totalCholesterol:    { ru: "Общий холестерин",         uz: "Umumiy xolesterin" },
  totalLipids:         { ru: "Общие липиды",             uz: "Umumiy lipidlar" },
  phospholipids:       { ru: "Фосфолипиды",              uz: "Fosfolipidlar" },
  lacticAcid:          { ru: "Молочная кислота",         uz: "Sut kislotasi" },
  pyruvicAcid:         { ru: "Пировиноградная кислота",  uz: "Piruvik kislota" },
  citricAcid:          { ru: "Лимонная кислота",         uz: "Limon kislotasi" },
  carotene:            { ru: "Каротин",                  uz: "Karotin" },
  vitaminA:            { ru: "Витамин А",                uz: "Vitamin A" },
  vitaminC:            { ru: "Витамин С",                uz: "Vitamin C" },
  organicPhosphorus:   { ru: "Общий фосфор",             uz: "Umumiy fosfor" },
  totalCalcium:        { ru: "Общий кальций",            uz: "Umumiy kaltsiy" },
  creatine:            { ru: "Креатин",                  uz: "Kreatin" },
  copper:              { ru: "Медь",                     uz: "Mis" },
  zinc:                { ru: "Цинк",                     uz: "Rux" },
  manganese:           { ru: "Марганец",                 uz: "Marganets" },
  cobalt:              { ru: "Кобальт",                  uz: "Kobalt" },
  urineColor:          { ru: "Цвет мочи",                uz: "Siydik rangi" },
  urineSmell:          { ru: "Запах мочи",               uz: "Siydik hidi" },
  urineClarity:        { ru: "Прозрачность мочи",        uz: "Siydik tiniqligi" },
  urineConsistency:    { ru: "Консистенция мочи",        uz: "Siydik konsistensiyasi" },
  urinePh:             { ru: "pH мочи",                  uz: "Siydik pH" },
  urineAcetone:        { ru: "Ацетон (моча)",            uz: "Atseton (siydik)" },
  urineProtein:        { ru: "Белок (моча)",             uz: "Oqsil (siydik)" },
  urineBilirubin:      { ru: "Билирубин (моча)",         uz: "Bilirubin (siydik)" },
  urineUrobilinogen:   { ru: "Уробилиноген (моча)",      uz: "Urobilinogen (siydik)" },
  urineSugar:          { ru: "Сахар (моча)",             uz: "Shakar (siydik)" },
  urineLeukocytes:     { ru: "Лейкоциты (моча)",         uz: "Leukotsitlar (siydik)" },
  urineEpithelium:     { ru: "Эпителий (моча)",          uz: "Epiteliya (siydik)" },
  urineMicrobialBodies:{ ru: "Микробные тела (моча)",    uz: "Mikrob tanachalari (siydik)" },
  urineErythrocytes:   { ru: "Эритроциты (моча)",        uz: "Eritrotsitlar (siydik)" },
  urineSaltCrystals:   { ru: "Кристаллы солей (моча)",   uz: "Tuz kristallari (siydik)" },
  urineAmount:         { ru: "Количество мочи",          uz: "Siydik miqdori" },
  fecesSmell:          { ru: "Запах кала",               uz: "Najas hidi" },
  fecesColor:          { ru: "Цвет кала",                uz: "Najas rangi" },
  fecesConsistency:    { ru: "Консистенция кала",        uz: "Najas konsistensiyasi" },
  fecesForm:           { ru: "Форма кала",               uz: "Najas shakli" },
  fecesAmount:         { ru: "Количество кала",          uz: "Najas miqdori" },
  fecesUndigestedFood: { ru: "Непереваренная пища",      uz: "Hazm bo'lmagan ovqat" },
  mucosaOral:          { ru: "Слизистая оболочка (рот)", uz: "Og'iz shilliq pardasi" },
  mucosaNasal:         { ru: "Слизистая оболочка (нос)", uz: "Burun shilliq pardasi" },
  mucosaOcular:        { ru: "Слизистая оболочка (глаз)",uz: "Ko'z shilliq pardasi" },
  mucosaVaginal:       { ru: "Слизистая оболочка (влаг.)",uz: "Qin shilliq pardasi" },
  rumination:          { ru: "Жвачка (румминация)",      uz: "Ruminatsiya" },
  obesity:             { ru: "Ожирение",                 uz: "Semizlik" },
  bodyType:            { ru: "Тип тела",                 uz: "Hayvon jussasi" },
  bodyPosition:        { ru: "Поза тела",                uz: "Tana holati" },
  wool:                { ru: "Шерсть",                   uz: "Jun" },
  skinColor:           { ru: "Цвет кожи",                uz: "Teri rangi" },
  skinHumidity:        { ru: "Влажность кожи",           uz: "Teri namligi" },
  skinSmell:           { ru: "Запах кожи",               uz: "Teri hidi" },
  skinTemp:            { ru: "Температура кожи",         uz: "Teri harorati" },
  skinSurface:         { ru: "Поверхность кожи",         uz: "Teri yuzasi" },
  skinElasticity:      { ru: "Эластичность кожи",        uz: "Teri elastikligi" },
  lymphSize:           { ru: "Размер лимфоузла",         uz: "Limfa tuguni o'lchami" },
  lymphShape:          { ru: "Форма лимфоузла",          uz: "Limfa tuguni shakli" },
  lymphSurface:        { ru: "Поверхность лимфоузла",    uz: "Limfa tuguni yuzasi" },
  lymphConsistency:    { ru: "Консистенция лимфоузла",   uz: "Limfa tuguni konsistensiyasi" },
  lymphTemp:           { ru: "Температура лимфоузла",    uz: "Limfa tuguni harorati" },
  lymphPain:           { ru: "Боль лимфоузла",           uz: "Limfa tuguni og'rig'i" },
  lymphMobility:       { ru: "Подвижность лимфоузла",    uz: "Limfa tuguni harakatchanligi" },
};

export type NavLink = {
  icon: any;
  url?: string;
  title: string;
  items?: NavLink[];
  isActive?: boolean;
};

export const links = {
  animals: {
    title: "nav.animals",
    icon: PawPrint,
    url: "/animals",
  },
  "animals-create": {
    title: "animals.createAnimal",
    icon: PlusIcon,
    url: "/animals-create",
  },
  veterinarians: {
    title: "nav.veterinarians",
    icon: UserCheck,
    url: "/veterinarians",
  },
  farmers: {
    title: "nav.farmers",
    icon: UserPlus,
    url: "/farmers",
  },
  profile: {
    title: "nav.profile",
    icon: UserCog,
    url: "/profile",
  },
  "animal-types": {
    title: "nav.animalTypes",
    icon: Box,
    url: "/animal-types",
  },
  breeds: {
    title: "nav.breeds",
    icon: Network,
    url: "/breeds",
  },
  "animal-colors": {
    title: "nav.animalColors",
    icon: Palette,
    url: "/animal-colors",
  },
  "urine-colors": {
    title: "nav.urineColors",
    icon: Palette,
    url: "/urine-colors",
  },
  "urine-clarities": {
    title: "nav.urineClarities",
    icon: Sparkles,
    url: "/urine-clarities",
  },
  "urine-consistencies": {
    title: "nav.urineConsistencies",
    icon: Droplets,
    url: "/urine-consistencies",
  },
  "urine-smells": {
    title: "nav.urineSmells",
    icon: Wind,
    url: "/urine-smells",
  },
  "dung-colors": {
    title: "nav.dungColors",
    icon: Palette,
    url: "/dung-colors",
  },
  "dung-forms": {
    title: "nav.dungForms",
    icon: Shapes,
    url: "/dung-forms",
  },
  "dung-consistencies": {
    title: "nav.dungConsistencies",
    icon: Gauge,
    url: "/dung-consistencies",
  },
  "dung-smells": {
    title: "nav.dungSmells",
    icon: Wind,
    url: "/dung-smells",
  },
  regions: {
    title: "nav.regions",
    icon: Map,
    url: "/regions",
  },
  districts: {
    title: "nav.districts",
    icon: MapPinned,
    url: "/districts",
  },
  vetstations: {
    title: "nav.vetstations",
    icon: MapPin,
    url: "/vetstations",
  },
  "disease-types": {
    title: "nav.diseaseTypes",
    icon: ClipboardList,
    url: "/disease-types",
  },
  "eye-lid": {
    title: "nav.eyeLid",
    icon: Waves,
    url: "/eye-lid",
  },
  "prophylaxis-items": {
    title: "nav.prophylaxisItems",
    icon: ListChecks,
    url: "/prophylaxis-items",
  },
  "prophylaxis-details": {
    title: "nav.prophylaxisDetails",
    icon: Stethoscope,
    url: "/prophylaxis-details",
  },
  diseases: {
    title: "nav.diseases",
    icon: ScanHeart,
    url: "/diseases",
  },
  prophylaxis: {
    title: "nav.prophylaxis",
    icon: Activity,
    url: "/prophylaxis",
  },
  "urine-tests": {
    title: "nav.urineTests",
    icon: Beaker,
    url: "/urine-tests",
  },
  "dung-tests": {
    title: "nav.dungTests",
    icon: Shovel,
    url: "/dung-tests",
  },
  "general-inspections": {
    title: "nav.generalInspections",
    icon: Stethoscope,
    url: "/general-inspections",
  },
  "general-blood-tests": {
    title: "nav.generalBloodTests",
    icon: Syringe,
    url: "/general-blood-tests",
  },
  "mucosa-exams": {
    title: "nav.mucosaExams",
    icon: ScanEye,
    url: "/mucosa-exams",
  },
  "sessions": {
    title: "nav.sessions",
    icon: FileText,
    url: "/sessions",
  },
  "statistics": {
    title: "nav.statistics",
    icon: BarChart2,
    url: "/statistics",
  },
};

export const navLinksVariant: Record<UserRole, NavLink[]> = {
  SUPER_ADMIN: [
    links['animals'],
    links['statistics'],
    {
      title: "nav.users",
      icon: Users,
      items: [
        links['veterinarians'],
        links['farmers'],
        links['profile'],
      ],
    },
    {
      title: "nav.management",
      icon: FolderCog,
      items: [
        { groupTitle: "nav.animalSettings" } as any,
        links['animal-types'],
        links['breeds'],
        links['animal-colors'],
        { groupTitle: "nav.urineSettings" } as any,
        links['urine-colors'],
        links['urine-clarities'],
        links['urine-consistencies'],
        links['urine-smells'],
        { groupTitle: "nav.dungSettings" },
        links['dung-colors'],
        links['dung-forms'],
        links['dung-consistencies'],
        links['dung-smells'],
        { groupTitle: "nav.mapSettings" },
        links['regions'],
        links['districts'],
        links['vetstations'],
        { groupTitle: "nav.medicineSettings" },
        links['disease-types'],
        links['diseases'],
        links['eye-lid'],
        links['prophylaxis-items'],
        links['prophylaxis-details'],
      ],
    },
  ],
  ADMIN: [
    links['animals'],
    links['statistics'],
    {
      title: "nav.users",
      icon: Users,
      items: [
        links['veterinarians'],
        links['farmers'],
        links['profile'],
      ],
    },
    {
      title: "nav.management",
      icon: FolderCog,
      items: [
        { groupTitle: "nav.animalSettings" } as any,
        links['animal-types'],
        links['breeds'],
        links['animal-colors'],
        { groupTitle: "nav.urineSettings" } as any,
        links['urine-colors'],
        links['urine-clarities'],
        links['urine-consistencies'],
        links['urine-smells'],
        { groupTitle: "nav.dungSettings" },
        links['dung-colors'],
        links['dung-forms'],
        links['dung-consistencies'],
        links['dung-smells'],
        { groupTitle: "nav.mapSettings" },
        links['regions'],
        links['districts'],
        links['vetstations'],
        { groupTitle: "nav.medicineSettings" },
        links['disease-types'],
        links['diseases'],
        links['eye-lid'],
        links['prophylaxis-items'],
        links['prophylaxis-details'],
      ],
    },
  ],
  FARMER: [
    links['animals'],
    links['animals-create'],
    links['profile'],
  ],
  VETERINARIAN: [
    links['animals'],
    links['animals-create'],
    links['statistics'],
    links['farmers'],
    links['profile'],
  ],
};

export const SKELETON_TYPES = {
  text: "h-4 w-32 rounded-md",
  title: "h-6 w-48 rounded-md",
  paragraph: "h-4 w-full rounded-md",
  avatar: "h-10 w-10 rounded-full",
  button: "h-10 w-24 rounded-lg",
  card: "h-40 w-full rounded-xl",
  input: "h-10 w-full rounded-md",
  image: "h-48 w-full rounded-xl",
};

export const QUERY_PARAM_KEYS = {
  ID: "id",
  NEW: "new",
  ANIMAL_ID: "animalId",
  SESSION_ID: "sessionId",
};

export const PREDICT_DISEASES: Record<string, Record<LanguageLocales, string>> = {
  "0":   { ru: "Перикардит",                                                     uz: "Perikardit" },
  "1":   { ru: "Миокардит",                                                       uz: "Miokardit" },
  "2":   { ru: "Миокардоз",                                                       uz: "Miokardoz" },
  "3":   { ru: "Миокардосклероз",                                                 uz: "Miokardoskleroz" },
  "4":   { ru: "Эндокардит",                                                      uz: "Endokardit" },
  "5":   { ru: "Атеросклероз",                                                    uz: "Ateroskleroz" },
  "6":   { ru: "Ринит",                                                           uz: "Rinit" },
  "7":   { ru: "Гайморит",                                                        uz: "Gajmorit" },
  "8":   { ru: "Фронтит",                                                         uz: "Frontit" },
  "9":   { ru: "Аэроцистит",                                                      uz: "Aerotsistit" },
  "10":  { ru: "Ларингит",                                                        uz: "Laringit" },
  "11":  { ru: "Бронхит",                                                         uz: "Bronxit" },
  "12":  { ru: "Гиперемия и отек легких",                                         uz: "O’pkaning gipereemiyasi va shishishi" },
  "13":  { ru: "Пневмония",                                                       uz: "Pnevmoniya" },
  "14":  { ru: "Эмфизема",                                                        uz: "Emfizema" },
  "15":  { ru: "Пневмоторакс",                                                    uz: "Pnevmtoraks" },
  "16":  { ru: "Стоматит",                                                        uz: "Stomatit" },
  "17":  { ru: "Фарингит",                                                        uz: "Faringit" },
  "18":  { ru: "Гипотония преджелудков",                                          uz: "Predjeludok gipotoniyasi" },
  "19":  { ru: "Атония преджелудков",                                             uz: "Predjeludok atoniyasi" },
  "20":  { ru: "Парец рубца",                                                     uz: "Rubtsing parezi" },
  "21":  { ru: "Алиментарная дистрофия",                                          uz: "Alimentar distrofiyasi" },
  "22":  { ru: "Ацидоз",                                                          uz: "Asidoz" },
  "23":  { ru: "Алкалоз",                                                         uz: "Alkaloz" },
  "24":  { ru: "Тимпания",                                                        uz: "Timpaniya" },
  "25":  { ru: "Паракератоз",                                                     uz: "Parakeratoz" },
  "26":  { ru: "Травматический ретикулит",                                        uz: "Travmatik retikulit" },
  "27":  { ru: "Ретикулоперитонит",                                               uz: "Retikuloperitonit" },
  "28":  { ru: "Гастрит",                                                         uz: "Gastrit" },
  "29":  { ru: "Язвенная болезнь желудка",                                        uz: "Me’da yara kasalligi" },
  "30":  { ru: "Гастроэнтерит",                                                   uz: "Gastroenterit" },
  "31":  { ru: "Энтероколит",                                                     uz: "Enterokolit" },
  "32":  { ru: "Метеоризм кишечника",                                             uz: "Ichak meteorismi" },
  "33":  { ru: "Гепатит",                                                         uz: "Gepatit" },
  "34":  { ru: "Гепатоз",                                                         uz: "Gepatoz" },
  "35":  { ru: "Цирроз печени",                                                   uz: "Jigar sirrozi" },
  "36":  { ru: "Абсцесс печени",                                                  uz: "Jigar absessi" },
  "37":  { ru: "Холецистит",                                                      uz: "Xolecistit" },
  "38":  { ru: "Холангит",                                                        uz: "Xolangit" },
  "39":  { ru: "Желчнокаменная болезнь",                                          uz: "O’tkir o’t yo’li kasalligi" },
  "40":  { ru: "Миоглобинурия",                                                   uz: "Mioglobinuriya" },
  "41":  { ru: "Нефрит",                                                          uz: "Nefrit" },
  "42":  { ru: "Нефроз",                                                          uz: "Nefroz" },
  "43":  { ru: "Нефросклероз",                                                    uz: "Nefroskleroz" },
  "44":  { ru: "Пиелонефрит",                                                     uz: "Pielonefrit" },
  "45":  { ru: "Уроцистит",                                                       uz: "Urotsistit" },
  "46":  { ru: "Мочекаменная болезнь",                                            uz: "Buyrak tosh kasalligi" },
  "47":  { ru: "Хроническая гематурия КРС",                                       uz: "KRSda xronik gematuriya" },
  "48":  { ru: "Солнечный удар",                                                  uz: "Quyosh zarbasi" },
  "49":  { ru: "Гиперинсоляция",                                                  uz: "Giperinsolyatsiya" },
  "50":  { ru: "Гелиоз",                                                          uz: "Gelioz" },
  "51":  { ru: "Тепловой удар",                                                   uz: "Isitma zarbasi" },
  "52":  { ru: "Гипертермия",                                                     uz: "Gipertermiya" },
  "53":  { ru: "Гиперемия головного мозга",                                       uz: "Miya gipereemiyasi" },
  "54":  { ru: "Анемия головного мозга",                                          uz: "Miya anemiyasi" },
  "55":  { ru: "Менингоэнцефалит",                                                uz: "Meningoensefalit" },
  "56":  { ru: "Хроническая водянка головного мозга",                             uz: "Miyada xronik suyuqlik yig’ilishi" },
  "57":  { ru: "Менингомиелит",                                                   uz: "Meningomiyelit" },
  "58":  { ru: "Стресс",                                                          uz: "Stress" },
  "59":  { ru: "Неврозы",                                                         uz: "Nevrozlar" },
  "60":  { ru: "Эпилепсия",                                                       uz: "Epilepsiya" },
  "61":  { ru: "Эклампсия",                                                       uz: "Eklampsiya" },
  "62":  { ru: "Остеодистрофия",                                                  uz: "Osteodistrofiya" },
  "63":  { ru: "Гипомагниемическая тетания",                                      uz: "Gipomagniyemik tetaniya" },
  "64":  { ru: "Гипокобальтоз",                                                   uz: "Gipokobaltoz" },
  "65":  { ru: "Недостаточность меди",                                            uz: "Mis yetishmovchiligi" },
  "66":  { ru: "Недостаточность цинка",                                           uz: "Sink yetishmovchiligi" },
  "67":  { ru: "Недостаточность марганца",                                        uz: "Marganets yetishmovchiligi" },
  "68":  { ru: "Недостаточность селена",                                          uz: "Selen yetishmovchiligi" },
  "69":  { ru: "Недостаточность фтора",                                           uz: "Flor yetishmovchiligi" },
  "70":  { ru: "Избытки фтора",                                                   uz: "Flor ortiqchaligi" },
  "71":  { ru: "Избытки бора",                                                    uz: "Bor ortiqchaligi" },
  "72":  { ru: "Избытки молибдена",                                               uz: "Molybden ortiqchaligi" },
  "73":  { ru: "Избытки никеля",                                                  uz: "Nikel ortiqchaligi" },
  "74":  { ru: "Недостаточность ретинола",                                        uz: "Retinol yetishmovchiligi" },
  "75":  { ru: "Недостаточность токоферола",                                      uz: "Tokoferol yetishmovchiligi" },
  "76":  { ru: "Недостаточность филлохинона",                                     uz: "Filloxinon yetishmovchiligi" },
  "77":  { ru: "Недостаточность аскорбиновой кислоты",                            uz: "Askorbin kislotasi yetishmovchiligi" },
  "78":  { ru: "Недостаточность тиамина",                                         uz: "Tiamin yetishmovchiligi" },
  "79":  { ru: "Недостаточность рибофлавина",                                     uz: "Riboflavin yetishmovchiligi" },
  "80":  { ru: "Недостаточность никотиновой кислоты",                             uz: "Nikotinik kislota yetishmovchiligi" },
  "81":  { ru: "Недостаточность пиридоксина",                                     uz: "Pirodoksin yetishmovchiligi" },
  "82":  { ru: "Недостаточность цианокобаламина",                                 uz: "Tiamin-kobalamin yetishmovchiligi" },
  "83":  { ru: "Сахарный диабет",                                                 uz: "Qandli diabet" },
  "84":  { ru: "Несахарный диабет",                                               uz: "Qandli bo’lmagan diabet" },
  "85":  { ru: "Послеродовая гипокальцемия",                                      uz: "Tug’ruqdan keyingi gipokaltsemiya" },
  "86":  { ru: "Эндемический зоб",                                                uz: "Endemik bo’yinturuq" },
  "87":  { ru: "Ожирение",                                                        uz: "Semirish" },
  "88":  { ru: "Кетоз молочных коров",                                            uz: "Sutboshli qoramollarda ketoz" },
  "89":  { ru: "Кетонурия суягных овец",                                          uz: "Suyakli qo’ylarda ketonuriya" },
  "90":  { ru: "Интоксикация поваренной солью",                                   uz: "Tuz zaharlanishi" },
  "91":  { ru: "Интоксикация мочевиной",                                          uz: "Mochevina zaharlanishi" },
  "92":  { ru: "Интоксикация гречихой",                                           uz: "Grechixa zaharlanishi" },
  "93":  { ru: "Интоксикация клевером",                                           uz: "Klever zaharlanishi" },
  "94":  { ru: "Интоксикация суданкой",                                           uz: "Sudan zaharlanishi" },
  "95":  { ru: "Интоксикация люпином (люпиноз)",                                  uz: "Lupin zaharlanishi (lupinoz)" },
  "96":  { ru: "Интоксикация хлопчатниковым шротом, семенами и шелухой",          uz: "Paxta shroti va urug’ zaharlanishi" },
  "97":  { ru: "Интоксикация семенами и жмыхами клещевины",                       uz: "Kleschevina urug’i va jmykh zaharlanishi" },
  "98":  { ru: "Интоксикация картофельной бардой",                                uz: "Kartoshka bardasi zaharlanishi" },
  "99":  { ru: "Интоксикация свекловичным жомом",                                 uz: "Shakarqamish jomi zaharlanishi" },
  "100": { ru: "Интоксикация патокой",                                            uz: "Patoka zaharlanishi" },
  "101": { ru: "Клавицепстоксикоз",                                               uz: "Klavitsepstoksikoz" },
  "102": { ru: "Фузариотоксикоз",                                                 uz: "Fuzariotoksikoz" },
  "103": { ru: "Устилаготоксикоз",                                                uz: "Ustilagotoksikoz" },
  "104": { ru: "Стахиботриотоксикоз",                                             uz: "Stakhibotriotoksikoz" },
  "105": { ru: "Интоксикация испорченными кормами",                               uz: "Yomonlangan ozuqa zaharlanishi" },
  "106": { ru: "Интоксикация пасленом",                                           uz: "Paslen zaharlanishi" },
  "107": { ru: "Интоксикация горчицей и рапсом",                                  uz: "Xantal va repka zaharlanishi" },
  "108": { ru: "Интоксикация лютиками",                                           uz: "Lyutik zaharlanishi" },
  "109": { ru: "Интоксикация донником",                                           uz: "Donnik zaharlanishi" },
  "110": { ru: "Интоксикация верхом ядовитым",                                    uz: "Zaharli o’simlik bilan zaharlanish" },
  "111": { ru: "Интоксикация чемерицей",                                          uz: "Chemeritsа zaharlanishi" },
  "112": { ru: "Интоксикация гелиотропом",                                        uz: "Geliotrop zaharlanishi" },
  "113": { ru: "Триходесмотоксикоз",                                              uz: "Trihodesmotoksikoz" },
  "114": { ru: "Перитонит",                                                       uz: "Peritonit" },
  "115": { ru: "Брюшная водянка",                                                 uz: "Qorin suyuqlik to’planishi" },
};

/** Normalize rawOutput to a unified PredictionEntry[] regardless of model version */
export function normalizePredictions(rawOutput: PredictionRawOutput): PredictionEntry[] {
  // New model: { topDisease, predictions: [...] }
  if (rawOutput && typeof rawOutput === "object" && "predictions" in rawOutput) {
    return (rawOutput as { predictions: PredictionEntry[] }).predictions ?? [];
  }
  // Old model: { "7": 0.612, "3": 0.066, ... }
  return Object.entries(rawOutput as Record<string, number>)
    .filter(([diseaseIndex]) => !!PREDICT_DISEASES[diseaseIndex])
    .map(([diseaseIndex, probability]) => ({
      diseaseIndex,
      probability,
      diseaseName: PREDICT_DISEASES[diseaseIndex]?.ru ?? `#${diseaseIndex}`,
    }));
}

export const INPUT_VECTOR_KEYS: string[] = [
  "pulse",               // 0
  "respiratoryRate",     // 1
  "temperature",         // 2
  "erythrocyteCount",    // 3
  "leukocyteCount",      // 4
  "thrombocyteCount",    // 5
  "coe",                 // 6
  "waterPercentage",     // 7
  "dryResidue",          // 8
  "glutathione",         // 9
  "hemoglobin",          // 10
  "totalProtein",        // 11
  "albumin",             // 12
  "alphaGlobulin",       // 13
  "betaGlobulin",        // 14
  "gammaGlobulin",       // 15
  "residualNitrogen",    // 16
  "urea",                // 17
  "uricAcid",            // 18
  "creatinine",          // 19
  "alkalineReserve",     // 20
  "glucose",             // 21
  "ketoneBodies",        // 22
  "totalBilirubin",      // 23
  "directBilirubin",     // 24
  "totalCholesterol",    // 25
  "totalLipids",         // 26
  "phospholipids",       // 27
  "lacticAcid",          // 28
  "pyruvicAcid",         // 29
  "citricAcid",          // 30
  "carotene",            // 31
  "vitaminA",            // 32
  "vitaminC",            // 33
  "organicPhosphorus",   // 34
  "totalCalcium",        // 35
  "creatine",            // 36
  "copper",              // 37
  "zinc",                // 38
  "manganese",           // 39
  "cobalt",              // 40
  "urineColor",          // 41
  "urineSmell",          // 42
  "urineClarity",        // 43
  "urineConsistency",    // 44
  "urinePh",             // 45
  "urineAcetone",        // 46
  "urineProtein",        // 47
  "urineBilirubin",      // 48
  "urineUrobilinogen",   // 49
  "urineSugar",          // 50
  "urineLeukocytes",     // 51
  "urineEpithelium",     // 52
  "urineMicrobialBodies", // 53
  "urineErythrocytes",   // 54
  "urineSaltCrystals",   // 55
  "urineAmount",         // 56
  "fecesSmell",          // 57
  "fecesColor",          // 58
  "fecesConsistency",    // 59
  "fecesForm",           // 60
  "fecesAmount",         // 61
  "fecesUndigestedFood", // 62
  "mucosaOral",          // 63
  "mucosaNasal",         // 64
  "mucosaOcular",        // 65
  "mucosaVaginal",       // 66
  "rumination",          // 67
  "obesity",             // 68
  "bodyType",            // 69
  "bodyPosition",        // 70
  "wool",                // 71
  "skinColor",           // 72
  "skinHumidity",        // 73
  "skinSmell",           // 74
  "skinTemp",            // 75
  "skinSurface",         // 76
  "skinElasticity",      // 77
  "lymphSize",           // 78
  "lymphShape",          // 79
  "lymphSurface",        // 80
  "lymphConsistency",    // 81
  "lymphTemp",           // 82
  "lymphPain",           // 83
  "lymphMobility",       // 84
];

/** Normalize inputVector to Record<string, number> regardless of model version */
export function normalizeInputVector(inputVector: Record<string, number> | number[]): Record<string, number> {
  if (Array.isArray(inputVector)) {
    return Object.fromEntries(inputVector.map((v, i) => [INPUT_VECTOR_KEYS[i] ?? String(i), v]));
  }
  return inputVector ?? {};
}