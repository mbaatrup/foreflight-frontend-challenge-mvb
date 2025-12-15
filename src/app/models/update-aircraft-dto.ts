export interface UpdateAircraftDto {
  aircraftType: string;
  tailNumber: string;
  comments?: string;
  isSuitedForPets: boolean;
  nextMaintenanceDate: string;
  serialNumber?: string;
  numberOfSeats: number;
  interiorCondition: number;
}
