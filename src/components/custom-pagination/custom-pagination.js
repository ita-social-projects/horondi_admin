import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { PaginationItem } from '@material-ui/lab';

const CustomPagination = ({ count = 10, setCurrentPage, page }) => {
  const numberOfPages = [];

  for (let i = 1; i <= count; i++) {
    numberOfPages.push(i);
  }

  const [currentButton, setCurrentButton] = useState(page);
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);

  const paginate = (() => {
    let tempNumberOfPages = [...arrOfCurrButtons];
    let dotsInitial = '...';
    let dotsLeft = '... ';
    let dotsRight = ' ...';

    if (numberOfPages.length < 6) {
      tempNumberOfPages = numberOfPages;

    } else if (currentButton >= 1 && currentButton <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length];

    } else if (currentButton === 4) {
      const sliced = numberOfPages.slice(0, 5);
      tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length];

    } else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {
      const sliced1 = numberOfPages.slice(currentButton - 2, currentButton);
      const sliced2 = numberOfPages.slice(currentButton, currentButton + 1);
      tempNumberOfPages = [1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numberOfPages.length];

    } else if (currentButton > numberOfPages.length - 3) {
      const sliced = numberOfPages.slice(numberOfPages.length - 4);
      tempNumberOfPages = [1, dotsLeft, ...sliced];

    } else if (currentButton === dotsInitial) {
      setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1);

    } else if (currentButton === dotsRight) {
      setCurrentButton(arrOfCurrButtons[3] + 2);

    } else if (currentButton === dotsLeft) {
      setCurrentButton(arrOfCurrButtons[3] - 2);
    }

    setArrOfCurrButtons(tempNumberOfPages);
    setCurrentPage(currentButton);
  })

  useEffect(paginate, [currentButton]);

  return (
    <Grid container direction='row' justify='center' alignItems='center'>
      <Grid item xs={10} align='center'>
        <PaginationItem
          variant='outlined'
          shape='rounded'
          type='previous'
          disabled={currentButton === 1 ? true : false}
          onClick={() =>
            setCurrentButton((prev) => (prev === 1 ? prev : prev - 1))
          }
        />
        {arrOfCurrButtons.map((item) => {
          return (
            <PaginationItem
              key={item}
              page={item}
              variant='outlined'
              shape='rounded'
              selected={currentButton === item ? true : false}
              onClick={() => setCurrentButton(item)}
            />
          );
        })}
        <PaginationItem
          variant='outlined'
          shape='rounded'
          type='next'
          disabled={currentButton === numberOfPages.length ? true : false}
          onClick={() =>
            setCurrentButton((prev) =>
              prev === numberOfPages.length ? prev : prev + 1
            )
          }
        />
      </Grid>
    </Grid>
  );
};

export default CustomPagination;
