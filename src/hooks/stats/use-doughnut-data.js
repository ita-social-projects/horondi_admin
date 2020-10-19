import { useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core';
import { config } from '../../configs';

const { colors } = config.doughnut;

const useDoughnutData = () => {
  const theme = useTheme();
  const doughnutData = useSelector(({ Stats }) => Stats.doughnut);

  const { selectedValue } = doughnutData;
  const { counts, names, relations } = doughnutData[selectedValue];

  const mainData = {
    datasets: [
      {
        data: counts,
        backgroundColor: colors,
        borderWidth: 8,
        borderColor: theme.palette.background.paper,
        hoverBorderColor: theme.palette.background.paper
      }
    ],
    labels: names
  };

  const options = {
    animation: false,
    cutoutPercentage: 70,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return { mainData, options, relations, names };
};

export default useDoughnutData;
