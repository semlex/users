import { TabContext, TabPanel } from '@mui/lab';
import { Card, Stack } from '@mui/material';
import { useState, SyntheticEvent } from 'react';
import { AuthTabs } from '@/features/auth-tabs';
import { SignIn } from '@/features/sign-in';
import { SignUp } from '@/features/sign-up';

const Auth = () => {
  const [value, setValue] = useState<string>('0');

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Card sx={{ width: 'auto', padding: 3 }}>
      <Stack spacing={5} alignItems="center">
        <TabContext value={value}>
          <AuthTabs onChange={handleChange} />
          <TabPanel value="0" sx={{ padding: '0', width: '100%' }}>
            <SignIn />
          </TabPanel>
          <TabPanel value="1" sx={{ padding: '0', width: '100%' }}>
            <SignUp />
          </TabPanel>
        </TabContext>
      </Stack>
    </Card>
  );
};

export default Auth;
