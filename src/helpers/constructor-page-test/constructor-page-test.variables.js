import { initialState } from '../constructor-item-test/constructor-item-test.variables';

const { Backs, Basics, Bottoms, Closures, Pockets, Positions, Straps } =
  initialState;

export const state = {
  Table: {
    dense: false,
    pagination: {
      currentPage: 0,
      rowsPerPage: 10,
      rowsPerPageOptions: {
        0: 10,
        1: 20,
        3: 30
      }
    },
    itemsCount: 1
  },
  Backs: {
    ...Backs,
    list: [Backs.back],
    back: null
  },
  Basics: {
    ...Basics,
    list: [Basics.basic],
    basic: null
  },
  Bottoms: {
    ...Bottoms,
    list: [Bottoms.bottom],
    bottom: null
  },
  Closures: {
    ...Closures,
    list: [Closures.closure],
    closure: null
  },
  Pockets: {
    ...Pockets,
    list: [Pockets.pocket],
    pocket: null
  },
  Positions: {
    ...Positions,
    list: [Positions.position],
    position: null
  },
  Straps: {
    ...Straps,
    list: [Straps.strap],
    strap: null
  }
};
