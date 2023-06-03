import React from 'react';
import { Button, InputAdornment, Switch, TextField } from '@mui/material';
import { Controller, useFieldArray } from 'react-hook-form';
import { StyledHorizonLine } from '../style';
import { FormControl } from 'components';
import SearchIcon from '@mui/icons-material/Search';
import { Add } from '@mui/icons-material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import ClearIcon from '@mui/icons-material/Clear';

export default function ExaminationFieldArray({ control, register, setOpenExaminationModal }) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: 'examSettings'
  });

  return (
    <>
      {fields?.map((item, index) => {
        return (
          <div key={index}>
            <StyledHorizonLine />
            <FormControl label="">
              <div className="d-flex">
                <TextField
                  placeholder="Tìm kiếm bài kiểm tra"
                  disabled
                  {...register(`examSettings[${index}].examTitle`)}
                  className=" flex-1 "
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {fields.length > 1 && (
                          <ClearIcon
                            onClick={() => {
                              remove(index);
                            }}
                          />
                        )}
                        <SearchIcon onClick={() => setOpenExaminationModal(true)} />
                      </InputAdornment>
                    )
                  }}
                />
                <Button
                  color="secondary"
                  size="large"
                  sx={{ height: 40, width: 40, padding: '28px 0' }}>
                  <Add
                    onClick={() =>
                      append({
                        timeWork: null
                      })
                    }
                  />
                </Button>
              </div>
            </FormControl>
            <FormControl
              label="Thời gian làm bài"
              flexFlow="row"
              alignItems="center"
              titleWidth="160px">
              <Controller
                name={`examSettings.${index}.timeWork`}
                render={({ field: { value, onChange } }) => (
                  <TimePicker
                    value={value}
                    ampm={false}
                    onChange={onChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                )}
                control={control}
              />
            </FormControl>
            <FormControl label="Điểm đạt" flexFlow="row" alignItems="center" titleWidth="160px">
              <TextField type="number" {...register(`examSettings.${index}.markPass`)} />%
            </FormControl>

            <div style={{ paddingLeft: 16 }}>
              <span>Khoá các nội dung khác khi đang làm bài</span>
              <Switch defaultChecked={true} {...register(`examSettings.${index}.blockContent`)} />
            </div>
          </div>
        );
      })}
    </>
  );
}
