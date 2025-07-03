export const dashboardConfig = [
  {
    title: 'Active Event Groups',
    type: 'pie',
    data: [
      { category: 'Critical', value: 2 },
      { category: 'Warning', value: 21 },
      { category: 'Informational', value: 100 }
    ]
  },
  {
    title: 'Event Breakdown',
    type: 'bar',
    data: [
      { category: 'Critical', value: 2 },
      { category: 'Warning', value: 21 },
      { category: 'Informational', value: 100 }
    ]
  },
  {
    title: 'Events Over Time',
    type: 'line',
    data: [
      { category: 'Jan', value: 10 },
      { category: 'Feb', value: 30 },
      { category: 'Mar', value: 20 }
    ]
  }
];
