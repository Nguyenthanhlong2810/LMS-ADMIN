import React from 'react';
import { Button } from '@mui/material';
import { useFieldArray } from 'react-hook-form';
import { StyledFileLesson, StyledFileLessonItem } from './style';

export default function ImportContentFieldArray({ control, setValue }) {
  const { fields, remove } = useFieldArray({
    control,
    name: 'contentUploads'
  });

  const onDelete = (index) => {
    remove(index);
    const newContentUploadIds = fields?.map((el) => el.id);
    setValue('contentUploadIds', newContentUploadIds);
  };

  return (
    <>
      <StyledFileLesson>
        {fields?.map((item, index) => {
          return (
            <StyledFileLessonItem key={index}>
              <div className="file-name">{item.nameContent}</div>
              <div className="file-size">{item?.size}</div>
              <div className="file-delete-btn" onClick={() => onDelete(index)}>
                x
              </div>
            </StyledFileLessonItem>
          );
        })}
        {fields.length ? (
          <div className="file-delete-all-btn">
            <Button color="error" onClick={() => remove()}>
              Xoá hết
            </Button>
          </div>
        ) : null}
      </StyledFileLesson>
    </>
  );
}
