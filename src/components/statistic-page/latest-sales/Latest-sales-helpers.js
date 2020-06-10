import moment from 'moment';

export const chartBarOptions = (theme) => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  legend: { display: false },
  tooltips: {
    enabled: true
  },
  layout: { padding: 0 },
  scales: {
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          drawBorder: true,
          color: theme.palette.divider,
          zeroLineColor: theme.palette.divider
        }
      }
    ]
  }
});

export const daysCount = (days) =>
  [...new Array(days)]
    .map((i, idx) =>
      moment().startOf('day').subtract(idx, 'days').format('D-MMM')
    )
    .reverse();

export const chartBarDataSet = (theme, labels, data) => ({
  labels,
  datasets: [
    {
      maxBarThickness: 15,
      categoryPercentage: 0.5,
      label: 'Sales',
      backgroundColor: theme.palette.primary.main,
      data
    }
  ]
});

export const chartData = [
  18,
  5,
  19,
  27,
  29,
  19,
  42,
  18,
  7,
  19,
  27,
  29,
  19,
  20,
  19,
  27,
  29,
  19,
  42,
  18,
  6,
  19,
  27,
  18,
  5,
  19,
  27,
  29,
  19,
  20,
  19
];
