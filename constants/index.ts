import { UserRole } from "~/lib/type";
import {
  LayoutDashboard,
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
  CircleUserRound,
  FolderCog,
  Disc,
  UserCog,
} from "lucide-react";

export const GENDERS = [
  { uz: "Erkak", ru: "Мужской", value: "MALE" },
  { uz: "Ayol", ru: "Женский", value: "FEMALE" },
];

export const BREED = [
  { uz: "Sut", ru: "Молоко", value: "MILK" },
  { uz: "Go'sht", ru: "Мясо", value: "MEAT" },
];

export const BLOOD_SERUM_TESTS = {
  totalProtein: { ru: "Общий белок", uz: "Umumiy oqsil" },
  totalCalcium: { ru: "Общий кальций", uz: "Umumiy kalsiy" },
  organicPhosphorus: { ru: "Органический фосфор", uz: "Organik fosfor" },
  albumen: { ru: "Альбумин", uz: "Albumin" },
  alphaGlobulin: { ru: "Альфа-глобулин", uz: "Alfa globulin" },
  betaGlobulin: { ru: "Бета-глобулин", uz: "Beta globulin" },
  gammaGlobulin: { ru: "Гамма-глобулин", uz: "Gamma globulin" },
  creatine: { ru: "Креатин", uz: "Kreatin" },
  alkalineReserve: { ru: "Щелочной резерв", uz: "Ishqoriy zahira" },
  glucose: { ru: "Глюкоза", uz: "Glyukoza" },
  totalBilirubin: { ru: "Общий билирубин", uz: "Umumiy Bilirubin" },
  cholesterol: { ru: "Холестерин", uz: "Xolestrin" },
  totalLipids: { ru: "Общие липиды", uz: "Umumiy lipidlar" },
  vitaminA: { ru: "Витамин A", uz: "A vitamin" },
  vitaminB: { ru: "Витамин B", uz: "B vitamin" },
  lacticAcid: { ru: "Молочная кислота", uz: "Sut kislotasi" },
  pyruvicAcid: { ru: "Пировиноградная кислота", uz: "Pirouzum kislotasi" },
  urea: { ru: "Мочевина", uz: "Karbamid" },
  citricAcid: { ru: "Лимонная кислота", uz: "Limon kislotasi" },
  ureaAcid: { ru: "Мочевая кислота", uz: "Karbamid kislotasi" },
};

export const GENERAL_BLOOD_TESTS = {
  coe: { ru: "СОЭ", uz: "COE" },
  leukocyteCount: { ru: "Количество лейкоцитов", uz: "Leykotsitlar soni" },
  erythrocyteCount: { ru: "Количество эритроцитов", uz: "Eritrotsitlar soni" },
  thrombocyteCount: { ru: "Количество тромбоцитов", uz: "Trombotsitlar soni" },
  hemoglobin: { ru: "Гемоглобин", uz: "Gemoglobin" },
  glutathione: { ru: "Глутатион", uz: "Glutation" },
  waterPercentage: { ru: "Процент воды", uz: "Suv foizi" },
  dryResiduePercentage: { ru: "Процент сухого остатка", uz: "Quruq qoldiq ulushi" },
};

export const CLARITY_TYPES = {
  CLEAR: { ru: "Прозрачный", uz: "Tiniq" },
  NOT_CLEAR: { ru: "Мутный", uz: "Rasvo" },
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
  MOBILE: { ru: "Подвижный", uz: "Harakatchan" },
  CALM: { ru: "Спокойный", uz: "Tinch" },
};

export const OBESITY_TYPES = {
  HIGH: { ru: "Высокая", uz: "Yuqori" },
  MEDIUM: { ru: "Средняя", uz: "O'rtacha" },
  LEAN: { ru: "Ниже среднего", uz: "O'rtachadan past" },
  LOW: { ru: "Худой", uz: "Ozg'in" },
  CACHEXIA: { ru: "Кахексия", uz: "Koxeksiya" },
};

export const BODY_TYPES = {
  WEAK: { ru: "Слабый", uz: "Kuchsiz" },
  MEDIUM: { ru: "Средний", uz: "O'rtacha" },
  STRONG: { ru: "Сильный", uz: "Kuchli" },
};

export const BODY_STRUCTURES = {
  COARSE: { ru: "Грубый", uz: "Qo'pol" },
  SLIM: { ru: "Худой", uz: "Bo'sh" },
  DENSE: { ru: "Плотный", uz: "Zich" },
  WEAK: { ru: "Тонкий", uz: "Nozik" },
};

export const INSPECTION_TYPES = {
  MORNING: { ru: "Утренний", uz: "Ertalabki" },
  EVENING: { ru: "Вечерний", uz: "Kechki" },
  DISEASE: { ru: "Заболевание", uz: "Kasallik" },
  GENERAL: { ru: "Общий", uz: "Umumiy" },
};

export const ALERT_MESSAGES = {
  DATA_CREATED: { ru: "Данные успешно созданы!", uz: "Ma'lumot muvaffaqiyatli yaratildi!" },
  DATA_UPDATED: { ru: "Данные успешно обновлены!", uz: "Ma'lumot muvaffaqiyatli yangilandi!" },
  DATA_DELETED: { ru: "Данные успешно удалены!", uz: "Ma'lumot muvaffaqiyatli o'chirildi!" },
  DATA_NOT_FOUND: { ru: "Данные не найдены!", uz: "Ma'lumot topilmadi!" },
  INVALID_INPUT: { ru: "Введенные данные некорректны!", uz: "Kiritilgan ma'lumot noto'g'ri!" },
  ACCESS_DENIED: { ru: "Доступ запрещен!", uz: "Kirish taqiqlangan!" },
  LOGIN_SUCCESS: { ru: "Успешный вход!", uz: "Muvaffaqiyatli kirildi!" },
  LOGIN_FAILED: { ru: "Логин или пароль неверны!", uz: "Login yoki parol noto'g'ri!" },
  PERMISSION_REQUIRED: { ru: "Требуется разрешение!", uz: "Ruxsat talab qilinadi!" },
  SERVER_ERROR: { ru: "Произошла ошибка на сервере!", uz: "Serverda xatolik yuz berdi!" },
  OPERATION_FAILED: { ru: "Операция не выполнена!", uz: "Amal bajarilmadi!" },
  OPERATION_SUCCESS: { ru: "Операция выполнена успешно!", uz: "Amal muvaffaqiyatli bajarildi!" },
  LOADING: { ru: "Загрузка...", uz: "Yuklanmoqda..." },
  SAVING: { ru: "Сохранение...", uz: "Saqlanmoqda..." },
  UPLOADING: { ru: "Загрузка...", uz: "Yuklanmoqda..." },
  NO_DATA: { ru: "Данные отсутствуют!", uz: "Ma'lumot mavjud emas!" },
  DELETE_CONFIRM: { ru: "Вы уверены, что хотите удалить эти данные?", uz: "Ushbu ma'lumotni o'chirmoqchimisiz?" }
};

export const navLinksVariant: Record<
  UserRole,
  {
    title: string;
    icon: any;
    isActive?: boolean;
    items: { title: string; icon?: any; url: string }[];
  }[]
> = {
  ADMIN: [
    {
      isActive: true,
      title: "nav.management",
      icon: FolderCog,
      items: [
        {
          title: "nav.animalTypes",
          icon: PawPrint,
          url: "/animal-types",
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
      items: [
        {
          title: "nav.animals",
          icon: PawPrint,
          url: "/animals",
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
  FARMER: [
    {
      isActive: true,
      title: "nav.management",
      icon: FolderCog,
      items: [
        {
          title: "nav.animals",
          icon: PawPrint,
          url: "/animals",
        },
        {
          title: "nav.prifle",
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
      isActive: true,
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
};

export const TOAST_OPTIONS = {
  style: { background: "hsl(var(--card))" },
  action: { label: "Yopish", onClick: () => {} },
  className: "bg-primary",
  actionButtonStyle: { background: "hsl(var(--primary))" },
};
