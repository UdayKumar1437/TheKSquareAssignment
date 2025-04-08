import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

const PageSelector = ({handleSizeChange,size}) => {
  return (
    <div>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Page Size</InputLabel>
          <Select
            size='small'
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={size}
            label="Page Size"
            onChange={handleSizeChange} // Call handleSizeChange to reset page
          >
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>
    </div>
  )
}

export default PageSelector