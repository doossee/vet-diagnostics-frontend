export interface MetaDateEntity {
  currentPage: number;
  lastPage: number;
  next: number;
  perPage: number;
  prev: number;
  total: number;
}

export interface PaginatedEntity<T> {
  data: T[];
  meta: MetaDateEntity;
}

export interface UpdateBody<T> {
  id: number | string;
  body: T;
}

export type LanguageLocales = "uz" | "ru";

export type QueryParams = {
  page?: number;
  perPage?: number;
  search?: string;
  id?: number | string;
  enabled?: boolean;
};

export type UserData = {
  userId: number;
  role: UserRole;

  farmerId: number;
  veterinarianId: number;
};

export interface AdditionalCrudModel {
  id: string;
  name_ru: string;
  name_uz: string;
  animalTypeId: string;
  animalType: AnimalType;
}

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "VETERINARIAN" | "FARMER";

export type UserGender = "MALE" | "FEMALE";

export type BodyType = "STRONG" | "MEDIUM" | "WEAK";

export type ObesityType = "HIGH" | "MEDIUM" | "LOW" | "CACHEXIA";

export type BodyPosition = "NATURAL" | "FORCED_STANDING" | "FORCED_LYING" | "FORCED_SITTING" | "NON_THERAPEUTIC" | "INVOLUNTARY" | "MANEGE" | "CIRCULAR" | "FORWARD" | "BACKWARD" | "ROLLING";

export type Constitution = "LOOSE" | "DENSE" | "HORSES" | "BIRDS";

export type Temperament = "MELANCHOLIC" | "PHLEGMATIC";

export type WoolType = "EVEN" | "UNEVEN" | "LYING_FLAT" | "SHINY" | "MATTE" | "NOT_FALLING" | "DISHEVELED" | "MATTED" | "BALD_PATCHES" | "THICK" | "SPARSE" | "PHYSIOLOGICAL_MOLT" | "PATHOLOGICAL_MOLT" | "FALLING" | "NOT_FALLING_OUT";

export type DownType = "DENSE" | "SPARSE" | "NONE" | "SOFT" | "SMOOTH" | "MATTE" | "SHINY" | "DRY" | "DUSTY" | "EVEN" | "WHITE" | "GRAY" | "YELLOWISH" | "DARK" | "MOIST";

export type HairType = "COARSE" | "SPARSE";

export type FeatherType = "SHINY" | "MATTE" | "FULL" | "FALLEN" | "BROKEN";

export type SkinColor = "PALE_VIOLET" | "PALE" | "RED" | "BLUE" | "YELLOW";

export type SkinHumidity = "MODERATE" | "HYPERHIDROSIS" | "LOCAL_SWEAT" | "DRY";

export type SkinTemp = "GENERAL_HIGH" | "LOCAL_HIGH" | "GENERAL_LOW" | "LOCAL_LOW" | "UNEVEN";

export type SkinElasticity = "ELASTIC" | "REDUCED" | "NONE";

export type LymphSize = "NORMAL" | "ENLARGED";

export type LymphShape = "FLAT" | "ROUND" | "ENLARGED" | "SWOLLEN";

export type LymphSurface = "SMOOTH" | "ROUGH";

export type LymphConsistency = "DENSE" | "SOFT" | "SPECIFIC";

export type LymphTemp = "NORMAL" | "ELEVATED";

export type LymphPain = "PAINLESS" | "PAINFUL";

export type LymphMobility = "MOBILE" | "LOW_MOBILITY";

export type UrineAnalysisType = "LABORATORY" | "MACROSCOPIC" | "MICROSCOPIC";

export type MucosaType = "ORAL" | "NASAL" | "OCULAR" | "REPRODUCTIVE";

export type AnimalSex = "MALE" | "FEMALE" | "NEUTERED" | "SPAYED" | "UNKNOWN";

export type ProphylaxisType = "VACCINE" | "IMMUNIZATION" | "DEWORMING";

export interface User {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  gender?: UserGender;
  birthDate?: Date;
  address?: string;
  role: UserRole;
  districtId: string;
  district: District;
  refreshTokenHash?: string;
  tokenExpiresAt?: Date;
  isActive: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  veterinarianProfile?: VetProfile;
  farmerProfile?: FarmerProfile;
}

export interface VetProfile {
  id: string;
  user: User;
  licenseNumber?: string;
  specialization?: string;
  experience?: number;
  farmers: FarmerProfile[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FarmerProfile {
  id: string;
  user: User;
  veterinarianId: string;
  veterinarian: VetProfile;
  farmName?: string;
  farmSize?: number;
  animals: Animal[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ClinicalExam {
  id: string;
  animalId: string;
  animal: Animal;
  pulse?: number;
  rumination?: number;
  temperature?: number;
  respiratoryRate?: number;
  bodyType?: BodyType;
  obesity?: ObesityType;
  bodyPosition?: BodyPosition;
  constitution?: Constitution;
  temperament?: Temperament;
  wool?: WoolType;
  down?: DownType;
  hair?: HairType;
  feathers?: FeatherType;
  skinColor?: SkinColor;
  skinHumidity?: SkinHumidity;
  skinSmell?: string;
  skinTemp?: SkinTemp;
  skinSurface?: string;
  skinElasticity?: SkinElasticity;
  skinSensitivity?: string;
  skinPain?: string;
  lymphSize?: LymphSize;
  lymphShape?: LymphShape;
  lymphSurface?: LymphSurface;
  lymphConsistency?: LymphConsistency;
  lymphTemp?: LymphTemp;
  lymphPain?: LymphPain;
  lymphMobility?: LymphMobility;
  createdAt: Date;
  updatedAt: Date;
}

export interface BloodExam {
  id: string;
  animalId?: string;
  animal?: Animal;
  coe?: number;
  erythrocyteCount?: number;
  leukocyteCount?: number;
  thrombocyteCount?: number;
  hemoglobin?: number;
  glutathione?: number;
  waterPercentage?: number;
  dryResidue?: number;
  totalProtein?: number;
  totalCalcium?: number;
  organicPhosphorus?: number;
  albumin?: number;
  alphaGlobulin?: number;
  betaGlobulin?: number;
  gammaGlobulin?: number;
  residualNitrogen?: number;
  urea?: number;
  uricAcid?: number;
  creatine?: number;
  creatinine?: number;
  alkalineReserve?: number;
  glucose?: number;
  ketoneBodies?: number;
  totalBilirubin?: number;
  directBilirubin?: number;
  totalCholesterol?: number;
  totalLipids?: number;
  phospholipids?: number;
  lacticAcid?: number;
  pyruvicAcid?: number;
  citricAcid?: number;
  carotene?: number;
  vitaminA?: number;
  vitaminB?: number;
  vitaminC?: number;
  conclusion?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UrineExam {
  id: string;
  analysisType: UrineAnalysisType;
  animalId?: string;
  animal?: Animal;
  urineColorId?: string;
  urineColor?: UrineColor;
  amount?: number;
  urineClarityId?: string;
  urineClarity?: UrineClarity;
  urineConsistencyId?: string;
  urineConsistency?: UrineConsistency;
  urineSmellId?: string;
  urineSmell?: UrineSmell;
  ph?: number;
  acetone?: number;
  protein?: number;
  bilirubin?: number;
  urobilinogen?: number;
  sugar?: number;
  leukocytes?: number;
  epithelium?: number;
  microbialBodies?: number;
  erythrocytes?: number;
  saltCrystals?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UrineColor {
  id: string;
  name_ru: string;
  name_uz: string;
  animalTypeId: string;
  animalType: AnimalType;
  urineTests: UrineExam[];
}

export interface UrineSmell {
  id: string;
  name_ru: string;
  name_uz: string;
  animalTypeId: string;
  animalType: AnimalType;
  urineAnalyses: UrineExam[];
}

export interface UrineClarity {
  id: string;
  name_ru: string;
  name_uz: string;
  animalTypeId: string;
  animalType: AnimalType;
  urineAnalyses: UrineExam[];
}

export interface UrineConsistency {
  id: string;
  name_ru: string;
  name_uz: string;
  animalTypeId: string;
  animalType: AnimalType;
  urineAnalyses: UrineExam[];
}

export interface FecesExam {
  id: string;
  animalId?: string;
  animal?: Animal;
  fecesColorId?: string;
  fecesColor?: FecesColor;
  fecesSmellId?: string;
  fecesSmell?: FecesSmell;
  fecesConsistencyId?: string;
  fecesConsistency?: FecesConsistency;
  fecesFormId?: string;
  fecesForm?: FecesForm;
  amount?: number;
  undigestedFood?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FecesColor {
  id: string;
  name_ru: string;
  name_uz: string;
  animalTypeId: string;
  animalType: AnimalType;
  fecesAnalyses: FecesExam[];
}

export interface FecesSmell {
  id: string;
  name_ru: string;
  name_uz: string;
  animalTypeId: string;
  animalType: AnimalType;
  fecesAnalyses: FecesExam[];
}

export interface FecesConsistency {
  id: string;
  name_ru: string;
  name_uz: string;
  animalTypeId: string;
  animalType: AnimalType;
  fecesAnalyses: FecesExam[];
}

export interface FecesForm {
  id: string;
  name_ru: string;
  name_uz: string;
  animalTypeId: string;
  animalType: AnimalType;
  fecesAnalyses: FecesExam[];
}

export interface MucosaExam {
  id: string;
  mucosaType: MucosaType;
  animalId?: string;
  animal?: Animal;
  mucosaAppearanceId?: string;
  mucosaAppearance?: MucosaAppearance;
  createdAt: Date;
  updatedAt: Date;
}

export interface MucosaAppearance {
  id: string;
  name_ru: string;
  name_uz: string;
  mucosaType: MucosaType;
  animalTypeId: string;
  animalType: AnimalType;
  mucosaAnalyses: MucosaExam[];
}

export interface Animal {
  id: string;
  arrivalDate: Date;
  age: number;
  sex: AnimalSex;
  farmerId: string;
  animalNameCode: string;
  farmer: FarmerProfile;
  animalTypeId: string;
  animalType: AnimalType;
  animalBreedId: string;
  animalBreed: Breed;
  animalColorId: string;
  animalColor: Color;
  createdAt: Date;
  updatedAt: Date;
  vaccines: Prophylaxis[];
  diseases: Disease[];
  urineAnalyses: UrineExam[];
  fecesAnalyses: FecesExam[];
  mucosaAnalyses: MucosaExam[];
  bloodAnalyses: BloodExam[];
  clinicalAnalyses: ClinicalExam[];
}

export interface AnimalType {
  id: string;
  name_ru: string;
  name_uz: string;
  parentId?: string;
  parent?: AnimalType;
  children: AnimalType[];
  animals: Animal[];
  urineColors: UrineColor[];
  urineSmells: UrineSmell[];
  urineClarities: UrineClarity[];
  urineConsistencies: UrineConsistency[];
  fecesColors: FecesColor[];
  fecesSmells: FecesSmell[];
  fecesConsistencies: FecesConsistency[];
  fecesForms: FecesForm[];
  mucosaAppearances: MucosaAppearance[];
  _count: {
    children: number
  }
}

export interface Breed {
  id: string;
  name_ru: string;
  name_uz: string;
  animals: Animal[];
}

export interface Color {
  id: string;
  name_ru: string;
  name_uz: string;
  animals: Animal[];
}

export interface Region {
  id: number;
  name_ru: string;
  name_uz: string;
  districts: District[];
}

export interface District {
  id: string;
  name_ru: string;
  name_uz: string;
  regionId: number;
  region: Region;
  users: User[];
  vetStations: VetStation[];
}

export interface VetStation {
  id: string;
  name_ru: string;
  name_uz: string;
  address: string;
  districtId: string;
  district: District;
  createdAt: Date;
  updatedAt: Date;
}

export interface Disease {
  id: string;
  name_ru: string;
  name_uz: string;
  diseaseCategoryId: string;
  diseaseCategory: DiseaseCategory;
  createdAt: Date;
  updatedAt: Date;
  animals: Animal[];
}

export interface DiseaseCategory {
  id: string;
  name_ru: string;
  name_uz: string;
  parentId?: string;
  parent?: DiseaseCategory;
  diseases: Disease[];
  hasChildren: boolean
  children: DiseaseCategory[];
}

export interface Prophylaxis {
  id: string;
  type: ProphylaxisType;
  animalId: string;
  animal: Animal;
  itemId: string;
  item: ProphylaxisItem;
  detailId?: string;
  detail?: ProphylaxisDetail;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProphylaxisItem {
  id: string;
  name_ru: string;
  name_uz: string;
  type: ProphylaxisType;
  records: Prophylaxis[];
  details: ProphylaxisDetail[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProphylaxisDetail {
  id: string;
  name_ru: string;
  name_uz: string;
  itemId: string;
  item: ProphylaxisItem;
  records: Prophylaxis[];
  createdAt: Date;
  updatedAt: Date;
}

