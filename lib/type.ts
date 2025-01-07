export type UserData = {
  userId: number
  userRole: UserRole
  
  farmerId: number
  veterinarianId: number
}


export type UserRole = "ADMIN" | "VETERINARIAN" | "FARMER";

export type Gender = "MALE" | "FEMALE";

export type Breed = "MEAT" | "MILK";

export type BodyType = "WEAK" | "MEDIUM" | "STRONG";

export type ObesityType = "HIGH" | "MEDIUM" | "LOW" | "LEAN" | "CACHEXIA";

export type BodyStructure = "COARSE" | "SLIM" | "DENSE" | "WEAK";

export type CustomerType = "MOBILE" | "CALM";

export type InspectionType = "MORNING" | "EVENING" | "DISEASE" | "GENERAL";

export type SmellType = "PUNGENT" | "WEAK" | "HAS" | "NO";

export type DungForm = "NORMAL" | "SOLID" | "LIQUID" | "MEDIUM";

export type UrineClarity = "CLEAR" | "NOT_CLEAR";

export type DungClarity = "CLEAR" | "NOT_CLEAR";

export interface Animal {
  id: number;
  idCode: string;
  arrivalDate: Date;
  farmerId: number;
  farmer: Farmer;
  typeId: number;
  type: AnimalType;
  name: string;
  gender: Gender;
  breed: Breed;
  birthDate: Date;
  weight: number;
  colorId: number;
  color: Color;
  createdAt: Date;
  updatedAt: Date;
  vaccines: Vaccine[];
  diseases: Disease[];
  generalInspection: GeneralInspection[];
  generalBloodTests: GeneralBloodTest[];
  bloodSerumTests: BloodSerumTest[];
  inspection: Inspection[];
  urineTests: UrineTest[];
  dungTests: DungTest[];
}

export interface Vaccine {
  id: number;
  date: Date;
  typeId: number;
  type: VaccineType;
  animalId: number;
  animal: Animal;
  createdAt: Date;
  updatedAt: Date;
}

export interface GeneralInspection {
  id: number;
  animalId: number;
  animal: Animal;
  bodyType: BodyType;
  bodyStructure: BodyStructure;
  obesity: ObesityType;
  customerType: CustomerType;
  leatherCoverId: number;
  leatherCover: LeatherCover;
  eyelidId: number;
  eyelid: Eyelid;
  colorId: number;
  color: Color;
  createdAt: Date;
  updatedAt: Date;
  inspection?: Inspection | null;
}

export interface Inspection {
  id: number;
  animalId?: number | null;
  animal?: Animal | null;
  diseaseId?: number | null;
  disease?: Disease | null;
  generalInspectionId?: number | null;
  generalInspection?: GeneralInspection | null;
  temperature?: number | null;
  pulse?: number | null;
  respiratoryRate?: number | null;
  rumination?: number | null;
  type: InspectionType;
  conclusion?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Disease {
  id: number;
  animalId: number;
  animal: Animal;
  typeId: number;
  type: DiseaseType;
  startTime: Date;
  endTime: Date;
  conclusion?: string | null;
  createdAt: Date;
  updatedAt: Date;
  inspections: Inspection[];
  urineTests: UrineTest[];
  dungTests: DungTest[];
}

export interface GeneralBloodTest {
  id: number;
  date: Date;
  conclusion?: string | null;
  erythrocyteCount?: number | null;
  leukocyteCount?: number | null;
  thrombocyteCount?: number | null;
  coe?: number | null;
  waterPercentage?: number | null;
  dryResiduePercentage?: number | null;
  hemoglobin?: number | null;
  glutathione?: number | null;
  animalId: number;
  animal: Animal;
  createdAt: Date;
  updatedAt: Date;
}

export interface BloodSerumTest {
  id: number;
  totalProtein?: number | null;
  totalCalcium?: number | null;
  organicPhosphorus?: number | null;
  albumen?: number | null;
  alphaGlobulin?: number | null;
  betaGlobulin?: number | null;
  gammaGlobulin?: number | null;
  creatine?: number | null;
  alkalineReserve?: number | null;
  glucose?: number | null;
  totalBilirubin?: number | null;
  cholesterol?: number | null;
  totalLipids?: number | null;
  vitaminA?: number | null;
  vitaminB?: number | null;
  lacticAcid?: number | null;
  pyruvicAcid?: number | null;
  citricAcid?: number | null;
  urea?: number | null;
  ureaAcid?: number | null;
  animalId: number;
  animal: Animal;
  createdAt: Date;
  updatedAt: Date;
}

export interface UrineTest {
  id: number;
  animalId?: number | null;
  animal?: Animal | null;
  diseaseId?: number | null;
  disease?: Disease | null;
  colorId: number;
  color: UrineColor;
  clarity: UrineClarity;
  consistency: number;
  smell: SmellType;
  createdAt: Date;
  updatedAt: Date;
}

export interface DungTest {
  id: number;
  animalId?: number | null;
  animal?: Animal | null;
  diseaseId?: number | null;
  disease?: Disease | null;
  colorId: number;
  color: DungColor;
  clarity: DungClarity;
  smell: SmellType;
  form: DungForm;
  consistency: number;
  worms: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Region {
  id: number;
  name: string;
  districts: District[];
}

export interface District {
  id: number;
  name: string;
  regionId: number;
  region: Region;
  users: User[];
  vetStations: VetStation[];
}

export interface VetStation {
  id: number;
  name: string;
  address: string;
  districtId: number;
  district: District;
  createdAt: Date;
  updatedAt: Date;
}

export interface AnimalType {
  id: number;
  name: string;
  animals: Animal[];
}

export interface Color {
  id: number;
  name: string;
  hex?: string | null;
  animals: Animal[];
  generalInspections: GeneralInspection[];
}

export interface UrineColor {
  id: number;
  name: string;
  urdineTests: UrineTest[];
}

export interface DungColor {
  id: number;
  name: string;
  dungTests: DungTest[];
}

export interface LeatherCover {
  id: number;
  name: string;
  generalInspections: GeneralInspection[];
}

export interface Eyelid {
  id: number;
  name: string;
  generalInspections: GeneralInspection[];
}

export interface VaccineType {
  id: number;
  name: string;
  vaccines: Vaccine[];
}

export interface DiseaseType {
  id: number;
  name: string;
  diseases: Disease[];
}

export interface User {
  id: number;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  gender?: Gender | null;
  birthDate?: Date | null;
  districtId: number;
  district: District;
  address?: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  veterinarianData?: Veterinarian | null;
  farmerData?: Farmer | null;
}

export interface Veterinarian {
  userPtrId: number;
  user: User;
  farmers: Farmer[];
}

export interface Farmer {
  userPtrId: number;
  user: User;
  veterinarianId: number;
  veterinarian: Veterinarian;
  animals: Animal[];
}