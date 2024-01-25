// assets
import { _mock } from "./_mock";
import { $get, endpoints} from 'src/utils/axios';

// ----------------------------------------------------------------------
export const PMS_PERSONS_OPTIONS = [
    { value: "John Doe", label: "John Doe" },
    { value: "Sarah Walker", label: "Sarah Walker" },
];
  
export const PMS_STATUS_OPTIONS = [
  { value: "nodata", label: "No Data" },
  { value: "development", label: "Development" },
  { value: "production", label: "Production" },
  { value: "issues", label: "Issues" },
];

export const PMS_OS_OPTIONS = [
  { value: "Windows", label: "Windows" },
  { value: "MacOs", label: "Mac Os" },
];


export const PMS_DATABASE_OPTIONS = [
  { value: "mssql", label: "MSSQL" },
  { value: "None", label: "None" },
  
];


export const PMS_EXPORT_OPTIONS = [
  { value: "xml", label: "XML" },
  { value: "None", label: "None" },
];


export const PMS_VERSION_OPTIONS = [
  { value: "Base", label: "Base" },
  { value: "None", label: "None" },
 
];

