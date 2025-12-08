import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  Role,
  Job,
  JobStatus,
  WageStatus,
  mockJobs,
  mockUsers,
  User,
} from "@/data/mockData";

interface AppContextType {
  currentRole: Role | null;
  currentUser: User | null;
  jobs: Job[];
  setCurrentRole: (role: Role | null) => void;
  setCurrentUser: (user: User | null) => void;
  updateJobStatus: (jobId: string, status: JobStatus) => void;
  updateWageStatus: (jobId: string, status: WageStatus) => void;
  updateWagePaid: (jobId: string, paid: boolean) => void;
  getOperatorJobs: (operatorId: string) => Job[];
  getFarmerJobs: (farmerId: string) => Job[];
  getOwnerJobs: (ownerId: string) => Job[];
  getTodayJobs: (operatorId: string) => Job[];
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [jobs, setJobs] = useState<Job[]>(mockJobs);

  const updateJobStatus = (jobId: string, status: JobStatus) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === jobId ? { ...job, status } : job)),
    );
  };

  const updateWageStatus = (jobId: string, wageStatus: WageStatus) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === jobId ? { ...job, wageStatus } : job)),
    );
  };

  const updateWagePaid = (jobId: string, wagePaid: boolean) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === jobId ? { ...job, wagePaid } : job)),
    );
  };

  const getOperatorJobs = (operatorId: string) => {
    return jobs.filter((job) => job.operatorId === operatorId);
  };

  const getFarmerJobs = (farmerId: string) => {
    return jobs.filter((job) => job.farmerId === farmerId);
  };

  const getOwnerJobs = (ownerId: string) => {
    return jobs.filter((job) => job.ownerId === ownerId);
  };

  const getTodayJobs = (operatorId: string) => {
    const today = new Date().toISOString().split("T")[0];
    return jobs.filter(
      (job) => job.operatorId === operatorId && job.date === today,
    );
  };

  const logout = () => {
    setCurrentRole(null);
    setCurrentUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        currentUser,
        jobs,
        setCurrentRole,
        setCurrentUser,
        updateJobStatus,
        updateWageStatus,
        updateWagePaid,
        getOperatorJobs,
        getFarmerJobs,
        getOwnerJobs,
        getTodayJobs,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
