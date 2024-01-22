// assets
import { _mock } from "./_mock";
import { $get, endpoints} from 'src/utils/axios';

// ----------------------------------------------------------------------
export const CLINIC_STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export const CLINIC_DATEFORMAT_OPTIONS = [
  { value: "ymd", label: "ymd" },
  { value: "dmy", label: "dmy" },
];



export const CLINIC_DATE_OPTIONS = [
  { value: "EntryDate", label: "EntryDate" },
  { value: "ProcedureDate", label: "ProcedureDate" },
];


export const CLINIC_UNITAPPOINTMENTS_OPTIONS = [
  { value: "5", label: "5" },
  { value: "10", label: "10" },
  { value: "15", label: "15" },
  { value: "20", label: "20" },
];


export const CLINIC_TIMEZONE_OPTIONS = [
  { value: "+00:00", label: "+00:00" },
  { value: "+01:00", label: "+01:00" },
  { value: "+02:00", label: "+02:00" },
  { value: "+03:00", label: "+03:00" },
];


export const CLINIC_PERSONS_OPTIONS = [
  { value: "James Dohn", label: "James Dohn" },
  { value: "John Doe", label: "John Doe" },
  { value: "Sarah Walker", label: "Sarah Walker" },
];
