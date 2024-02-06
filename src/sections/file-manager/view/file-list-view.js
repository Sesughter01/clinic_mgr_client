'use client';

import { useEffect, useState, useCallback } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// utils
import { fTimestamp } from 'src/utils/format-time';
import isEqual from 'lodash/isEqual';

import { LoadingScreen } from 'src/components/loading-screen';
// _mock
import { _allFiles, FILE_TYPE_OPTIONS } from 'src/_mock';
import { _folders, _files } from 'src/_mock';

//  API hooks

import {$post, $get, endpoints} from 'src/utils/axios';

// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

// routes
import { paths } from 'src/routes/paths';


import useSWR from 'swr';

// components
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { UploadBox } from 'src/components/upload';
import EmptyContent from 'src/components/empty-content';
import { fileFormat } from 'src/components/file-thumbnail';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import { useTable, getComparator } from 'src/components/table';
//
import FileManagerTable from '../file-manager-table';
import FileManagerFilters from '../file-manager-filters';
import FileManagerGridView from '../file-manager-grid-view';
import FileManagerFiltersResult from '../file-manager-filters-result';

import FileListTableRow from './file-list-view';
import FileWidget from '../file-widget';
import FileUpgrade from '../file-upgrade';
import FileDataActivity from '../file-data-activity';
import FileStorageOverview from '../file-storage-overview';
import FileManagerPanel from '../file-manager-panel';
import FileRecentItem from '../file-recent-item';
import FileManagerFolderItem from '../file-manager-folder-item';
import FileManagerNewFolderDialog from '../file-manager-new-folder-dialog';

import { useSnackbar } from 'src/components/snackbar';
import { useGetFile } from 'src/api/jail_files';


// ----------------------------------------------------------------------

const defaultFilters = {
  name: '',
  type: [],
  startDate: null,
  endDate: null,
};

// ----------------------------------------------------------------------


export default function FileListView({id}) {

  const URL = id ? endpoints.clinics.clinic + id + `/documents` : null;
  const table = useTable({ defaultRowsPerPage: 10 });

  const theme = useTheme();

  const settings = useSettingsContext();

  const smDown = useResponsive('down', 'sm');

  const [folderName, setFolderName] = useState('');

  const [files, setFiles] = useState([]);
  const { file, fileError, fileValidating } = useGetFile(id);
  const [fileLoading, setFileLoading] = useState(false);

  const newFolder = useBoolean();

  const { enqueueSnackbar } = useSnackbar();

  const handleChangeFolderName = useCallback((event) => {
    setFolderName(event.target.value);
  }, []);

  const handleCreateNewFolder = useCallback(() => {
    newFolder.onFalse();
    setFolderName('');
    console.info('CREATE NEW FOLDER');
  }, [newFolder]);

  // const handleDrop = useCallback(
  //   (acceptedFiles) => {
  //     const newFiles = acceptedFiles.map((file) =>
  //       Object.assign(file, {
  //         preview: URL.createObjectURL(file),
  //       })
  //     );

  //     setFiles([...files, ...newFiles]);
  //   },
  //   [file]
  // );



// ... other imports and code ...

// const handleDrop = useCallback(
//   async (acceptedFiles,jid) => {
//     try {
//       // Make a POST request using the Axios instance
//       const body = {files:acceptedFiles,id:jid};
//       $post(URL, body)
//       .then(res => window.location.reload())
//       .then(res=>enqueueSnackbar('File added  successfully!'))
//       // await new Promise((resolve) => setTimeout(resolve, 500));
//       // reset();
//       // onClose();
      
//     } catch (error) {
//       console.error('Error uploading files:', error);
//       // Handle the error (e.g., show an error message to the user)
//     }
//   }
 
// );

const handleDrop = useCallback(

   async(acceptedFiles) => {
    setFileLoading(true);
    const jid = id;
    const formDta = new FormData();
    formDta.append('id',jid);

     acceptedFiles.map((uploadfile)=>{
      formDta.append('files',uploadfile);
      
     });

     try {
      
       const res = $post(URL,formDta)
       .then(res => window.location.reload())
      .then(res=>{enqueueSnackbar('File added  successfully!') ; 
        // file= {...file,...res.data}
        console.log("FILE UPLOAD RESPONSE",res.data);})

          // Handle the response if needed
          // console.log("FILE UPLOAD RESPONSE",res.data);

     } catch (error){
      console.error('Error uploading files:', error);
      // Handle the error
     } finally{
     
      useEffect(() => {
        // Code that depends on the updated state (fileLoading) goes here
        setFileLoading(false);
      }, [fileLoading]);
     }
   }
)

// const handleDrop = useCallback(async (acceptedFiles) => {
//   const jid = id;
//   const formDta = new FormData();
//   formDta.append('id', jid);

//   acceptedFiles.forEach((uploadfile) => {
//     formDta.append('files', uploadfile);
//   });

//   try {
//     const res = await $post(URL, formDta);

//     // Assuming the response contains the new file data
//     const newFile = res.data;

//     // Update the state to include the new file
//     setFiles(() => {
//       if (typeof file === 'object' && !Array.isArray(file)) {
//         return { ...file, ...newFile };
//       } else {
//         // If prevFiles is not an object, initialize it as an object with the new file
//         return { [newFile.id]: newFile };
//       }
//     });

//     enqueueSnackbar('File added successfully!');
//     console.log('FILE UPLOAD RESPONSE', newFile);
//   } catch (error) {
//     console.error('Error uploading files:', error);
//     // Handle the error (e.g., show an error message to the user)
//   }
// }, [id]);

  const openDateRange = useBoolean();

  const confirm = useBoolean();

  const upload = useBoolean();

  const [view, setView] = useState('list');

  // const [tableData, setTableData] = useState(_allFiles);

  const [filters, setFilters] = useState(defaultFilters);

  // Custom Variables By Charles


  
  const [pageIndex, setPageIndex] = useState(1);
  const [selectedPms, setSelectedPms] = useState(null);
  const [selectedCorp, setSelectedCorp] = useState(null);
  const [clinicName, setClinicName] = useState(null);
  const [isActive, setIsActive] = useState(true);

  const [tableData, setTableData] = useState([]);
  const [pmsNames, setPmsNames] = useState([]);
  const [corpNames, setCorpNames] = useState([]);
  const quickEdit = useBoolean();


  // Get files

  // const { apifiles, filesLoading, filesEmpty } = useGetFile(id);

  // const URL = `${endpoints.clinic_manager.clinic_data}?pageNumber=${pageIndex}`;
  // const URL = `${endpoints.clinic_manager.clinic_data}?${ isActive != null ? `active=${isActive}&` : ''}${ clinicName != null ? `search=${clinicName}&` : ''}${ selectedPms != null ? `pmsId=${selectedPms}&` : ''}${ selectedCorp != null ? `corpId=${selectedCorp}&` : ''}pageNumber=${pageIndex}`;
  // const { data, error, isLoading } = useSWR(URL,$get,{onSuccess: ()=>{
  //   console.log("-------------------")
    console.log("FILE PAGE DATA: ", file || [])
  //   console.log("CLINICS", data?.result || 0)
  //   console.log("totalCount", data?.totalCount || 0)
  //   console.log("currentPage", data?.currentPage || 0)
  //   console.log("-------------------")

    // setTableData(data?.result)

  // }});
  // The API URL includes the page index, which is a React state.
  // const { data, isLoading, error} = useSWR(`${URL}?pageNumber=${pageIndex + 1}`, fetcher);
  // if (error) return console.log(error);
  // if (isLoading) return <h6>Loading...</h6>;

  // const table = useTable({defaultRowsPerPage: data?.pageSize || 0, defaultCurrentPage:data?.currentPage - 1 || 0});
  // const table = useTable();

  // useEffect(()=>{
  //   setTableData(apifiles || [])
  // }, [apifiles])

  useEffect(() => {
    console.log('FileListView component mounted'); // Add this line
    // Add any additional logic you might have in useEffect
    // ...

    // Don't forget to clean up if necessary
    return () => {
      console.log('FileListView component unmounted'); // Add this line
      // Add any cleanup logic if needed
      // ...
    };
  }, [file]);


  useEffect(()=>{
    setPageIndex(table.page + 1)
  }, [table.page])

  useEffect(()=>{
    setFiles(file)
  }, [])


  const getPMS_Corps = ()=>{
    $get(endpoints.pms.names)
    .then(res =>{
      res.sort()
      res.splice(0, 0, "All")
      setPmsNames(res)
    })

    $get(endpoints.corps.names)
    .then(res =>{
      res.sort()
      res.splice(0, 0, "All")
      setCorpNames(res)
    })
  }

  useEffect(()=>{
    getPMS_Corps()
  }, [])


  const dateError =
    filters.startDate && filters.endDate
      ? filters.startDate.getTime() > filters.endDate.getTime()
      : false;

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
    dateError,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const canReset =
    !!filters.name || !!filters.type.length || (!!filters.startDate && !!filters.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleChangeView = useCallback((event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  }, []);

  const handleFilters = useCallback(
    (name, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleDeleteItem = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);
      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteItems = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRows: tableData.length,
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const renderFilters = (
    <Stack
      spacing={2}
      direction={{ xs: 'column', md: 'row' }}
      alignItems={{ xs: 'flex-end', md: 'center' }}
    >
      <FileManagerFilters
        openDateRange={openDateRange.value}
        onCloseDateRange={openDateRange.onFalse}
        onOpenDateRange={openDateRange.onTrue}
        //
        filters={filters}
        onFilters={handleFilters}
        //
        dateError={dateError}
        typeOptions={FILE_TYPE_OPTIONS}
      />

      <ToggleButtonGroup size="small" value={view} exclusive onChange={handleChangeView}>
        <ToggleButton value="list">
          <Iconify icon="solar:list-bold" />
        </ToggleButton>

        <ToggleButton value="grid">
          <Iconify icon="mingcute:dot-grid-fill" />
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );

  const renderResults = (
    <FileManagerFiltersResult
      filters={filters}
      onResetFilters={handleResetFilters}
      //
      canReset={canReset}
      onFilters={handleFilters}
      //
      results={dataFiltered.length}
    />
  );

  // return (
  //   <>
  //     <Container maxWidth={settings.themeStretch ? false : 'lg'}>
  //       <Stack direction="row" alignItems="center" justifyContent="space-between">
  //         <Typography variant="h4">File Manager</Typography>
  //         <Button
  //           variant="contained"
  //           startIcon={<Iconify icon="eva:cloud-upload-fill" />}
  //           onClick={upload.onTrue}
  //         >
  //           Upload
  //         </Button>
  //       </Stack>

  //       <Stack
  //         spacing={2.5}
  //         sx={{
  //           my: { xs: 3, md: 5 },
  //         }}
  //       >
  //         {renderFilters}

  //         {canReset && renderResults}
  //       </Stack>

  //       {notFound ? (
  //         <EmptyContent
  //           filled
  //           title="No Data"
  //           sx={{
  //             py: 10,
  //           }}
  //         />
  //       ) : (
  //         <>
  //           {view === 'list' ? (
  //             <FileManagerTable
  //               table={table}
  //               tableData={tableData}
  //               dataFiltered={dataFiltered}
  //               ftype="file"
  //               onDeleteRow={handleDeleteItem}
  //               notFound={notFound}
  //               onOpenConfirm={confirm.onTrue}
  //             />
  //           ) : (
  //             <FileManagerGridView
  //               table={table}
  //               data={tableData}
  //               dataFiltered={dataFiltered}
  //               onDeleteItem={handleDeleteItem}
  //               onOpenConfirm={confirm.onTrue}
  //             />
  //           )}
  //         </>
  //       )}
  //     </Container>

  //     <FileManagerNewFolderDialog open={upload.value} onClose={upload.onFalse} />

  //     <ConfirmDialog
  //       open={confirm.value}
  //       onClose={confirm.onFalse}
  //       title="Delete"
  //       content={
  //         <>
  //           Are you sure want to delete <strong> {table.selected.length} </strong> items?
  //         </>
  //       }
  //       action={
  //         <Button
  //           variant="contained"
  //           color="error"
  //           onClick={() => {
  //             handleDeleteItems();
  //             confirm.onFalse();
  //           }}
  //         >
  //           Delete
  //         </Button>
  //       }
  //     />
  //   </>
  // );


  
  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>


         <Grid xs={12} sm={6} md={4}>
                        {/* <FileWidget
                          title="OneDrive"
                          value={GB / 2}
                          total={GB}
                          icon="/assets/icons/app/ic_onedrive.svg"
                        /> */}

                   <UploadBox
                        onDrop={handleDrop}
                        placeholder={
                          <Stack spacing={0.5} alignItems="right" sx={{ color: 'text.disabled' }}>
                            <Iconify icon="eva:cloud-upload-fill" width={40} />
                            <Typography variant="body2">Upload file</Typography>
                          </Stack>
                        }
                        sx={{
                          mb: 3,
                          py: 2.5,
                          width: 'auto',
                          height: 'auto',
                          borderRadius: 1.5,
                        }}
                    />
          </Grid>
        <Grid container spacing={3}>
          {smDown && <Grid xs={12}>{renderStorageOverview}</Grid>}

          {/* <Grid xs={12} sm={6} md={4}> */}
            {/* <FileWidget
              title="Dropbox"
              value={GB / 10}
              total={GB}
              icon="/assets/icons/app/ic_dropbox.svg"
            /> */}
          {/* </Grid> */}

          {/* <Grid xs={12} sm={6} md={4}> */}
            {/* <FileWidget
              title="Drive"
              value={GB / 5}
              total={GB}
              icon="/assets/icons/app/ic_drive.svg"
            /> */}
          {/* </Grid> */}

          

          <Grid xs={12}  >
            {/* <FileDataActivity
              title="Data Activity"
              chart={{
                labels: TIME_LABELS,
                colors: [
                  theme.palette.primary.main,
                  theme.palette.error.main,
                  theme.palette.warning.main,
                  theme.palette.text.disabled,
                ],
                series: [
                  {
                    type: 'Week',
                    data: [
                      { name: 'Images', data: [20, 34, 48, 65, 37, 48] },
                      { name: 'Media', data: [10, 34, 13, 26, 27, 28] },
                      { name: 'Documents', data: [10, 14, 13, 16, 17, 18] },
                      { name: 'Other', data: [5, 12, 6, 7, 8, 9] },
                    ],
                  },
                  {
                    type: 'Month',
                    data: [
                      {
                        name: 'Images',
                        data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
                      },
                      {
                        name: 'Media',
                        data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
                      },
                      {
                        name: 'Documents',
                        data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
                      },
                      {
                        name: 'Other',
                        data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
                      },
                    ],
                  },
                  {
                    type: 'Year',
                    data: [
                      { name: 'Images', data: [10, 34, 13, 56, 77] },
                      { name: 'Media', data: [10, 34, 13, 56, 77] },
                      { name: 'Documents', data: [10, 34, 13, 56, 77] },
                      { name: 'Other', data: [10, 34, 13, 56, 77] },
                    ],
                  },
                ],
              }}
            /> */}

            <div>
              {/* <FileManagerPanel
                title="Folders"
                link={paths.dashboard.fileManager}
                onOpen={newFolder.onTrue}
                sx={{ mt: 5 }}
              /> */}

              {/* <Scrollbar>
                <Stack direction="row" spacing={3} sx={{ pb: 3 }}>
                  {_folders.map((folder) => (
                    <FileManagerFolderItem
                      key={folder.id}
                      folder={folder}
                      onDelete={() => console.info('DELETE', folder.id)}
                      sx={{
                        ...(_folders.length > 3 && {
                          minWidth: 222,
                        }),
                      }}
                    />
                  ))}
                </Stack>
              </Scrollbar> */}

              <FileManagerPanel
                title="Jail Files"
                link={paths.dashboard.fileManager}
                onOpen={upload.onTrue}
                sx={{ mt: 2 }}
              />
                  
              <Stack spacing={2}>
                {/* {files.map((file) => (
                  <FileRecentItem
                    key={file.id}
                    file={file}
                    onDelete={() => console.info('DELETE', file.id)}
                  />
                ))} */}
         
                    {file && file.length > 0 ?  (
                        file.map((fil) => (
                          <FileRecentItem
                            key={fil.id}
                            file={fil}
                            onDelete={() => console.info('DELETE', fil.id)}
                          />
                        ))
                      ) : (
                        // Handle the case when files or files.data is undefined
                        <div >No Files Available Yet</div>
                      )}
              </Stack>
            </div>
          </Grid>

          {/* <Grid xs={12} md={6} lg={4}> */}
           

            {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>{renderStorageOverview}</Box> */}

            {/* <FileUpgrade sx={{ mt: 3 }} /> */}
          {/* </Grid>  */}
        </Grid>
        {fileLoading && 
      
      // <h1>Loading...</h1>
      <LoadingScreen text="Loading"/>
      
      } 
      </Container>

      <FileManagerNewFolderDialog open={upload.value} onClose={upload.onFalse} />

      <FileManagerNewFolderDialog
        open={newFolder.value}
        onClose={newFolder.onFalse}
        title="New Folder"
        folderName={folderName}
        onChangeFolderName={handleChangeFolderName}
        onCreate={handleCreateNewFolder}
      />
    
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters, dateError }) {
  const { name, type, startDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (file) => file.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (type.length) {
    inputData = inputData.filter((file) => type.includes(fileFormat(file.type)));
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter(
        (file) =>
          fTimestamp(file.createdAt) >= fTimestamp(startDate) &&
          fTimestamp(file.createdAt) <= fTimestamp(endDate)
      );
    }
  }

  return inputData;
}