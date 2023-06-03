import { Box, Button, Divider } from '@mui/material';
import { BackButton, Title } from 'components';
import ExpandableTable from 'components/Table/ExpandableTable/ExpandableTable';
import { Flex, FlexCol } from 'components/Layout/Layout';
import React, { useState } from 'react';
import ButtonMenuLesson from './components/ButtonMenuLesson';
import ButtonMenuContent from './components/ButtonMenuContent';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { CourseAPI } from 'apis/Courses';
import { useLoading } from 'hooks/LoadingProvider';
import { toast } from 'react-toastify';
import { formatResponseData, onMoveNext, onMoveToMargin } from './utils';
import { LessonStructureAPI } from 'apis/LessonStructure';
import useConfirmDialog from 'hooks/DialogProvider/useConfirmDialog';
import EmptyContent from './components/EmptyContent';
import { DEFAULT_ERROR_MESSAGE, ROUTE_PATH } from 'consts';

export default function LessonStructure() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courseStructure, setCourseStructure] = useState([]);
  const [hadLearnerStudying, setHadLearnerStudying] = useState(false);
  const { showLoading, hideLoading } = useLoading();
  const confirm = useConfirmDialog();

  useEffect(() => {
    getCourseLessonStructure();
  }, []);

  const getCourseLessonStructure = async () => {
    showLoading();
    try {
      const res = await CourseAPI.getCourseStructure(id);
      if (res?.data) {
        const formatedData = formatResponseData(res.data.data);
        setHadLearnerStudying(res?.data?.data?.hadLearnerStudying);
        if (formatedData) {
          setCourseStructure([formatedData]);
        } else {
          setCourseStructure([]);
        }
      }
    } catch (error) {
      toast.error(error.message ?? DEFAULT_ERROR_MESSAGE);
    }
    hideLoading();
  };

  const updateOrder = async (itemParent) => {
    try {
      const submitData = {
        parentId: itemParent.id,
        childIds: itemParent.children.map((c, i) => ({
          id: c.id,
          sortOrder: i + 1,
          type: c.type
        }))
      };
      await LessonStructureAPI.sortStructure(submitData);
      // getCourseLessonStructure();
    } catch (error) {
      toast.error(error.message ?? DEFAULT_ERROR_MESSAGE);
    }
  };

  const lessonAction = {
    onMoveUp: (item, itemParent) => {
      const moveSuccess = onMoveNext(item, itemParent, -1);
      if (moveSuccess) {
        courseStructure[0].children = itemParent.children;
        setCourseStructure([...courseStructure]);
        updateOrder(itemParent);
      }
    },
    onMoveDown: (item, itemParent) => {
      const moveSuccess = onMoveNext(item, itemParent, 1);
      if (moveSuccess) {
        courseStructure[0].children = itemParent.children;
        setCourseStructure([...courseStructure]);
        updateOrder(itemParent);
      }
    },
    onEdit: async (item) => {
      navigate(`${ROUTE_PATH.LESSON_CONTENT_UPDATE}/${item.id}`);
    },
    onDelete: (item) => {
      try {
        confirm({
          content: 'Bạn có chắc chắn muốn xóa nội dung này?',
          onConfirm: async () => {
            await LessonStructureAPI.delete(item.id);
            toast.success('Xóa thành công');
            getCourseLessonStructure();
          }
        });
      } catch (error) {
        toast.error('Can not delete item');
      }
    }
  };
  const contentAction = {
    onMoveToTop: (item, itemParent) => {
      const moveSuccess = onMoveToMargin(item, itemParent, -1);
      if (moveSuccess) {
        for (let item of courseStructure[0].children) {
          if (item.id === itemParent.id) {
            item.children = itemParent.children;
          }
        }
        setCourseStructure([...courseStructure]);
        updateOrder(itemParent);
      }
    },
    onMoveToBottom: (item, itemParent) => {
      const moveSuccess = onMoveToMargin(item, itemParent, 1);
      if (moveSuccess) {
        for (let item of courseStructure[0].children) {
          if (item.id === itemParent.id) {
            item.children = itemParent.children;
          }
        }
        setCourseStructure([...courseStructure]);
        updateOrder(itemParent);
      }
    },
    onMoveUp: (item, itemParent) => {
      const moveSuccess = onMoveNext(item, itemParent, -1);
      if (moveSuccess) {
        for (let item of courseStructure[0].children) {
          if (item.id === itemParent.id) {
            item.children = itemParent.children;
          }
        }
        setCourseStructure([...courseStructure]);
        updateOrder(itemParent);
      }
    },
    onMoveDown: (item, itemParent) => {
      const moveSuccess = onMoveNext(item, itemParent, 1);
      if (moveSuccess) {
        for (let item of courseStructure[0].children) {
          if (item.id === itemParent.id) {
            item.children = itemParent.children;
          }
        }
        setCourseStructure([...courseStructure]);
        updateOrder(itemParent);
      }
    }
  };

  const onAddLessonStructure = () => {
    navigate(`${ROUTE_PATH.LESSON_CONTENT_ADD}?courseId=` + id);
  };

  const columns = [
    {
      name: 'Tiêu đề',
      key: 'name'
    },
    {
      name: 'ID nội dung',
      key: 'id'
    },
    {
      name: hadLearnerStudying ? '' : 'Thao tác',
      key: 'completeCriteria',
      render: (row, parent) => {
        if (hadLearnerStudying) return null;
        if (['content', 'survey', 'exam'].includes(row.type)) {
          return (
            <ButtonMenuContent
              onMoveToTop={() => contentAction.onMoveToTop(row, parent)}
              onMoveToBottom={() => contentAction.onMoveToBottom(row, parent)}
              onMoveUp={() => contentAction.onMoveUp(row, parent)}
              onMoveDown={() => contentAction.onMoveDown(row, parent)}
            />
          );
        }
        if (row.type === 'course') {
          return (
            <Button variant="contained" color="primary" size="small" onClick={onAddLessonStructure}>
              Thêm nội dung
            </Button>
          );
        }
        if (row.type === 'lesson') {
          return (
            <ButtonMenuLesson
              onMoveUp={() => lessonAction.onMoveUp(row, parent)}
              onMoveDown={() => lessonAction.onMoveDown(row, parent)}
              onEdit={() => lessonAction.onEdit(row, parent)}
              onDelete={() => lessonAction.onDelete(row, parent)}
            />
          );
        }
      }
    }
  ];

  const handlePreview = () => {
    navigate(`${ROUTE_PATH.PREVIEW_COURSE}/${id}`);
  };

  return (
    <>
      <FlexCol
        sx={{
          gap: 2
        }}>
        <BackButton />
        <Box
          sx={{
            background: '#fff',
            padding: 2
          }}>
          <Title>cấu trúc bài học</Title>
          <Divider />
          {courseStructure.length ? (
            <ExpandableTable columns={columns} data={courseStructure} rowKey="id" />
          ) : (
            <EmptyContent onAdd={onAddLessonStructure} />
          )}
        </Box>

        <Flex justifyContent="flex-end">
          <Button onClick={handlePreview} variant="contained">
            Xem trước
          </Button>
          {/* <Button
            variant="contained"
            size="large"
            sx={{ color: '#fff', borderColor: 'black', background: '#66788A', marginRight: 2 }}>
            Hủy
          </Button>
          <Button variant="contained" color="primary" size="large" type="submit">
            Lưu
          </Button> */}
        </Flex>
      </FlexCol>
    </>
  );
}
