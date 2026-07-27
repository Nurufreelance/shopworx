// Mock machine data
export const mockMachines = {
  list: Array.from({ length: 24 }, (_, i) => ({
    id: HT-,
    name: Machine ,
    status: ['Running', 'Idle', 'Offline', 'Maintenance', 'Running'][i % 5],
    operator: ['John D', 'Sarah S', 'Mike W', 'Emma R', 'James B'][i % 5],
  })),
};
