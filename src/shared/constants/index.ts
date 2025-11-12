import { UserRole } from "@/shared/types";
import {
  CirclePlus,
  FlaskRound,
  FlaskConical,
  Shovel,
  HeartPulse,
  Syringe,
  Users,
  MapPinned,
  PawPrint,
  ScanHeart,
  Activity,
  Cross,
  PillBottle,
  MapPin,
  Map,
  ScanEye,
  Palette,
  Ham,
  FolderCog,
  Disc,
  UserCog,
  Sun,
  Moon,
  Laptop,
} from "lucide-react";

export const TABLE_QUERY_PARAMS = {
  PAGE: "page",
  SEARCH: "search",
  PER_PAGE: "perPage"
}

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

export const ANIMAL_GENDERS = [
  { uz: "Erkak", ru: "Самец", value: "MALE" },
  { uz: "Urgochi", ru: "Самка", value: "FEMALE" },
];

export const BREED = [
  { uz: "Sut", ru: "Молоко", value: "MILK" },
  { uz: "Go'sht", ru: "Мясо", value: "MEAT" },
];

export const BLOOD_SERUM_TESTS = {
  totalProtein: {
    ru: "Общий белок сыворотки",
    uz: "Umumiy oqsil",
    unit_ru: "г/л",
    unit_uz: "g/L",
  },
  totalCalcium: {
    ru: "Общий кальций",
    uz: "Umumiy kalsiy",
    unit_ru: "ммоль/л",
    unit_uz: "mmol/L",
  },
  organicPhosphorus: {
    ru: "Органический фосфор",
    uz: "Organik fosfor",
    unit_ru: "ммоль/л",
    unit_uz: "mmol/L",
  },
  albumen: { ru: "Альбумин", uz: "Albumin", unit_ru: "%", unit_uz: "%" },
  alphaGlobulin: {
    ru: "Альфа-глобулин",
    uz: "Alfa globulin",
    unit_ru: "%",
    unit_uz: "%",
  },
  betaGlobulin: {
    ru: "Бета-глобулин",
    uz: "Beta globulin",
    unit_ru: "%",
    unit_uz: "%",
  },
  gammaGlobulin: {
    ru: "Гамма-глобулин",
    uz: "Gamma globulin",
    unit_ru: "%",
    unit_uz: "%",
  },
  creatine: {
    ru: "Креатин",
    uz: "Kreatin",
    unit_ru: "мкмоль/л",
    unit_uz: "µmol/L",
  },
  alkalineReserve: {
    ru: "Щелочной резерв",
    uz: "Ishqoriy zahira",
    unit_ru: "Об%CO²",
    unit_uz: "Ob%CO²",
  },
  glucose: {
    ru: "Глюкоза",
    uz: "Glyukoza",
    unit_ru: "ммоль/л",
    unit_uz: "mmol/L",
  },
  totalBilirubin: {
    ru: "Общий билирубин",
    uz: "Umumiy Bilirubin",
    unit_ru: "мкмоль/л",
    unit_uz: "µmol/L",
  },
  cholesterol: {
    ru: "Холестерин",
    uz: "Xolestrin",
    unit_ru: "ммоль/л",
    unit_uz: "mmol/L",
  },
  totalLipids: {
    ru: "Общие липиды",
    uz: "Umumiy lipidlar",
    unit_ru: "г/л",
    unit_uz: "g/L",
  },
  vitaminA: {
    ru: "Витамин A",
    uz: "A vitamin",
    unit_ru: "мкмоль/л",
    unit_uz: "µmol/L",
  },
  vitaminB: {
    ru: "Витамин B",
    uz: "B vitamin",
    unit_ru: "мкмоль/л",
    unit_uz: "µmol/L",
  },
  lacticAcid: {
    ru: "Молочная кислота",
    uz: "Sut kislotasi",
    unit_ru: "ммоль/л",
    unit_uz: "mmol/L",
  },
  pyruvicAcid: {
    ru: "Пировиноградная кислота",
    uz: "Pirouzum kislotasi",
    unit_ru: "ммоль/л",
    unit_uz: "mmol/L",
  },
  urea: {
    ru: "Мочевина",
    uz: "Karbamid",
    unit_ru: "ммоль/л",
    unit_uz: "mmol/L",
  },
  citricAcid: {
    ru: "Лимонная кислота",
    uz: "Limon kislotasi",
    unit_ru: "ммоль/л",
    unit_uz: "mmol/L",
  },
  ureaAcid: {
    ru: "Мочевая кислота",
    uz: "Karbamid kislotasi",
    unit_ru: "ммоль/л",
    unit_uz: "mmol/L",
  },
};

export const GENERAL_BLOOD_TESTS = {
  coe: { ru: "СОЭ", uz: "COE", unit_ru: "Мм/ч", unit_uz: "mm/soat" },
  leukocyteCount: {
    ru: "Количество лейкоцитов",
    uz: "Leykotsitlar soni",
    unit_ru: "тыс./мкл",
    unit_uz: "ming/mkL",
  },
  erythrocyteCount: {
    ru: "Количество эритроцитов",
    uz: "Eritrotsitlar soni",
    unit_ru: "млн/мкл",
    unit_uz: "mln/mkL",
  },
  thrombocyteCount: {
    ru: "Количество тромбоцитов",
    uz: "Trombotsitlar soni",
    unit_ru: "тыс./мкл",
    unit_uz: "ming/mkL",
  },
  hemoglobin: {
    ru: "Гемоглобин",
    uz: "Gemoglobin",
    unit_ru: "г/л",
    unit_uz: "g/L",
  },
  glutathione: {
    ru: "Глутатион",
    uz: "Glutation",
    unit_ru: "ммоль/л",
    unit_uz: "mmol/L",
  },
  waterPercentage: {
    ru: "Процент воды",
    uz: "Suv foizi",
    unit_ru: "%",
    unit_uz: "%",
  },
  dryResiduePercentage: {
    ru: "Процент сухого остатка",
    uz: "Quruq qoldiq foizi",
    unit_ru: "%",
    unit_uz: "%",
  },
};

export const CLARITY_TYPES = {
  CLEAR: { ru: "Прозрачный", uz: "Tiniq" },
  NOT_CLEAR: { ru: "Мутный", uz: "Rasvo" },
};

export const POSITIONS = {
  NATURAL: {
    ru: "Естественное",
    uz: "Tabiiy",
  },
  FORCED: {
    ru: "Принудительное",
    uz: "Majbiriy",
  },
  FORCED_STANDING: {
    ru: "Принудительное стоя",
    uz: "Majbiriy tik turgan",
  },
  FORCED_LYING: {
    ru: "Принудительное лежа",
    uz: "Majbiriy yotgan",
  },
  FORCED_SITTING: {
    ru: "Принудительное сидя",
    uz: "Majbiriy o’tirgan",
  },
  NON_THERAPEUTIC: {
    ru: "Не терапевтическое",
    uz: "Tabiy bo’lmagan",
  },
};

export const SMELL_TYPES = {
  PUNGENT: { ru: "Резкий запах", uz: "Hidi o'tkir" },
  WEAK: { ru: "Слабый запах", uz: "Hidi kuchsiz" },
  HAS: { ru: "Есть запах", uz: "Hidi bor" },
  NO: { ru: "Без запаха", uz: "Hidsiz" },
};

export const DUNG_FORMS = {
  NORMAL: { ru: "Норма", uz: "Norma" },
  SOLID: { ru: "Твёрдый", uz: "Qattiq" },
  LIQUID: { ru: "Жидкий", uz: "Suyuq" },
  MEDIUM: { ru: "Средний", uz: "O'rtacha" },
};

export const CUSTOMER_TYPES = {
  MOBILE: { ru: "Активный", uz: "Harakatchan" },
  CALM: { ru: "Спокойный", uz: "Tinch" },
};

export const OBESITY_TYPES = {
  HIGH: { ru: "Высокий", uz: "Yuqori" },
  MEDIUM: { ru: "Средний", uz: "O'rtacha" },
  LEAN: { ru: "Ниже среднего", uz: "O'rtachadan past" },
  LOW: { ru: "Худой", uz: "Ozg'in" },
  CACHEXIA: { ru: "Кахексия", uz: "Koxeksiya" },
};

export const BODY_TYPES = {
  WEAK: { ru: "Слабое", uz: "Kuchsiz" },
  MEDIUM: { ru: "Сильное", uz: "O'rtacha" },
  STRONG: { ru: "Сильное", uz: "Kuchli" },
};

export const BODY_STRUCTURES = {
  COARSE: { ru: "Грубое", uz: "Qo'pol" },
  SLIM: { ru: "Пустое", uz: "Bo'sh" },
  DENSE: { ru: "Плотное", uz: "Zich" },
  WEAK: { ru: "Грубое", uz: "Nozik" },
};

export const INSPECTION_TYPES = {
  MORNING: { ru: "Утренний", uz: "Ertalabki" },
  EVENING: { ru: "Вечерний", uz: "Kechki" },
  DISEASE: { ru: "Заболевание", uz: "Kasallik" },
  GENERAL: { ru: "Общий", uz: "Umumiy" },
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
};

export type NavLink = {
  title: string
  icon: any
  isActive?: boolean
  url?: string
  items?: NavLink[]
}

export const navLinksVariant: Record<UserRole, NavLink[]> = {
  ADMIN: [
    {
      title: "nav.management",
      icon: FolderCog,
      items: [
        {
          title: "nav.animalTypes",
          icon: PawPrint,
          url: "/animal-types",
        },
        {
          title: "nav.breeds",
          icon: Ham,
          url: "/breeds",
        },
        {
          title: "nav.vaccineTypes",
          icon: Cross,
          url: "/vaccine-types",
        },
        {
          title: "nav.diseaseTypes",
          icon: Activity,
          url: "/disease-types",
        },

        {
          title: "nav.animalColors",
          icon: Palette,
          url: "/animal-colors",
        },
        {
          title: "nav.urineColors",
          icon: Palette,
          url: "/urine-colors",
        },
        {
          title: "nav.dungColors",
          icon: Palette,
          url: "/dung-colors",
        },

        {
          title: "nav.regions",
          icon: Map,
          url: "/regions",
        },
        {
          title: "nav.districts",
          icon: MapPinned,
          url: "/districts",
        },
        {
          title: "nav.vetstations",
          icon: MapPin,
          url: "/vetstations",
        },

        {
          title: "nav.eyeLid",
          icon: ScanEye,
          url: "/eye-lid",
        },
        {
          title: "nav.leatherCover",
          icon: Disc,
          url: "/leather-cover",
        },
      ],
    },
    {
      title: "nav.users",
      icon: Users,
      items: [
        {
          title: "nav.veterinarians",
          icon: Users,
          url: "/veterinarians",
        },
        {
          title: "nav.farmers",
          icon: Users,
          url: "/farmers",
        },
        {
          title: "nav.profile",
          icon: UserCog,
          url: "/profile",
        },
      ],
    },
    {
      title: "nav.animals",
      icon: PawPrint,
      url: "/animals",
    },
    {
      title: "nav.inspections",
      icon: HeartPulse,
      items: [
        {
          title: "nav.diseases",
          icon: ScanHeart,
          url: "/diseases",
        },
        {
          title: "nav.urineTests",
          icon: FlaskConical,
          url: "/urine-tests",
        },
        {
          title: "nav.dungTests",
          icon: Shovel,
          url: "/dung-tests",
        },
        {
          title: "nav.vaccines",
          icon: PillBottle,
          url: "/vaccines",
        },
        {
          title: "nav.generalInspections",
          icon: HeartPulse,
          url: "/general-inspections",
        },
        {
          title: "nav.inspections",
          icon: Activity,
          url: "/inspections",
        },
        {
          title: "nav.generalBloodTests",
          icon: Syringe,
          url: "/general-blood-tests",
        },
        {
          title: "nav.bloodSerumTests",
          icon: FlaskRound,
          url: "/blood-serum-tests",
        },
      ],
    },
  ],
  FARMER: [
    {
      // isActive: true,
      title: "nav.management",
      icon: FolderCog,
      items: [
        {
          title: "nav.animals",
          icon: PawPrint,
          url: "/animals",
        },
        {
          title: "nav.profile",
          icon: UserCog,
          url: "/profile",
        },
      ],
    },
    {
      title: "nav.inspections",
      icon: HeartPulse,
      items: [
        {
          title: "nav.diseases",
          icon: ScanHeart,
          url: "/diseases",
        },
        {
          title: "nav.urineTests",
          icon: FlaskConical,
          url: "/urine-tests",
        },
        {
          title: "nav.dungTests",
          icon: Shovel,
          url: "/dung-tests",
        },
        {
          title: "nav.vaccines",
          icon: PillBottle,
          url: "/vaccines",
        },
        {
          title: "nav.generalInspections",
          icon: HeartPulse,
          url: "/general-inspections",
        },
        {
          title: "nav.inspections",
          icon: Activity,
          url: "/inspections",
        },
        {
          title: "nav.generalBloodTests",
          icon: Syringe,
          url: "/general-blood-tests",
        },
        {
          title: "nav.bloodSerumTests",
          icon: FlaskRound,
          url: "/blood-serum-tests",
        },
      ],
    },
  ],
  VETERINARIAN: [
    {
      // isActive: true,
      title: "nav.management",
      icon: FolderCog,
      items: [
        {
          title: "nav.farmers",
          icon: Users,
          url: "/farmers",
        },
        {
          title: "nav.profile",
          icon: UserCog,
          url: "/profile",
        },
      ],
    },
    {
      title: "nav.animals",
      icon: PawPrint,
      items: [
        {
          title: "animals.createAnimal",
          url: "/animals-create",
          icon: CirclePlus,
        },
        {
          title: "nav.animals",
          icon: PawPrint,
          url: "/animals",
        },
      ],
    },
    // {
    //   title: "nav.inspections",
    //   icon: HeartPulse,
    //   items: [
    //     {
    //       title: "nav.diseases",
    //       icon: ScanHeart,
    //       url: "/diseases",
    //     },
    //     {
    //       title: "nav.urineTests",
    //       icon: FlaskConical,
    //       url: "/urine-tests",
    //     },
    //     {
    //       title: "nav.dungTests",
    //       icon: Shovel,
    //       url: "/dung-tests",
    //     },
    //     {
    //       title: "nav.vaccines",
    //       icon: PillBottle,
    //       url: "/vaccines",
    //     },
    //     {
    //       title: "nav.generalInspections",
    //       icon: HeartPulse,
    //       url: "/general-inspections",
    //     },
    //     {
    //       title: "nav.inspections",
    //       icon: Activity,
    //       url: "/inspections",
    //     },
    //     {
    //       title: "nav.generalBloodTests",
    //       icon: Syringe,
    //       url: "/general-blood-tests",
    //     },
    //     {
    //       title: "nav.bloodSerumTests",
    //       icon: FlaskRound,
    //       url: "/blood-serum-tests",
    //     },
    //   ],
    // },
  ],
};

export const TOAST_OPTIONS = {
  style: { background: "hsl(var(--card))" },
  action: { label: "Закрыть", onClick: () => {} },
  className: "bg-primary",
  actionButtonStyle: { background: "hsl(var(--primary))" },
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
}

export const QUERY_PARAM_KEYS = {
  ANIMAL_ID: "animalId",
  NEW: "new",
  ID: "id",
}