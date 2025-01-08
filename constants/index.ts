import { UserRole, InspectionType } from "~/lib/type";
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
} from "lucide-react";

export const FARMER_DATA_CARDS = [
  {
    title: "Data title 1",
    value: "4,000,000",
    icon: PawPrint,
    description: "Data description 1",
  },
  {
    title: "Data title 2",
    value: "1,200,000",
    icon: PawPrint,
    description: "Data description 2",
  },
  {
    title: "Data title 3",
    value: "3,400,000",
    icon: PawPrint,
    description: "Data description 3",
  },
  {
    title: "Data title 4",
    value: "1,00,200",
    icon: PawPrint,
    description: "Data description 4",
  },
];

export const GENDERS = [
  { name: "Erkak", value: "MALE" },
  { name: "Ayol", value: "FEMALE" },
];

export const BREED = [
  { name: "Sut", value: "MILK" },
  { name: "Go'sht", value: "MEAT" },
];

export const BLOOD_SERUM_TESTS = {
  totalProtein: "Umumiy oqsil",
  totalCalcium: "Umumiy kalsiy",
  organicPhosphorus: "Organik fosfor",
  albumen: "Albumin",
  alphaGlobulin: "Alfa globulin",
  betaGlobulin: "Alfa globulin",
  gammaGlobulin: "Gamma globulin",
  creatine: "Kreatin",
  alkalineReserve: "Ishqoriy zahira",
  glucose: "Glyukoza",
  totalBilirubin: "Umumiy Bilirubin",
  cholesterol: "Xolestrin",
  totalLipids: "Umumiy lipidlar",
  vitaminA: "A vitamin",
  vitaminB: "B vitamin",
  lacticAcid: "Sut kislotasi",
  pyruvicAcid: "Pirouzum kislotasi",
  urea: "Karbamid",
  citricAcid: "Limon kislotasi",
  ureaAcid: "Karbamid kislotasi",
};

export const GENERAL_BLOOD_TESTS = {
  coe: "COE",
  leukocyteCount: "Leykotsitlar soni",
  erythrocyteCount: "Eritrotsitlar soni",
  thrombocyteCount: "Trombotsitlar soni",
  hemoglobin: "Gemoglobin",
  glutathione: "Glutation",
  waterPercentage: "Suv foizi",
  dryResiduePercentage: "Quruq qoldiq ulushi",
};

export const CLARITY_TYPES = {
  CLEAR: "Tiniq",
  NOT_CLEAR: "Rasvo",
};

export const SMELLL_TYPES = {
  PUNGENT: "Hidi o'tkir",
  WEAK: "Hidi kuchsiz",
  HAS: "Hidi bor",
  NO: "Hidsiz",
};

export const DUNG_FORMS = {
  NORMAL: "Norma",
  SOLID: "Qattiq",
  LIQUID: "Suyuq",
  MEDIUM: "O'rtacha",
};

export const CUSTOMER_TYPES = {
  MOBILE: "Harakatchan",
  CALM: "Tinch",
};

export const OBESITY_TYPES = {
  HIGH: "Yuqori",
  MEDIUM: "O'rtacha",
  LEAN: "O'rtachadan past",
  LOW: "Ozg'in",
  CACHEXIA: "Koxeksiya",
};

export const BODY_TYPES = {
  WEAK: "Kuchsiz",
  MEDIUM: "O'rtacha",
  STRONG: "Kuchli",
};

export const BODY_STRUCTURES = {
  COARSE: "Qo'pol",
  SLIM: "Bo'sh",
  DENSE: "Zich",
  WEAK: "Nozik",
};

export const INSPECTION_TYPES = {
  MORNING: "Ertalabki",
  EVENING: "Kechki",
  DISEASE: "Kasallik",
  GENERAL: "Umumiy",
};

export const ALERT_MESSAGES = {
  DATA_CREATED: "Ma'lumot muvaffaqiyatli yaratildi!",
  DATA_UPDATED: "Ma'lumot muvaffaqiyatli yangilandi!",
  DATA_DELETED: "Ma'lumot muvaffaqiyatli o'chirildi!",
  DATA_NOT_FOUND: "Ma'lumot topilmadi!",
  INVALID_INPUT: "Kiritilgan ma'lumot noto'g'ri!",
  ACCESS_DENIED: "Kirish taqiqlangan!",
  LOGIN_SUCCESS: "Muvaffaqiyatli kirildi!",
  LOGIN_FAILED: "Login yoki parol noto'g'ri!",
  PERMISSION_REQUIRED: "Ruxsat talab qilinadi!",
  SERVER_ERROR: "Serverda xatolik yuz berdi!",
  OPERATION_FAILED: "Amal bajarilmadi!",
  OPERATION_SUCCESS: "Amal muvaffaqiyatli bajarildi!",
  LOADING: "Yuklanmoqda...",
  SAVING: "Saqlanmoqda...",
  UPLOADING: "Yuklanmoqda...",
  NO_DATA: "Ma'lumot mavjud emas!",
  DELETE_CONFIRM: "Ushbu ma'lumotni o'chirmoqchimisiz?",
};

export const navLinks: Record<
  UserRole,
  { title: string; icon: any; url: string }[]
> = {
  ADMIN: [
    {
      title: "Bosh sahifa",
      icon: LayoutDashboard,
      url: "/admin",
    },
    {
      title: "Veterinarlar",
      icon: Users,
      url: "/veterinarians",
    },
    {
      title: "Hayvon turlari",
      icon: PawPrint,
      url: "/animal-types",
    },
    {
      title: "Ranglar",
      icon: Palette,
      url: "/animal-colors",
    },
    {
      title: "Viloyatlar",
      icon: Map,
      url: "/regions",
    },
    {
      title: "Tumanlar",
      icon: MapPinned,
      url: "/districts",
    },
    {
      title: "Vet Stansiyalar",
      icon: MapPin,
      url: "/vetstations",
    },
    {
      title: "Vaksina turlari",
      icon: Cross,
      url: "/vaccine-types",
    },
    {
      title: "Kasallik turlari",
      icon: Activity,
      url: "/disease-types",
    },
    {
      title: "Siydik ranglari",
      icon: Palette,
      url: "/urine-colors",
    },
    {
      title: "Tezak ranglari",
      icon: Palette,
      url: "/dung-colors",
    },
  ],
  FARMER: [
    {
      title: "Bosh sahifa",
      icon: LayoutDashboard,
      url: "/farmer",
    },
    {
      title: "Hayvonlar",
      icon: PawPrint,
      url: "/animals",
    },
    {
      title: "Siydik tekshiruvi",
      icon: FlaskConical,
      url: "/urine-tests",
    },
    {
      title: "Tezak tekshiruvi",
      icon: Shovel,
      url: "/dung-tests",
    },
    {
      title: "Kasallik",
      icon: ScanHeart,
      url: "/diseases",
    },
    {
      title: "Vaksinalar",
      icon: PillBottle,
      url: "/vaccines",
    },
    {
      title: "Umumiy tekshiruv",
      icon: HeartPulse,
      url: "/general-inspections",
    },
    {
      title: "Tekshiruv",
      icon: Activity,
      url: "/inspections",
    },
    {
      title: "Umumiy qon tahlili",
      icon: Syringe,
      url: "/general-blood-tests",
    },
    {
      title: "Qon serum tahlili",
      icon: FlaskRound,
      url: "/blood-serum-tests",
    },
  ],
  VETERINARIAN: [
    {
      title: "Bosh sahifa",
      icon: LayoutDashboard,
      url: "/veterinarian",
    },
    {
      title: "Fermerlar",
      icon: CircleUserRound,
      url: "/farmers",
    },
    {
      title: "Umumiy tekshiruv",
      icon: HeartPulse,
      url: "/general-inspections",
    },
    {
      title: "Tekshiruv",
      icon: Activity,
      url: "/inspections",
    },
    {
      title: "Umumiy qon tahlili",
      icon: Syringe,
      url: "/general-blood-tests",
    },
    {
      title: "Hayvonlar",
      icon: PawPrint,
      url: "/animals",
    },
    {
      title: "Qon serum tahlili",
      icon: FlaskRound,
      url: "/blood-serum-tests",
    },
    {
      title: "Siydik tekshiruvi",
      icon: FlaskConical,
      url: "/urine-tests",
    },
    {
      title: "Tezak tekshiruvi",
      icon: Shovel,
      url: "/dung-tests",
    },
    {
      title: "Kasallik",
      icon: ScanHeart,
      url: "/diseases",
    },
    {
      title: "Вакцина",
      icon: PillBottle,
      url: "/vaccines",
    },
  ],
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
      title: "Boshqaruvlar",
      icon: FolderCog,
      items: [
        // {
        //   title: "Bosh sahifa",
        //   icon: LayoutDashboard,
        //   url: "/admin",
        // },

        {
          title: "Hayvon turlari",
          icon: PawPrint,
          url: "/animal-types",
        },
        {
          title: "Vaksina turlari",
          icon: Cross,
          url: "/vaccine-types",
        },
        {
          title: "Kasallik turlari",
          icon: Activity,
          url: "/disease-types",
        },

        {
          title: "Havvon ranglari",
          icon: Palette,
          url: "/animal-colors",
        },
        {
          title: "Siydik ranglari",
          icon: Palette,
          url: "/urine-colors",
        },
        {
          title: "Tezak ranglari",
          icon: Palette,
          url: "/dung-colors",
        },

        {
          title: "Viloyatlar",
          icon: Map,
          url: "/regions",
        },
        {
          title: "Tumanlar",
          icon: MapPinned,
          url: "/districts",
        },
        {
          title: "Vet Stansiyalar",
          icon: MapPin,
          url: "/vetstations",
        },

        {
          title: "Ko'z qopqoqlari",
          icon: ScanEye,
          url: "/eye-lid",
        },
        {
          title: "Teri qoplamalari",
          icon: Disc,
          url: "/leather-cover",
        },
      ],
    },
    {
      title: "Foydalanuvchilar",
      icon: Users,
      items: [
        {
          title: "Veterinarlar",
          icon: Users,
          url: "/veterinarians",
        },
        {
          title: "Fermerlar",
          icon: Users,
          url: "/farmers",
        },
      ],
    },
    {
      title: "Hayvonlar",
      icon: PawPrint,
      items: [
        {
          title: "Hayvonlar",
          icon: PawPrint,
          url: "/animals",
        },
      ],
    },
    {
      title: "Tekshiruvlar",
      icon: HeartPulse,
      items: [
        {
          title: "Kasalliklar",
          icon: ScanHeart,
          url: "/diseases",
        },
        {
          title: "Siydik tekshiruvlari",
          icon: FlaskConical,
          url: "/urine-tests",
        },
        {
          title: "Tezak tekshiruvlari",
          icon: Shovel,
          url: "/dung-tests",
        },
        {
          title: "Vaksinalar",
          icon: PillBottle,
          url: "/vaccines",
        },
        {
          title: "Umumiy tekshiruvlar",
          icon: HeartPulse,
          url: "/general-inspections",
        },
        {
          title: "Tekshiruvlar",
          icon: Activity,
          url: "/inspections",
        },
        {
          title: "Umumiy qon tahlillari",
          icon: Syringe,
          url: "/general-blood-tests",
        },
        {
          title: "Qon serum tahlillari",
          icon: FlaskRound,
          url: "/blood-serum-tests",
        },
      ],
    },
  ],
  FARMER: [
    {
      isActive: true,
      title: "Boshqaruv",
      icon: FolderCog,
      items: [
        // {
        //   title: "Bosh sahifa",
        //   icon: LayoutDashboard,
        //   url: "/farmer",
        // },
        {
          title: "Hayvonlar",
          icon: PawPrint,
          url: "/animals",
        },
      ],
    },
    {
      title: "Tekshiruvlar",
      icon: HeartPulse,
      items: [
        {
          title: "Kasalliklar",
          icon: ScanHeart,
          url: "/diseases",
        },
        {
          title: "Siydik tekshiruvlari",
          icon: FlaskConical,
          url: "/urine-tests",
        },
        {
          title: "Tezak tekshiruvlari",
          icon: Shovel,
          url: "/dung-tests",
        },
        {
          title: "Vaksinalar",
          icon: PillBottle,
          url: "/vaccines",
        },
        {
          title: "Umumiy tekshiruvlar",
          icon: HeartPulse,
          url: "/general-inspections",
        },
        {
          title: "Tekshiruvlar",
          icon: Activity,
          url: "/inspections",
        },
        {
          title: "Umumiy qon tahlillari",
          icon: Syringe,
          url: "/general-blood-tests",
        },
        {
          title: "Qon serum tahlillari",
          icon: FlaskRound,
          url: "/blood-serum-tests",
        },
      ],
    },
  ],
  VETERINARIAN: [
    {
      isActive: true,
      title: "Boshqaruv",
      icon: FolderCog,
      items: [
        // {
        //   title: "Bosh sahifa",
        //   icon: LayoutDashboard,
        //   url: "/veterinarian",
        // },
        {
          title: "Fermerlar",
          icon: Users,
          url: "/farmers",
        },
      ],
    },
    {
      title: "Tekshiruvlar",
      icon: HeartPulse,
      items: [
        {
          title: "Kasalliklar",
          icon: ScanHeart,
          url: "/diseases",
        },
        {
          title: "Siydik tekshiruvlari",
          icon: FlaskConical,
          url: "/urine-tests",
        },
        {
          title: "Tezak tekshiruvlari",
          icon: Shovel,
          url: "/dung-tests",
        },
        {
          title: "Vaksinalar",
          icon: PillBottle,
          url: "/vaccines",
        },
        {
          title: "Umumiy tekshiruvlar",
          icon: HeartPulse,
          url: "/general-inspections",
        },
        {
          title: "Tekshiruvlar",
          icon: Activity,
          url: "/inspections",
        },
        {
          title: "Umumiy qon tahlillari",
          icon: Syringe,
          url: "/general-blood-tests",
        },
        {
          title: "Qon serum tahlillari",
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
