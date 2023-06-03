import { ByteToMegaByte } from 'helpers';
import { cloneDeep, omit, pick } from 'lodash';
import {
  ACCEPT_IMAGES,
  ACCEPT_VIDEO,
  COURSE_TYPE,
  defaultValue,
  MAX_SIZE_IMAGE,
  MAX_SIZE_VIDEO
} from './config';

const getAllNonEmptyValue = (arr) =>
  arr.reduce((prev, cur) => {
    if (cur?.value) {
      return [...prev, cur.value];
    }
    return prev;
  }, []);

export const formatSubmitData = (data, fileListObj) => {
  let submitData = cloneDeep(data);
  let files = [];
  if (submitData.type === COURSE_TYPE.OFFER) {
    submitData.fileNameProvideBy1 = undefined;
    submitData.fileNameProvideBy2 = undefined;
    submitData.fileNameProvideBy3 = undefined;
    files = omit(fileListObj, ['fileNameProvideBy1', 'fileNameProvideBy2', 'fileNameProvideBy3']);
  }
  if (submitData.type === COURSE_TYPE.PROVIDE) {
    submitData.fileNameOfferBy = undefined;
    files = omit(fileListObj, ['fileNameOfferBy']);
  }
  submitData.requirementCoursesName = getAllNonEmptyValue(submitData.requirementCoursesName);
  if (submitData.requireApproval === 'false') {
    submitData.approveName = undefined;
  }
  if (submitData.requireCancel === 'false') {
    submitData.cancelName = undefined;
  }
  submitData = omit(submitData, [
    'type',
    // 'requireApproval',
    // 'requireCancel',
    'programYear',
    'programKey'
  ]);
  return { submitData, files };
};

export const getFormValueFromData = (data) => {
  data.type = data.fileNameOfferBy ? COURSE_TYPE.OFFER : COURSE_TYPE.PROVIDE;
  data.requireApproval = String(!!data.approveName);
  data.requireCancel = String(!!data.cancelName);
  data.tagsList = (data.tags ?? []).map((c) => c.name);
  data.requirementCoursesName = data.requirementCourses
    ? data.requirementCourses.map((c) => ({
        value: c.name
      }))
    : [{ value: '' }];
  data.programKey = data?.key;
  data.programYear = data?.year;

  return pick(data, Object.keys(defaultValue));
};

export const isFileValid = (file) => {
  const type = file.type;
  const mediaType = type.split('/').at(-1);

  if (type.startsWith('video')) {
    if (!ACCEPT_VIDEO.includes(mediaType) || MAX_SIZE_VIDEO < file.size / 1000000) {
      return false;
    }
  } else if (type.startsWith('image')) {
    if (!ACCEPT_IMAGES.includes(mediaType) || MAX_SIZE_IMAGE < ByteToMegaByte(file.size)) {
      return false;
    }
  } else {
    return false;
  }
  return true;
};
