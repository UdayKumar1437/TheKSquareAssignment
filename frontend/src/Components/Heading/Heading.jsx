import * as React from 'react';
import { styled } from '@mui/material/styles';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  padding: theme.spacing(1),
  fontSize: '1.5rem',
  fontWeight: 'bold',
  textAlign: 'center',
}));

export default function TypographyTheme({ Text}) {
  return <Div >{Text}</Div>;
}
