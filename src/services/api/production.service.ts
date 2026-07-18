import { api } from './axios';

// Mock data for testing
const mockLogs = [
  // Shift2 Data
  { id: '1', machine: 'MI-24-OM-350', plan: '100-6951', part: 'SFG - CLASSIC 16LTR BUCKET BODY', color: 'NA', startTime: '06:46:18', endTime: '06:46:34', produced: 0, accepted: 0, rejected: 0, rework: 0, scrap: 0, shift: 'Shift2' },
  { id: '2', machine: 'MI-06-HT-120', plan: '100-7027', part: 'SFG - Crystal/Deep Bucket 2ltr Cover', color: 'NA', startTime: '00:01:33', endTime: '06:22:48', produced: 1349, accepted: 1349, rejected: 0, rework: 0, scrap: 0, shift: 'Shift2' },
  { id: '3', machine: 'HT-31-HT-270', plan: '100-6997', part: 'SFG-Amore-Baby Bath Set-9 ltr Bucket', color: 'NA', startTime: '19:00:01', endTime: '21:56:11', produced: 946, accepted: 869, rejected: 77, rework: 0, scrap: 0, shift: 'Shift2' },
  { id: '4', machine: 'MI-16-HT-200', plan: '100-7020', part: 'SFG - 63gm Jar Preform', color: 'NA', startTime: '20:12:25', endTime: '06:20:53', produced: 3544, accepted: 3329, rejected: 215, rework: 0, scrap: 0, shift: 'Shift2' },
  { id: '5', machine: 'MI-01-HT-86', plan: '100-7016', part: 'SFG - Crystal/Deep Bucket 2ltr Handle', color: 'NA', startTime: '19:38:03', endTime: '06:20:53', produced: 6182, accepted: 6182, rejected: 0, rework: 0, scrap: 0, shift: 'Shift2' },
  { id: '6', machine: 'MI-25-OM-350', plan: '100-6999', part: 'SFG-Chair Potty-Leo Baby Bath Set', color: 'NA', startTime: '19:29:22', endTime: '06:16:07', produced: 0, accepted: 0, rejected: 0, rework: 0, scrap: 0, shift: 'Shift2' },
  { id: '7', machine: 'MI-11-HT-160', plan: '100-7015', part: 'SFG - Crystal/Deep Bucket 2ltr Body', color: 'NA', startTime: '19:25:04', endTime: '05:57:37', produced: 1546, accepted: 1546, rejected: 0, rework: 0, scrap: 0, shift: 'Shift2' },
  { id: '8', machine: 'MI-17-HT-200', plan: '100-6947', part: 'SUNRISE BOWL', color: 'NA', startTime: '19:22:28', endTime: '06:22:00', produced: 852, accepted: 727, rejected: 125, rework: 0, scrap: 0, shift: 'Shift2' },
  { id: '9', machine: 'MI-08-FU-150', plan: '100-6968', part: 'SFG - VIP LUNCH BOX', color: 'NA', startTime: '19:02:20', endTime: '06:04:54', produced: 2134, accepted: 2134, rejected: 0, rework: 0, scrap: 0, shift: 'Shift2' },
  { id: '10', machine: 'LI-46-HT-1000', plan: '100-6980', part: 'Papilon Chair - Colours', color: 'NA', startTime: '19:00:46', endTime: '06:26:35', produced: 850, accepted: 848, rejected: 2, rework: 0, scrap: 0, shift: 'Shift2' },
  
  // Shift1 Data
  { id: '11', machine: 'MI-19-HT-250', plan: '100-7021', part: 'SFG 8 LTR COOLER INNER BODY', color: 'NA', startTime: '18:51:53', endTime: '19:00:00', produced: 0, accepted: 0, rejected: 0, rework: 0, scrap: 0, shift: 'Shift1' },
  { id: '12', machine: 'LI-45-HT-1000', plan: '100-7022', part: 'Papilon Lion Chair', color: 'NA', startTime: '17:13:41', endTime: '19:00:36', produced: 130, accepted: 130, rejected: 0, rework: 0, scrap: 0, shift: 'Shift1' },
  { id: '13', machine: 'HT-34-FERO-200', plan: '100-7019', part: 'SFG - 30gm Visita Cap', color: 'NA', startTime: '16:54:17', endTime: '19:00:05', produced: 0, accepted: 0, rejected: 0, rework: 0, scrap: 0, shift: 'Shift1' },
  { id: '14', machine: 'MI-03-FU-110', plan: '100-7018', part: 'SFG 8 LTR COOLER CONTAINER COVER', color: 'NA', startTime: '16:12:21', endTime: '19:00:14', produced: 503, accepted: 409, rejected: 94, rework: 0, scrap: 0, shift: 'Shift1' },
  { id: '15', machine: 'HT-28-HT-270', plan: '100-7017', part: 'Darvinks Visita Flip Cap', color: 'NA', startTime: '12:47:36', endTime: '19:00:10', produced: 18318, accepted: 18318, rejected: 0, rework: 0, scrap: 0, shift: 'Shift1' },
  { id: '16', machine: 'MI-16-HT-200', plan: '100-7020', part: 'SFG - 63gm Jar Preform', color: 'NA', startTime: '10:44:06', endTime: '17:05:53', produced: 1723, accepted: 1711, rejected: 12, rework: 0, scrap: 0, shift: 'Shift1' },
  { id: '17', machine: 'MI-24-OM-350', plan: '100-6951', part: 'SFG - CLASSIC 16LTR BUCKET BODY', color: 'NA', startTime: '09:00:00', endTime: '15:01:35', produced: 0, accepted: 0, rejected: 0, rework: 0, scrap: 0, shift: 'Shift1' },
  { id: '18', machine: 'MI-20-FU-280', plan: '100-7015', part: 'SFG - Papilon Keep Afresh Small Body', color: 'NA', startTime: '08:53:48', endTime: '19:00:09', produced: 1197, accepted: 1170, rejected: 27, rework: 0, scrap: 0, shift: 'Shift1' },
  { id: '19', machine: 'MI-04-FU-110', plan: '100-7014', part: 'SFG - CHAIR POOTY DRAWER COVER', color: 'NA', startTime: '08:53:24', endTime: '19:00:09', produced: 1359, accepted: 1346, rejected: 13, rework: 0, scrap: 0, shift: 'Shift1' },
  { id: '20', machine: 'MI-01-HT-86', plan: '100-7016', part: 'SFG - Crystal/Deep Bucket 2ltr Handle', color: 'NA', startTime: '08:52:57', endTime: '18:25:35', produced: 5539, accepted: 5539, rejected: 0, rework: 0, scrap: 0, shift: 'Shift1' },
];

// Mock downtime logs
const mockDowntimeLogs = [
  { id: '1', machine: 'MI-19-HT-250', startTime: '06:46:34', endTime: '07:00:00', duration: '00:13:26', reason: 'Machine Communication Error', isPlanned: '-', shift: 'Shift2' },
  { id: '2', machine: 'MI-22-HT-300', startTime: '06:46:34', endTime: '07:00:00', duration: '00:13:26', reason: 'Machine Communication Error', isPlanned: '-', shift: 'Shift2' },
  { id: '3', machine: 'MI-16-HT-200', startTime: '06:46:34', endTime: '07:00:00', duration: '00:13:26', reason: 'Machine Communication Error', isPlanned: '-', shift: 'Shift2' },
  { id: '4', machine: 'MI-25-OM-350', startTime: '06:46:34', endTime: '07:00:00', duration: '00:13:26', reason: 'Machine Communication Error', isPlanned: '-', shift: 'Shift2' },
  { id: '5', machine: 'MI-19-HT-250', startTime: '06:46:34', endTime: '07:00:00', duration: '00:13:26', reason: 'Machine Communication Error', isPlanned: '-', shift: 'Shift1' },
];

// Mock OEE data
const mockOEE = {
  oee: 25.87,
  trend: 15.73,
  availability: 39.44,
  performance: 27.88,
  quality: 66.53,
  qualityTrend: 27.38,
};

export const ProductionService = {
  // Production Logs
  getLogs: async (params?: any) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let filteredLogs = [...mockLogs];
    
    if (params?.search) {
      const search = params.search.toLowerCase();
      filteredLogs = filteredLogs.filter(log => 
        log.machine.toLowerCase().includes(search) ||
        log.part.toLowerCase().includes(search) ||
        log.plan.toLowerCase().includes(search)
      );
    }
    
    if (params?.machine && params.machine !== 'All Machines') {
      filteredLogs = filteredLogs.filter(log => log.machine === params.machine);
    }
    
    if (params?.shift && params.shift !== 'All Shifts') {
      filteredLogs = filteredLogs.filter(log => log.shift === params.shift);
    }
    
    if (params?.order === 'oldest') {
      filteredLogs = filteredLogs.sort((a, b) => a.startTime.localeCompare(b.startTime));
    } else if (params?.order === 'lowest') {
      filteredLogs = filteredLogs.sort((a, b) => a.produced - b.produced);
    } else {
      filteredLogs = filteredLogs.sort((a, b) => b.startTime.localeCompare(a.startTime));
    }
    
    return filteredLogs;
  },

  // ✅ Downtime Logs - ADD THIS
  getDowntimeLogs: async (params?: any) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let filteredLogs = [...mockDowntimeLogs];
    
    if (params?.machine && params.machine !== 'All Machines') {
      filteredLogs = filteredLogs.filter(log => log.machine === params.machine);
    }
    
    if (params?.shift && params.shift !== 'All Shifts') {
      filteredLogs = filteredLogs.filter(log => log.shift === params.shift);
    }
    
    return filteredLogs;
  },

  // ✅ OEE Data - ADD THIS
  getOEE: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockOEE;
  },

  // Production Plans
  getPlans: async (params?: any) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [];
  },

  // Machine Status
  getMachineStatus: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [];
  },

  getMachineStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { total: 49, operating: 32, stopped: 11, idle: 6 };
  },
};