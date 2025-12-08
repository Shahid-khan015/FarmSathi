export type Role = "farmer" | "owner" | "operator";

export type JobStatus = "not_started" | "in_progress" | "completed";
export type WageStatus = "pending" | "approved" | "disputed";
export type MachineStatus = "active" | "idle" | "offline";

export interface User {
  id: string;
  name: string;
  phone: string;
  role: Role;
}

export interface Machine {
  id: string;
  name: string;
  type: "Tractor" | "Harvester" | "Plough" | "Seeder";
  ownerId: string;
  status: MachineStatus;
  engineHours: number;
  nextServiceDue: number;
}

export interface Job {
  id: string;
  fieldName: string;
  village: string;
  machineId: string;
  machineName: string;
  operatorId: string;
  operatorName: string;
  farmerId: string;
  farmerName: string;
  ownerId: string;
  date: string;
  status: JobStatus;
  wageStatus: WageStatus;
  distanceCovered: number;
  engineHours: number;
  fuelUsed: number;
  estimatedArea: number;
  rateType: "per_hour" | "per_distance";
  rateValue: number;
  estimatedWage: number;
  wagePaid: boolean;
}

export interface MaintenanceRecord {
  id: string;
  machineId: string;
  date: string;
  description: string;
  engineHoursAtService: number;
}

export const mockUsers: User[] = [
  { id: "op1", name: "Ramesh Kumar", phone: "9876543210", role: "operator" },
  { id: "op2", name: "Suresh Singh", phone: "9876543211", role: "operator" },
  { id: "f1", name: "Vijay Sharma", phone: "9876543212", role: "farmer" },
  { id: "f2", name: "Rajan Patel", phone: "9876543213", role: "farmer" },
  { id: "o1", name: "Mahesh Agarwal", phone: "9876543214", role: "owner" },
];

export const mockMachines: Machine[] = [
  {
    id: "m1",
    name: "Tractor #1",
    type: "Tractor",
    ownerId: "o1",
    status: "active",
    engineHours: 1250,
    nextServiceDue: 30,
  },
  {
    id: "m2",
    name: "Harvester #1",
    type: "Harvester",
    ownerId: "o1",
    status: "idle",
    engineHours: 890,
    nextServiceDue: 45,
  },
  {
    id: "m3",
    name: "Tractor #2",
    type: "Tractor",
    ownerId: "o1",
    status: "active",
    engineHours: 2100,
    nextServiceDue: 15,
  },
  {
    id: "m4",
    name: "Plough Unit",
    type: "Plough",
    ownerId: "o1",
    status: "offline",
    engineHours: 450,
    nextServiceDue: 60,
  },
];

export const mockJobs: Job[] = [
  {
    id: "j1",
    fieldName: "Field A",
    village: "Rampur",
    machineId: "m1",
    machineName: "Tractor #1",
    operatorId: "op1",
    operatorName: "Ramesh Kumar",
    farmerId: "f1",
    farmerName: "Vijay Sharma",
    ownerId: "o1",
    date: "2024-12-08",
    status: "completed",
    wageStatus: "approved",
    distanceCovered: 5.2,
    engineHours: 4.5,
    fuelUsed: 8.3,
    estimatedArea: 3.2,
    rateType: "per_hour",
    rateValue: 250,
    estimatedWage: 1125,
    wagePaid: true,
  },
  {
    id: "j2",
    fieldName: "Field B",
    village: "Sundarpur",
    machineId: "m1",
    machineName: "Tractor #1",
    operatorId: "op1",
    operatorName: "Ramesh Kumar",
    farmerId: "f2",
    farmerName: "Rajan Patel",
    ownerId: "o1",
    date: "2024-12-08",
    status: "in_progress",
    wageStatus: "pending",
    distanceCovered: 3.4,
    engineHours: 2.8,
    fuelUsed: 4.2,
    estimatedArea: 2.1,
    rateType: "per_hour",
    rateValue: 250,
    estimatedWage: 700,
    wagePaid: false,
  },
  {
    id: "j3",
    fieldName: "Field C",
    village: "Rampur",
    machineId: "m2",
    machineName: "Harvester #1",
    operatorId: "op2",
    operatorName: "Suresh Singh",
    farmerId: "f1",
    farmerName: "Vijay Sharma",
    ownerId: "o1",
    date: "2024-12-08",
    status: "not_started",
    wageStatus: "pending",
    distanceCovered: 0,
    engineHours: 0,
    fuelUsed: 0,
    estimatedArea: 4.5,
    rateType: "per_distance",
    rateValue: 300,
    estimatedWage: 1350,
    wagePaid: false,
  },
  {
    id: "j4",
    fieldName: "Field D",
    village: "Krishnapur",
    machineId: "m3",
    machineName: "Tractor #2",
    operatorId: "op1",
    operatorName: "Ramesh Kumar",
    farmerId: "f1",
    farmerName: "Vijay Sharma",
    ownerId: "o1",
    date: "2024-12-07",
    status: "completed",
    wageStatus: "pending",
    distanceCovered: 6.8,
    engineHours: 5.5,
    fuelUsed: 10.2,
    estimatedArea: 4.0,
    rateType: "per_hour",
    rateValue: 250,
    estimatedWage: 1375,
    wagePaid: false,
  },
  {
    id: "j5",
    fieldName: "Field E",
    village: "Sundarpur",
    machineId: "m1",
    machineName: "Tractor #1",
    operatorId: "op2",
    operatorName: "Suresh Singh",
    farmerId: "f2",
    farmerName: "Rajan Patel",
    ownerId: "o1",
    date: "2024-12-06",
    status: "completed",
    wageStatus: "disputed",
    distanceCovered: 4.2,
    engineHours: 3.5,
    fuelUsed: 6.1,
    estimatedArea: 2.5,
    rateType: "per_hour",
    rateValue: 250,
    estimatedWage: 875,
    wagePaid: false,
  },
  {
    id: "j6",
    fieldName: "Field F",
    village: "Rampur",
    machineId: "m2",
    machineName: "Harvester #1",
    operatorId: "op1",
    operatorName: "Ramesh Kumar",
    farmerId: "f1",
    farmerName: "Vijay Sharma",
    ownerId: "o1",
    date: "2024-12-05",
    status: "completed",
    wageStatus: "approved",
    distanceCovered: 7.5,
    engineHours: 6.0,
    fuelUsed: 12.0,
    estimatedArea: 5.0,
    rateType: "per_hour",
    rateValue: 300,
    estimatedWage: 1800,
    wagePaid: true,
  },
];

export const mockMaintenanceRecords: MaintenanceRecord[] = [
  {
    id: "mt1",
    machineId: "m1",
    date: "2024-11-15",
    description: "Oil change and filter replacement",
    engineHoursAtService: 1200,
  },
  {
    id: "mt2",
    machineId: "m1",
    date: "2024-10-01",
    description: "Full engine service",
    engineHoursAtService: 1100,
  },
  {
    id: "mt3",
    machineId: "m2",
    date: "2024-11-20",
    description: "Blade sharpening and belt replacement",
    engineHoursAtService: 850,
  },
  {
    id: "mt4",
    machineId: "m3",
    date: "2024-11-10",
    description: "Tire replacement and alignment",
    engineHoursAtService: 2050,
  },
];

export const disputeReasons = [
  "Distance measurement incorrect",
  "Area calculation incorrect",
  "Engine hours incorrect",
  "Work not completed properly",
  "Different rate agreed",
  "Other",
];
