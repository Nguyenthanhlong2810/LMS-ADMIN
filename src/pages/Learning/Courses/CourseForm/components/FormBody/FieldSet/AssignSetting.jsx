import { Box, MenuItem, Select, TextField } from '@mui/material';
import { FormControl } from 'components';
import React from 'react';
import { Controller } from 'react-hook-form';
import { ASSIGN_CONFIG } from '../config';
import { FlexRow } from './Layout';

export default function AssignSetting({ form }) {
  const { register, control } = form;

  return (
    <>
      <FormControl label="Loại gán">
        <Controller
          name="assignTypeName"
          render={({ field: { value, onChange } }) => (
            <Select value={value} onChange={onChange}>
              <MenuItem value="optional">Tùy chọn</MenuItem>
              <MenuItem value="required">Bắt buộc</MenuItem>
            </Select>
          )}
          control={control}
        />
      </FormControl>

      <FlexRow justifyContent="space-between">
        <Box width={'33%'}>
          <FormControl label="Tính thời gian hoàn thành theo">
            <Controller
              name="assignDoneName"
              render={({ field: { value, onChange } }) => (
                <Select value={value} onChange={onChange}>
                  {ASSIGN_CONFIG.TIME_METRICS.map(({ name, value }) => (
                    <MenuItem key={value} value={value}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              )}
              control={control}
            />
          </FormControl>
        </Box>
        <Box width={'33%'}>
          <FormControl label="Thời gian hoàn thành">
            <TextField type="number" {...register('assignNum')} />
          </FormControl>
        </Box>
        <Box width={'33%'}>
          <FormControl label="Đơn vị tính">
            <Controller
              name="assignBaseName"
              render={({ field: { value, onChange } }) => (
                <Select value={value} onChange={onChange}>
                  {ASSIGN_CONFIG.TIME_UNITS.map(({ name, value }) => (
                    <MenuItem key={value} value={value}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              )}
              control={control}
            />
          </FormControl>
        </Box>
      </FlexRow>
      <FlexRow justifyContent="space-between">
        <Box width={'33%'}>
          <FormControl label="Tính thời gian tái đào tạo theo">
            <Controller
              name="assignAgainName"
              render={({ field: { value, onChange } }) => (
                <Select value={value} onChange={onChange}>
                  {ASSIGN_CONFIG.TIME_METRICS.map(({ name, value }) => (
                    <MenuItem key={value} value={value}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              )}
              control={control}
            />
          </FormControl>
        </Box>
        <Box width={'33%'}>
          <FormControl label="Thời gian yêu cầu tái đào tạo">
            <TextField type="number" {...register('assignNumAgain')} />
          </FormControl>
        </Box>
        <Box width={'33%'}>
          <FormControl label="Đơn vị tính">
            <Controller
              name="assignBaseAgainName"
              render={({ field: { value, onChange } }) => (
                <Select value={value} onChange={onChange}>
                  {ASSIGN_CONFIG.TIME_UNITS.map(({ name, value }) => (
                    <MenuItem key={value} value={value}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              )}
              control={control}
            />
          </FormControl>
        </Box>
      </FlexRow>
    </>
  );
}
