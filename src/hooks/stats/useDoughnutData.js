import { useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { config } from '../../configs';

const { doughnutColors, initialCategoriesStatsData } = config;

const useDoughnutData = () => {
  const theme = useTheme();
  const doughnutData = useSelector(({ Stats }) => Stats.doughnutData);

  const [doughnutOptions, setDoughnutOptions] = useState(
    initialCategoriesStatsData
  );

  useEffect(() => {
    if (doughnutData.length) {
      doughnutData.map(({ name, stats }) =>
        setDoughnutOptions(({ data, labels, relations }) => ({
          data: [...data, stats.purchasedCount],
          labels: [...labels, name],
          relations: [...relations, stats.relation]
        }))
      );
    }
  }, [doughnutData]);

  const { data, labels } = doughnutOptions;

  const mainData = {
    datasets: [
      {
        data,
        backgroundColor: doughnutColors,
        borderWidth: 8,
        borderColor: theme.palette.background.paper,
        hoverBorderColor: theme.palette.background.paper
      }
    ],
    labels
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

  return { mainData, options, doughnutOptions };
};

export default useDoughnutData;
