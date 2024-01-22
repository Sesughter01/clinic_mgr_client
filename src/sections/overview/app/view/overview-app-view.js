'use client';
import * as React from 'react';
// import { BarChart } from '@mui/x-charts/BarChart';
// @mui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
// _mock
import { _appFeatured, _appAuthors, _appInstalled, _appRelated, _appInvoices, _jiraTicket } from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';

// import { useAuthContext }
// assets
import { SeoIllustration } from 'src/assets/illustrations';
//
import AppWidget from '../app-widget';
import AppWelcome from '../app-welcome';
import AppFeatured from '../app-featured';
import AppNewInvoice from '../app-new-invoice';
import AppJiraTicket from '../app-jira-ticket';

import AppTopAuthors from '../app-top-authors';
import AppTopRelated from '../app-top-related';
import AppAreaInstalled from '../app-area-installed';
import AppWidgetSummary from '../app-widget-summary';
import AppCurrentDownload from '../app-current-download';
import AppTopInstalledCountries from '../app-top-installed-countries';

// ----------------------------------------------------------------------

//For the barchart
// const chartSetting = {
//   xAxis: [
//     {
//       label: 'Pending',
//     },
//   ],
//   width: 500,
//   height: 400,
// };
// const dataset = [
//   {
//     london: 59,
//     paris: 57,
//     newYork: 86,
//     seoul: 21,
//     month: 'Jan',
//   },
//   {
//     london: 50,
//     paris: 52,
//     newYork: 78,
//     seoul: 28,
//     month: 'Fev',
//   },
//   {
//     london: 47,
//     paris: 53,
//     newYork: 106,
//     seoul: 41,
//     month: 'Mar',
//   },
  
// ];

export default function OverviewAppView() {
  const { user } = useMockedUser();

  const theme = useTheme();

  const settings = useSettingsContext();
// console.log(_jiraTicket);
// console.log(_appInvoices);
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
        {/* <Grid xs={12} md={12}> */}
          <AppWelcome
            // title={`Welcome back 👋 \n ${user?.displayName}`}
            title={`Wellcome to EDMS Clinic Manager 👋 \n Web (CM-WEB1.0)`}
            // description="If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything."
            description="Clinic Manager Web version comes with lots of online resources to strealine the onboarding process and to  consolidate all availble resources"
            img={<SeoIllustration />}
            action={
              <Button variant="contained" color="primary">
                Learn More
              </Button>
            }
          />
        </Grid>
        
        <Grid xs={12} md={4}>
          <AppFeatured list={_appFeatured} />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Active Clinics"
            // percent={2.6}
            total={18765}
            // chart={{
            //   series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            // }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total PMS"
            // percent={0.2}
            total={4876}
            // chart={{
            //   // colors: [theme.palette.info.light, theme.palette.info.main],
            //   series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
            // }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Corporations"
            // percent={-0.1}
            total={678}
            chart={{
              // colors: [theme.palette.warning.light, theme.palette.warning.main],
              series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
            }}
          />
        </Grid> 

        {/* <Grid xs={12} md={6} lg={4}>
          <AppCurrentDownload
            title="Current Download"
            chart={{
              series: [
                { label: 'Mac', value: 12244 },
                { label: 'Window', value: 53345 },
                { label: 'iOS', value: 44313 },
                { label: 'Android', value: 78343 },
              ],
            }}
          />
        </Grid>  */}

        {/* <Grid xs={12} md={6} lg={8}>
          <AppAreaInstalled
            title="Area Installed"
            subheader="(+43%) than last year"
            chart={{
              categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              series: [
                {
                  year: '2019',
                  data: [
                    {
                      name: 'Asia',
                      data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49],
                    },
                    {
                      name: 'America',
                      data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 13, 56, 77],
                    },
                  ],
                },
                {
                  year: '2020',
                  data: [
                    {
                      name: 'Asia',
                      data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 69, 62, 49],
                    },
                    {
                      name: 'America',
                      data: [56, 13, 34, 10, 77, 99, 88, 45, 77, 99, 88, 77],
                    },
                  ],
                },
              ],
            }}
          />
        </Grid> */}

        
        {/* <Grid xs={12} md={8} lg={8}>
          <AppTopInstalledCountries title="New JIRA Tickets" list={_appInstalled} />
        </Grid> */}

        <Grid xs={12} lg={12}>
          <AppJiraTicket
            title="New Jira Tickets"
            tableData={_jiraTicket}
            tableLabels={[
     
              { id: 'ticket_id', label: 'Ticket Id' },
              { id: 'project', label: 'project' },
              { id: 'description', label: 'Description' },
              { id: 'assign_to', label: 'Assign To' },
              { id: 'last_updated', label: 'Last Updated' },
              // { id: 'status', label: 'Status' }, 
              { id: '' },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTopRelated title="Clinics in the pipeline" list={_appRelated} />
        </Grid>

        

        <Grid xs={12} lg={8}>
          <AppNewInvoice
            title="Clinics On-Boarding"
            tableData={_appInvoices}
            tableLabels={[
              // { id: 'id', label: 'Invoice ID' },
              // { id: 'category', label: 'Category' },
              // { id: 'price', label: 'Price' },
              // { id: 'status', label: 'Status' },
              // { id: '' },
              { id: 'clinic_name', label: 'Clinic Name' },
              { id: 'stage', label: 'Stage' },
              { id: 'price', label: 'Last Updated' },
              // { id: 'status', label: 'Status' }, 
              { id: '' },
            ]}
          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={4}>
        <BarChart
            dataset={dataset}
            yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            series={[{ dataKey: 'seoul', label: '',}]}
            layout="horizontal"
            {...chartSetting}
        />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <AppTopAuthors title="Top Authors" list={_appAuthors} />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <Stack spacing={3}>
            <AppWidget
              title="Conversion"
              total={38566}
              icon="solar:user-rounded-bold"
              chart={{
                series: 48,
              }}
            />

            <AppWidget
              title="Applications"
              total={55566}
              icon="fluent:mail-24-filled"
              color="info"
              chart={{
                series: 75,
              }}
            />
          </Stack>
        </Grid> */}
      </Grid>
    </Container>
  );
}
