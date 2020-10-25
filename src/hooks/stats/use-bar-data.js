import { useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core';
import { config } from '../../configs';

const { descriptions, message } = config.labels.bar;

const useBarData = () => {
  const theme = useTheme();
  const barData = useSelector(({ Stats }) => Stats.bar);

  const { selectedValue } = barData;
  const { counts, labels } = barData[selectedValue];

  const mainData = {
    datasets: [
      {
        backgroundColor: theme.palette.secondary.main,
        data: counts,
        label: descriptions[selectedValue],
        maxBarThickness: 17,
        categoryPercentage: 0.5,
        total: barData[selectedValue].total,
        message: message[selectedValue]
      }
    ],
    labels
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
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
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return { mainData, options };
};

export default useBarData;
