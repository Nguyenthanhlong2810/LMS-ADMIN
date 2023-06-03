import React from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import HelpIcon from '@mui/icons-material/Help';
import FolderIcon from '@mui/icons-material/Folder';
import MenuDownload from './MenuDownload';
import { Box, Checkbox, Typography } from '@mui/material';
import { setSelectLecture } from 'store/reducers/courseDetailSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Lecture = ({ section, fatherIndex, childIndex }) => {
  const dispatch = useDispatch();

  // const lessonData = useSelector((state) => state.courseDetail.lessonData);
  // const lessonStructure = useSelector((state) => state.courseDetail.lessonStructure);
  const selectedLecture = useSelector((state) => state.courseDetail.selectedLecture);

  const isSelected =
    selectedLecture?.id === section?.id &&
    selectedLecture?.fatherIndex === fatherIndex &&
    selectedLecture?.childIndex === childIndex;

  const checkEnable = () => {
    // if (lessonData?.completedByOrder) {
    //   if (section?.completed) {
    //     return true;
    //   } else if (fatherIndex === 0 && childIndex === 0) {
    //     return true;
    //   } else if (childIndex > 0) {
    //     return lessonStructure[fatherIndex].children[childIndex - 1]?.completed;
    //   } else if (childIndex === 0 && fatherIndex > 0) {
    //     return lessonStructure[fatherIndex - 1]?.children[
    //       lessonStructure[fatherIndex - 1]?.children.length - 1
    //     ]?.completed;
    //   }
    // } else {
    //   return true;
    // }
    return true;
  };
  const handleSelectLesson = () => {
    if (checkEnable()) return dispatch(setSelectLecture({ ...section, fatherIndex, childIndex }));
    return toast.error('Bạn phải hoàn thành các bài học theo thứ tự');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        marginLeft: '1.75rem'
      }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
        <Checkbox sx={{ padding: '0 0.5625rem' }} disabled checked={section?.completed} />
        <Box width={'100%'}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Typography
              sx={{
                fontWeight: '500',
                fontSize: '14px',
                lineHeight: '135%',
                cursor: checkEnable() ? 'pointer' : 'not-allowed',
                color: !checkEnable() ? '#999' : isSelected ? '#1885df' : '#000000de'
              }}
              onClick={handleSelectLesson}>
              {section?.name?.split('.')?.at(0)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <TypeLecture type={section?.type} data={section} isEnable={checkEnable()} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
const TypeLecture = ({ type, data, isEnable }) => {
  switch (type) {
    case 'VIDEO':
      return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PlayCircleIcon
              sx={{ fontSize: '0.875rem', marginRight: '0.5rem', color: !isEnable && '#999' }}
            />
            <Typography sx={{ color: !isEnable && '#999' }}>{data?.timeLong}</Typography>
          </Box>
          <Box>{data?.canDownload && <MenuDownload data={data} isEnable={isEnable} />}</Box>
        </Box>
      );
    case 'DOCUMENT':
      return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FolderIcon
              sx={{ fontSize: '0.875rem', marginRight: '0.5rem', color: !isEnable && '#999' }}
            />
            <Typography sx={{ color: !isEnable && '#999' }}>
              {data?.timeLong && `${data?.timeLong} trang`}
            </Typography>
          </Box>
          <Box>{data?.canDownload && <MenuDownload data={data} isEnable={isEnable} />}</Box>
        </Box>
      );
    case 'AICC':
      return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FolderIcon
              sx={{ fontSize: '0.875rem', marginRight: '0.5rem', color: !isEnable && '#999' }}
            />
            <Typography sx={{ color: !isEnable && '#999' }}>
              {data?.timeLong && `${data?.timeLong}`}
            </Typography>
          </Box>
          <Box>{data?.canDownload && <MenuDownload data={data} isEnable={isEnable} />}</Box>
        </Box>
      );
    case 'SCROM':
      return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FolderIcon
              sx={{ fontSize: '0.875rem', marginRight: '0.5rem', color: !isEnable && '#999' }}
            />
            <Typography sx={{ color: !isEnable && '#999' }}>
              {data?.timeLong && `${data?.timeLong}`}
            </Typography>
          </Box>
          <Box>{data?.canDownload && <MenuDownload data={data} isEnable={isEnable} />}</Box>
        </Box>
      );
    case 'EXAM':
      return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <HelpIcon
              sx={{ fontSize: '0.875rem', marginRight: '0.5rem', color: !isEnable && '#999' }}
            />
            <Typography sx={{ color: !isEnable && '#999' }}>
              {data?.totalQuestion && `${data?.totalQuestion} câu`}
            </Typography>
          </Box>
          <Box>{/* <MenuDownload /> */}</Box>
        </Box>
      );
    case 'SURVEY':
      return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* <PollIcon sx={{ fontSize: '0.875rem', marginRight: '0.5rem' }} /> */}
            {/* <Typography>{data?.timeLong && `${data?.timeLong} câu`}</Typography> */}
          </Box>
          <Box>{/* <MenuDownload /> */}</Box>
        </Box>
      );
    default:
      return null;
  }
};
export default Lecture;
