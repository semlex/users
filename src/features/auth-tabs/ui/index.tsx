import { TabList } from '@mui/lab';
import { Tab } from '@mui/material';
import { SyntheticEvent } from 'react';

type AuthTabsProps = {
  onChange: (event: SyntheticEvent, newValue: string) => void;
};

const AuthTabs = ({ onChange }: AuthTabsProps) => {
  return (
    <TabList onChange={onChange} color={'secondary'}>
      <Tab label="Логин" value="0" />
      <Tab label="Регистрация" value="1" />
    </TabList>
  );
};

export default AuthTabs;
