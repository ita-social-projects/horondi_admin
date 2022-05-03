import filterLabels from '../../configs/filter-labels';
import buttonTitles from '../../configs/button-titles';
import { statusCertificateFilterObject } from '../../utils/certificate';
import { certificateStatusTableAction } from '../../consts/certificate-status';
import usePromoCodeCertificateFilters from './use-promoCode-Certificate-filters';

const useCertificateFilters = () => {
  const useHooks = usePromoCodeCertificateFilters();

  return {
    filterByMultipleOptions: [
      {
        filters: useHooks.status,
        label: buttonTitles.STATUS,
        selectItems: statusCertificateFilterObject,
        setFilterHandler: useHooks.setStatusFilter,
        objForTranslateRenderItems: certificateStatusTableAction,
        status: useHooks.status
      }
    ],
    searchOptions: {
      search: useHooks.search,
      setSearchFilter: useHooks.setSearchFilter
    },
    clearOptions: {
      clearAllFilters: useHooks.clearAllFilters
    },
    sortOptions: {
      labels: filterLabels.certificates.sortLabels,
      setSorting: useHooks.setSorting,
      sortLabel: useHooks.sortLabel,
      sortDirection: useHooks.sortDirection,
      sortBy: useHooks.sortBy
    }
  };
};

export default useCertificateFilters;
