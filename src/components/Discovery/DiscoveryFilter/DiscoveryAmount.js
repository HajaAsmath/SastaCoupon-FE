import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function DiscoveryAmount({ heading, error }) {
  const [amount, setAmount] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  const updateAmount = (event) => {
    if (event.target.value) {
      setAmount(parseInt(event.target.value));
    } else setAmount(0);
  };

  const addSearchParam = (key, status) => {
    if (status !== '') {
      if (searchParams.has(key)) {
        searchParams.set(key, status);
      } else {
        searchParams.append(key, status);
      }
    } else {
      searchParams.delete(key);
    }
    setSearchParams(searchParams);
  };

  const getSearchParam = (key) => {
    const params = searchParams.get(key);
    if (params !== null && params !== '') {
      return params;
    }
    return '';
  };
  useEffect(() => {
    if (searchParams.has(heading)) {
      setAmount(parseInt(getSearchParam(heading)));
    } else {
      setAmount(0);
    }
  }, [searchParams]);

  useEffect(() => {
    if (amount > 0) {
      addSearchParam(heading, amount.toString());
    } else addSearchParam(heading, '');
  }, [amount]);

  return (
    <>
      <TextField
        margin="normal"
        type= 'number'
        fullWidth
        id={heading}
        label={`${heading} Amount`}
        name={heading}
        onChange={updateAmount}
        error={error}
        helperText= {error?'Min value should be lesser than Max':''}
      />
    </>
  );
}
