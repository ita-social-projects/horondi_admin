import React from 'react';

import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  FormControl,
  Select,
  MenuItem
} from '@material-ui/core';
import useDoughnutData from '../../../hooks/stats/useDoughnutData';
import useStyles from './doughnut-statistic.styles';

import { config } from '../../../configs';

const { doughnutColors } = config;

const DoughnutStatistic = () => {
  const styles = useStyles();
  const { mainData, options, doughnutOptions } = useDoughnutData();

  return (
    <Card className={styles.root}>
      <CardHeader
        title={
          <FormControl>
            <Select value={7}>
              <MenuItem value={7}>Статуси замовлень</MenuItem>
              <MenuItem value={14}>Популярні категорії</MenuItem>
            </Select>
          </FormControl>
        }
      />
      <Divider />
      <CardContent>
        <Box height={300} position='relative'>
          <Doughnut data={mainData} options={options} />
        </Box>
        <Box display='flex' justifyContent='center' mt={2}>
          {doughnutOptions.relations.map((relation, idx) => (
            <Box key={relation} p={1} textAlign='center'>
              <Typography color='textPrimary' variant='body1'>
                {doughnutOptions.labels[idx]}
              </Typography>
              <Typography style={{ color: doughnutColors[idx] }} variant='h2'>
                {relation}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default DoughnutStatistic;
