import { DEFAULT_ERROR_MESSAGE, DEFAULT_PAGESIZE } from 'consts';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

//UseEffect not run on initial render
const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, deps);
};

export function useTableState(featureAPI, initSearchParams, initLanguage = 'vn') {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState(initLanguage);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: DEFAULT_PAGESIZE
  });
  const [searchParams, setSearchParams] = useState(initSearchParams);
  const [detailItem, setDetailItem] = useState(null);
  const [selected, setSelected] = useState([]);

  const getListData = async () => {
    try {
      setLoading(true);
      const data = await featureAPI.getList({
        language: language,
        ...pagination,
        ...searchParams
      });
      if (data.data) {
        setData(data.data);
        setRowCount(data.totalRecords);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      await featureAPI.delete(selected);
      setSelected([]);
      getListData();
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại sau');
    }
  };
  const editItem = (detailItem) => {
    setDetailItem(detailItem);
    toggleModal();
  };
  const onCreateNewItem = () => {
    setDetailItem(null);
    toggleModal();
  };
  const onDownload = async () => {
    try {
      setLoading(true);
      await featureAPI.delete(selected);
      setSelected([]);
      getListData();
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
  };

  /**
   *
   * @param {ids} selectionModel
   */
  const onSelectRow = (selectionModel) => {
    setSelected(selectionModel);
  };

  const onPageChange = (page) => {
    setPagination({ ...pagination, pageNo: page + 1 });
  };
  const onPageSizeChange = (pageSize) => {
    setPagination({ pageNo: 1, pageSize });
  };
  const toggleModal = useCallback(() => setIsOpen((v) => !v), []);
  const onChangeLanguage = (e) => {
    setLanguage(e.target.value);
  };
  useDidMountEffect(() => {
    setPagination({
      pageNo: 1,
      pageSize: DEFAULT_PAGESIZE
    });
  }, [searchParams]);

  useEffect(() => {
    getListData();
  }, [language, pagination]);
  return {
    data,
    isOpen,
    toggleModal,
    loading,
    rowCount,
    pagination,
    searchParams,
    setSearchParams,
    language,
    onChangeLanguage,
    detailItem,
    onSelectRow,
    onDelete,
    selected,
    editItem,
    onPageChange,
    onPageSizeChange,
    getListData,
    onDownload,
    onCreateNewItem
  };
}
