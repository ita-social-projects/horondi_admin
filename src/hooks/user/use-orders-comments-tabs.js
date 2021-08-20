import { useDispatch, useSelector } from 'react-redux';
import { setTabOrdersComments } from '../../redux/users/users.actions';
import useCommentUserFilters from '../filters/use-comment-user-filters';
import useCommentReplyUserFilters from '../filters/use-comment-reply-user-filters';

const useOrdersCommentsTabs = () => {
  const dispatch = useDispatch();
  const tab = useSelector(({ Users }) => Users.tabOrdersComments);
  const {
    clearOptions: { clearAllFilters: clearAllCommentFilters }
  } = useCommentUserFilters();
  const {
    clearOptions: { clearAllFilters: clearAllCommentReplyFilters }
  } = useCommentReplyUserFilters();

  const handleTabChange = (currentTab) => {
    dispatch(setTabOrdersComments(currentTab));
    clearAllCommentFilters();
    clearAllCommentReplyFilters();
  };

  return {
    tab,
    handleTabChange
  };
};

export default useOrdersCommentsTabs;
