import filterLabels from '../../configs/filter-labels';
import buttonTitles from '../../configs/button-titles';
import { statusPromoCodeFilterObject } from '../../utils/promo-code';
import { promoCodeStatusTableAction } from '../../consts/promo-code-status';
import usePromoCodeCertificateFilters from './use-promoCode-Certificate-filters';

const usePromoCodeFilters = () => {
  const useState = usePromoCodeCertificateFilters();

  return {
    filterByMultipleOptions: [
      {
        filters: useState.status,
        label: buttonTitles.STATUS,
        selectItems: statusPromoCodeFilterObject,
        setFilterHandler: useState.setStatusFilter,
        objForTranslateRenderItems: promoCodeStatusTableAction,
        status: useState.status
      }
    ],
    searchOptions: {
      search: useState.search,
      setSearchFilter: useState.setSearchFilter
    },
    clearOptions: {
      clearAllFilters: useState.clearAllFilters
    },
    sortOptions: {
      labels: filterLabels.promoCode.sortLabels,
      setSorting: useState.setSorting,
      sortLabel: useState.sortLabel,
      sortDirection: useState.sortDirection,
      sortBy: useState.sortBy
    }
  };
};

export default usePromoCodeFilters;
