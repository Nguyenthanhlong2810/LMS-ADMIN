import { FormControl, Switch } from 'components';
import React from 'react';
import { Controller } from 'react-hook-form';
import { FlexRow, HalfBox } from '../../../../../../../components/Layout/Layout';

export default function RegistrationSetting({ form }) {
  const { control, setValue } = form;
  return (
    <FlexRow>
      <HalfBox>
        <FormControl label="Học viên có thể tự đăng ký" paddingLeft="0">
          <Controller
            name="selfRegister"
            render={({ field: { value, onChange } }) => (
              <Switch
                checked={value}
                onChange={(e) => {
                  const checked = e.target.checked;
                  if (checked) {
                    setValue('managerRegister', false);
                  }
                  onChange(e);
                }}
              />
            )}
            control={control}
          />
        </FormControl>
      </HalfBox>
      <HalfBox display="flex">
        <FormControl label="Quản lý có thể đăng ký cho nhân viên" paddingRight="0">
          <Controller
            name="managerRegister"
            render={({ field: { value, onChange } }) => (
              <Switch
                checked={value}
                onChange={(e) => {
                  const checked = e.target.checked;
                  if (checked) {
                    setValue('selfRegister', false);
                  }
                  onChange(e);
                }}
              />
            )}
            control={control}
          />
        </FormControl>
      </HalfBox>
    </FlexRow>
  );
}
