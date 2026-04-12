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
  adminId: number;
};

export interface AdditionalCrudModel {
  id: string;
  name: { ru: string; uz: string; };
  
  animalTypeId: string;
  animalType: AnimalType;
}

export interface PredictBody {
  params: [
    number, // | x₁  | Температура, °C            | ClinicalExam  | temperature               | ✅     |
    number, // | x₂  | Пульс                      | ClinicalExam  | pulse                     | ✅     |
    number, // | x₃  | Дыхание                    | ClinicalExam  | respiratoryRate           | ✅     |
    number, // | x₄  | Румминация                 | ClinicalExam  | rumination                | ✅     |
    number, // | x₅  | Эритроциты                 | BloodExam     | erythrocyteCount          | ✅     |
    number, // | x₆  | Гемоглобин                 | BloodExam     | hemoglobin                | ✅     |
    number, // | x₇  | Общий белок                | BloodExam     | totalProtein              | ✅     |
    number, // | x₈  | Кальций                    | BloodExam     | totalCalcium              | ✅     |
    number, // | x₉  | Фосфор                     | BloodExam     | organicPhosphorus         | ✅     |
    number, // | x₁₀ | Глюкоза                    | BloodExam     | glucose                   | ✅     |
    number, // | x₁₁ | Резервная щелочь           | BloodExam     | alkalineReserve           | ✅     |
    number, // | x₁₂ | Медь                       | BloodExam     | copper                    | ✨ NEW |
    number, // | x₁₃ | Кобальт                    | BloodExam     | cobalt                    | ✨ NEW |
    number, // | x₁₄ | Марганец                   | BloodExam     | manganese                 | ✨ NEW |
    number, // | x₁₅ | Цинк                       | BloodExam     | zinc                      | ✨ NEW |
    number, // | x₁₆ | Инфузории рубца            | ClinicalExam  | rumenInfusoriaCount       | ✨ NEW |
    number, // | x₁₇ | Состояние рубца            | ClinicalExam  | rumenFluidState           
  ]
}
export type AlertSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type AlertStatus = "NEW" | "ACKNOWLEDGED" | "RESOLVED";

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "VETERINARIAN" | "FARMER";

export type UserGender = "MALE" | "FEMALE";

export type ProphylaxisType = "VACCINE" | "IMMUNIZATION" | "DEWORMING";

export type SessionStatus = "DRAFT" | "READY" | "SUBMITTED";

export interface ReferenceRange {
  id: string;
  animalTypeId: string;
  animalType: AnimalType;
  parameter: string;
  minValue: number;
  maxValue: number;
  unit?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AnomalyAlert {
  id: string;
  animalId: string;
  animal: Animal;
  sessionId: string;
  session: MedicalSession;
  parameter: string;
  value: number;
  minNorm: number;
  maxNorm: number;
  severity: AlertSeverity;
  status: AlertStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  avatar?: string | null;
  gender?: UserGender | null;
  birthDate?: Date | null;
  address?: string | null;
  role: UserRole;
  districtId: string;
  district: District;
  refreshTokenHash?: string | null;
  tokenExpiresAt?: Date | null;
  isActive: boolean;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  veterinarianProfile?: VetProfile | null;
  farmerProfile?: FarmerProfile | null;
}

export interface VetProfile {
  id: string;
  user: User;
  licenseNumber?: string | null;
  specialization?: string | null;
  experience?: number | null;
  farmers: FarmerProfile[];
  medicalSessions: MedicalSession[];
  feedbacks: Feedback[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FarmerProfile {
  id: string;
  user: User;
  veterinarianId: string;
  veterinarian: VetProfile;
  farmName?: string | null;
  farmSize?: number | null;
  animals: Animal[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BloodExam {
  id: string;
  animalId?: string | null;
  animal?: Animal | null;
  sessionId?: string | null;
  session?: MedicalSession | null;
  coe?: number | null;
  erythrocyteCount?: number | null;
  leukocyteCount?: number | null;
  thrombocyteCount?: number | null;
  hemoglobin?: number | null;
  glutathione?: number | null;
  waterPercentage?: number | null;
  dryResidue?: number | null;
  totalProtein?: number | null;
  totalCalcium?: number | null;
  organicPhosphorus?: number | null;
  albumin?: number | null;
  alphaGlobulin?: number | null;
  betaGlobulin?: number | null;
  gammaGlobulin?: number | null;
  residualNitrogen?: number | null;
  urea?: number | null;
  uricAcid?: number | null;
  creatine?: number | null;
  creatinine?: number | null;
  alkalineReserve?: number | null;
  glucose?: number | null;
  ketoneBodies?: number | null;
  totalBilirubin?: number | null;
  directBilirubin?: number | null;
  totalCholesterol?: number | null;
  totalLipids?: number | null;
  phospholipids?: number | null;
  lacticAcid?: number | null;
  pyruvicAcid?: number | null;
  citricAcid?: number | null;
  carotene?: number | null;
  vitaminA?: number | null;
  vitaminB?: number | null;
  vitaminC?: number | null;
  copper?: number | null;
  cobalt?: number | null;
  manganese?: number | null;
  zinc?: number | null;
  conclusion?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClinicalExam {
  id: string;
  animalId: string;
  animal: Animal;
  sessionId?: string | null;
  session?: MedicalSession | null;
  pulse?: number | null;
  rumination?: number | null;
  temperature?: number | null;
  respiratoryRate?: number | null;
  bodyTypeId?: string | null;
  bodyType?: BodyType | null;
  obesityId?: string | null;
  obesity?: ObesityType | null;
  bodyPositionId?: string | null;
  bodyPosition?: BodyPosition | null;
  constitutionId?: string | null;
  constitution?: Constitution | null;
  temperamentId?: string | null;
  temperament?: Temperament | null;
  woolId?: string | null;
  wool?: WoolType | null;
  downId?: string | null;
  down?: DownType | null;
  hairId?: string | null;
  hair?: HairType | null;
  feathersId?: string | null;
  feathers?: FeatherType | null;
  skinColorId?: string | null;
  skinColor?: SkinColor | null;
  skinHumidityId?: string | null;
  skinHumidity?: SkinHumidity | null;
  skinSmellId?: string | null;
  skinSmell?: SkinSmell | null;
  skinTemp?: SkinTemp | null;
  skinTempId?: string | null;
  skinSurfaceId?: string | null;
  skinSurface?: SkinSurface | null;
  skinElasticityId?: string | null;
  skinElasticity?: SkinElasticity | null;
  skinSensitivityId?: string | null;
  skinSensitivity?: SkinSensitivity | null;
  skinPainId?: string | null;
  skinPain?: SkinPain | null;
  lymphSizeId?: string | null;
  lymphSize?: LymphSize | null;
  lymphShapeId?: string | null;
  lymphShape?: LymphShape | null;
  lymphSurfaceId?: string | null;
  lymphSurface?: LymphSurface | null;
  lymphConsistencyId?: string | null;
  lymphConsistency?: LymphConsistency | null;
  lymphTempId?: string | null;
  lymphTemp?: LymphTemp | null;
  lymphPainId?: string | null;
  lymphPain?: LymphPain | null;
  lymphMobilityId?: string | null;
  lymphMobility?: LymphMobility | null;
  rumenInfusoriaCount?: number | null;
  rumenFluidStateId?: string | null;
  rumenFluidState?: RumenFluidState | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface BodyType {
  id: string;
  name: any;
  numericValue: number;
  clinicalExams: ClinicalExam[];
}

export interface ObesityType {
  id: string;
  name: any;
  numericValue: number;
  clinicalExams: ClinicalExam[];
}

export interface BodyPosition {
  id: string;
  name: any;
  numericValue: number;
  clinicalExams: ClinicalExam[];
}

export interface Constitution {
  id: string;
  name: any;
  numericValue: number;
  clinicalExams: ClinicalExam[];
}

export interface Temperament {
  id: string;
  name: any;
  numericValue: number;
  clinicalExams: ClinicalExam[];
}

export interface WoolType {
  id: string;
  name: any;
  numericValue: number;
  clinicalExams: ClinicalExam[];
}

export interface DownType {
  id: string;
  name: any;
  numericValue: number;
  clinicalExams: ClinicalExam[];
}

export interface HairType {
  id: string;
  name: any;
  numericValue: number;
  clinicalExams: ClinicalExam[];
}

export interface FeatherType {
  id: string;
  name: any;
  numericValue: number;
  clinicalExams: ClinicalExam[];
}

export interface SkinColor {
  id: string;
  name: any;
  numericValue: number;
  clinicalExams: ClinicalExam[];
}

export interface SkinHumidity {
  id: string;
  name: any;
  numericValue: number;
  clinicalExams: ClinicalExam[];
}

export interface SkinTemp {
  id: string;
  name: any;
  numericValue: number;
  clinicalExams: ClinicalExam[];
}

export interface SkinElasticity {
  id: string;
  name: any;
  numericValue: number;
  clinicalExams: ClinicalExam[];
}

export interface SkinSmell {
  id: string;
  name: any;
  numericValue: number;
  clinicalExams: ClinicalExam[];
}

export interface SkinSurface {
  id: string;
  name: any;
  numericValue: number;
  clinicalExams: ClinicalExam[];
}

export interface SkinSensitivity {
  id: string;
  name: any;
  numericValue: number;
  clinicalExams: ClinicalExam[];
}

export interface SkinPain {
  id: string;
  name: any;
  numericValue: number;
  clinicalExams: ClinicalExam[];
}

export interface RumenFluidState {
  id: string;
  name: any;
  numericValue: number;
  clinicalExams: ClinicalExam[];
}

export interface LymphSize {
  id: string;
  name: any;
  numericValue: number;
  clinicalExams: ClinicalExam[];
}

export interface LymphShape {
  id: string;
  name: any;
  numericValue: number;
  clinicalExams: ClinicalExam[];
}

export interface LymphSurface {
  id: string;
  name: any;
  numericValue: number;
  clinicalExams: ClinicalExam[];
}

export interface LymphConsistency {
  id: string;
  name: any;
  numericValue: number;
  clinicalExams: ClinicalExam[];
}

export interface LymphTemp {
  id: string;
  name: any;
  numericValue: number;
  clinicalExams: ClinicalExam[];
}

export interface LymphPain {
  id: string;
  name: any;
  numericValue: number;
  clinicalExams: ClinicalExam[];
}

export interface LymphMobility {
  id: string;
  name: any;
  numericValue: number;
  clinicalExams: ClinicalExam[];
}

export interface FecesExam {
  id: string;
  animalId?: string | null;
  animal?: Animal | null;
  sessionId?: string | null;
  session?: MedicalSession | null;
  fecesColorId?: string | null;
  fecesColor?: FecesColor | null;
  fecesSmellId?: string | null;
  fecesSmell?: FecesSmell | null;
  fecesConsistencyId?: string | null;
  fecesConsistency?: FecesConsistency | null;
  fecesFormId?: string | null;
  fecesForm?: FecesForm | null;
  amount?: number | null;
  undigestedFood?: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface FecesColor {
  id: string;
  name: any;
  numericValue: number;
  animalTypeId: string;
  animalType: AnimalType;
  fecesAnalyses: FecesExam[];
}

export interface FecesSmell {
  id: string;
  name: any;
  numericValue: number;
  animalTypeId: string;
  animalType: AnimalType;
  fecesAnalyses: FecesExam[];
}

export interface FecesConsistency {
  id: string;
  name: any;
  numericValue: number;
  animalTypeId: string;
  animalType: AnimalType;
  fecesAnalyses: FecesExam[];
}

export interface FecesForm {
  id: string;
  name: any;
  numericValue: number;
  animalTypeId: string;
  animalType: AnimalType;
  fecesAnalyses: FecesExam[];
}

export interface AnimalSex {
  id: string;
  name: any;
  numericValue: number;
  animals: Animal[];
  animalTypes: AnimalType[];
}

export interface Animal {
  id: string;
  arrivalDate: Date;
  birthDate: Date;
  sexId?: string | null;
  sex?: AnimalSex | null;
  animalNameCode: string;
  farmerId?: string | null;
  farmer?: FarmerProfile | null;
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
  medicalSessions: MedicalSession[];
  anomalyAlerts: AnomalyAlert[];
}

export interface AnimalType {
  id: string;
  name: any;
}

export interface Breed {
  id: string;
  name: any;
  animals: Animal[];
}

export interface Color {
  id: string;
  name: any;
  animals: Animal[];
}

export interface Region {
  id: number;
  name: any;
  districts: District[];
}

export interface District {
  id: string;
  name: any;
  regionId: number;
  region: Region;
  users: User[];
  vetStations: VetStation[];
}

export interface VetStation {
  id: string;
  name: any;
  address: string;
  districtId: string;
  district: District;
  createdAt: Date;
  updatedAt: Date;
}

export interface Disease {
  id: string;
  name: any;
  diseaseCategoryId: string;
  diseaseCategory: DiseaseCategory;
  createdAt: Date;
  updatedAt: Date;
  animals: Animal[];
  feedbacks: Feedback[];
}

export interface DiseaseCategory {
  id: string;
  name: any;
  parentId?: string | null;
  parent?: DiseaseCategory | null;
  diseases: Disease[];
  children: DiseaseCategory[];
}

export interface Prophylaxis {
  id: string;
  type: ProphylaxisType;
  animalId: string;
  animal: Animal;
  notes?: string;
  itemId: string;
  item: ProphylaxisItem;
  detailId?: string | null;
  detail?: ProphylaxisDetail | null;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProphylaxisItem {
  id: string;
  name: any;
  type: ProphylaxisType;
  records: Prophylaxis[];
  details: ProphylaxisDetail[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProphylaxisDetail {
  id: string;
  name: any;
  itemId: string;
  item: ProphylaxisItem;
  records: Prophylaxis[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MucosaExam {
  id: string;
  mucosaTypeId?: string | null;
  mucosaType?: MucosaType | null;
  animalId?: string | null;
  animal?: Animal | null;
  sessionId?: string | null;
  session?: MedicalSession | null;
  mucosaAppearanceId?: string | null;
  mucosaAppearance?: MucosaAppearance | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface MucosaType {
  id: string;
  name: any;
  numericValue: number;
  mucosaExams: MucosaExam[];
  mucosaAppearances: MucosaAppearance[];
}

export interface MucosaAppearance {
  id: string;
  name: any;
  numericValue: number;
  mucosaTypeId?: string | null;
  mucosaType?: MucosaType | null;
  animalTypeId: string;
  animalType: AnimalType;
  mucosaAnalyses: MucosaExam[];
}

export interface MedicalSession {
  id: string;
  animalId: string;
  animal: Animal;
  veterinarianId?: string | null;
  veterinarian?: VetProfile | null;
  date: Date;
  status: SessionStatus;
  notes?: string | null;
  clinicalExam?: ClinicalExam | null;
  bloodExam?: BloodExam | null;
  urineExam?: UrineExam | null;
  fecesExam?: FecesExam | null;
  mucosaExams: MucosaExam[];
  prediction?: Prediction | null;
  anomalyAlerts: AnomalyAlert[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Prediction {
  id: string;
  sessionId: string;
  session: MedicalSession;
  inputVector: number[];
  rawOutput: Record<string, number>;
}

export interface Feedback {
  id: string;
  predictionId: string;
  prediction: Prediction;
  veterinarianId: string;
  veterinarian: VetProfile;
  rating: number;
  comment?: string | null;
  suggestedDiseaseId?: string | null;
  suggestedDisease?: Disease | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UrineExam {
  id: string;
  animalId?: string | null;
  animal?: Animal | null;
  sessionId?: string | null;
  session?: MedicalSession | null;
  urineColorId?: string | null;
  urineColor?: UrineColor | null;
  amount?: number | null;
  urineClarityId?: string | null;
  urineClarity?: UrineClarity | null;
  urineConsistencyId?: string | null;
  urineConsistency?: UrineConsistency | null;
  urineSmellId?: string | null;
  urineSmell?: UrineSmell | null;
  ph?: number | null;
  acetone?: number | null;
  protein?: number | null;
  bilirubin?: number | null;
  urobilinogen?: number | null;
  sugar?: number | null;
  leukocytes?: number | null;
  epithelium?: number | null;
  microbialBodies?: number | null;
  erythrocytes?: number | null;
  saltCrystals?: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UrineColor {
  id: string;
  name: any;
  numericValue: number;
  animalTypeId: string;
  animalType: AnimalType;
  urineTests: UrineExam[];
}

export interface UrineSmell {
  id: string;
  name: any;
  numericValue: number;
  animalTypeId: string;
  animalType: AnimalType;
  urineAnalyses: UrineExam[];
}

export interface UrineClarity {
  id: string;
  name: any;
  numericValue: number;
  animalTypeId: string;
  animalType: AnimalType;
  urineAnalyses: UrineExam[];
}

export interface UrineConsistency {
  id: string;
  name: any;
  numericValue: number;
  animalTypeId: string;
  animalType: AnimalType;
  urineAnalyses: UrineExam[];
}

