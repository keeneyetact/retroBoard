import { useState, useCallback } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { ColumnContent } from '../types';
import { Page } from '../../../components/Page';
import SummaryMode from './SummaryMode';

interface SummaryModeProps {
  columns: ColumnContent[];
  search: string;
}

const SummaryHome = ({ columns, search }: SummaryModeProps) => {
  const [tab, setTab] = useState(0);
  const handleChange = useCallback((_, v) => setTab(v), []);
  return (
    <>
      <AppBar position="static" color="default">
        <Tabs
          value={tab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="summary tabs"
        >
          <Tab label="Summary" icon={<PhoneIcon />} />
          <Tab label="Markdown" icon={<FavoriteIcon />} />
        </Tabs>
      </AppBar>
      <Page>
        <SummaryMode columns={columns} search={search} />
      </Page>
    </>
  );
};

export default SummaryHome;
