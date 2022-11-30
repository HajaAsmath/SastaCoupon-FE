import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function CaptureDate({ heading }) {
  const [value, setValue] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  const addSearchParam = (key, status) => {
    if (status !== '') {
      if (searchParams.has(key)) {
        searchParams.set(key, status);
      } else {
        searchParams.append(key, status);
      }
      setSearchParams(searchParams);
    }
  };

  const getSearchParam = (key) => {
    const params = searchParams.get(key);
    if (params !== null && params !== '') {
      return params;
    }
    return '';
  };
  useEffect(() => {
    if (getSearchParam(heading) !== '') {
      setValue(new Date(getSearchParam(heading)));
    } else setValue(null);
  }, [searchParams]);

  useEffect(() => {
    addSearchParam(heading, value?.toString() || '');
  }, [value]);

  return (
    <Box component="div" sx={{ alignItems: 'centre', p: 1 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label={heading}
          value={value}
          minDate={new Date()}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Box>
  );
}
