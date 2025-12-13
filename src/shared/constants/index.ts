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
  Droplet,
  Droplets,
  Sparkles,
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
  icon: any
  url?: string
  title: string
  items?: NavLink[]
  isActive?: boolean
}

export const navLinksVariant: Record<UserRole, NavLink[]> = {
  SUPER_ADMIN: [
    {
      title: "nav.animals",
      icon: PawPrint,
      url: "/animals",
    },
    {
      title: "nav.users",
      icon: Users,
      items: [
        {
          title: "nav.veterinarians",
          icon: UserCheck,
          url: "/veterinarians",
        },
        {
          title: "nav.farmers",
          icon: UserPlus,
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
      title: "nav.management",
      icon: FolderCog,
      items: [
        { groupTitle: 'Настройки животных' } as any,
        {
          title: "nav.animalTypes",
          icon: Box,
          url: "/animal-types",
        },
        {
          title: "nav.breeds",
          icon: Network,
          url: "/breeds",
        },
        {
          title: "nav.animalColors",
          icon: Palette,
          url: "/animal-colors",
        },
        { groupTitle: 'Настройки мочи' } as any,
        {
          title: "nav.urineColors",
          icon: Palette,
          url: "/urine-colors",
        },
        {
          title: "nav.urineClarities",
          icon: Sparkles,
          url: "/urine-clarities",
        },
        {
          title: "nav.urineColors",
          icon: Droplets,
          url: "/urine-consistencies",
        },
        {
          title: "nav.urineSmells",
          icon: Wind,
          url: "/urine-smells",
        },
        { groupTitle: 'Настройки кала' },
        {
          title: "nav.dungColors",
          icon: Palette,
          url: "/dung-colors",
        },
        {
          title: "nav.dungForms",
          icon: Shapes,
          url: "/dung-forms",
        },
        {
          title: "nav.dungConsistencies",
          icon: Gauge,
          url: "/dung-consistencies",
        },
        {
          title: "nav.dungSmells",
          icon: Wind,
          url: "/dung-smells",
        },
        { groupTitle: 'Настройки карту' },
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
        { groupTitle: 'Настройки медицину' },
        {
          title: "nav.diseaseTypes",
          icon: ClipboardList,
          url: "/disease-types",
        },
        {
          title: "nav.eyeLid",
          icon: Waves,
          url: "/eye-lid",
        },
        {
          title: "nav.prophylaxisItems",
          icon: ListChecks,
          url: "/prophylaxis-items",
        },
        {
          title: "nav.prophylaxisDetails",
          icon: Stethoscope,
          url: "/prophylaxis-details",
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
    //       title: "nav.prophylaxis",
    //       icon: Activity,
    //       url: "/prophylaxis",
    //     },
    //     {
    //       title: "nav.urineTests",
    //       icon: Beaker,
    //       url: "/urine-tests",
    //     },
    //     {
    //       title: "nav.dungTests",
    //       icon: Shovel,
    //       url: "/dung-tests",
    //     },
    //     {
    //       title: "nav.generalInspections",
    //       icon: Stethoscope,
    //       url: "/general-inspections",
    //     },
    //     {
    //       title: "nav.generalBloodTests",
    //       icon: Syringe,
    //       url: "/general-blood-tests",
    //     },
    //     {
    //       title: "nav.mucosaExams",
    //       icon: ScanEye,
    //       url: "/mucosa-exams",
    //     },
    //   ],
    // },
  ],
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