import React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function stringToColor(string) {
  let hash = 0;
  let color = '#';

  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  const nameParts = name.split(' ');
  const initials = nameParts.length >= 2
    ? `${nameParts[0][0]}${nameParts[1][0]}`
    : nameParts[0][0];

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  };
}

export default function BackgroundLetterAvatars({ name }) {
  if (!name) {
    return null; // or return a default avatar
  }

  return (
    <Stack direction="row" className='d-flex justify-content-center' spacing={2}>
      <Avatar {...stringAvatar(name)} />
    </Stack>
  );
}