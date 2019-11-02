import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface SettingCategoryProps {
  title: string;
  subtitle: string;
}

const SettingCategory: React.FC<SettingCategoryProps> = ({
  title,
  subtitle,
  children,
}) => {
  const [open, setOpen] = useState(true);
  const toggleOpen = useCallback(() => {
    setOpen(state => !state);
  }, []);
  return (
    <ExpansionPanel expanded={open} onChange={toggleOpen}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <ChildrenContainer>{children}</ChildrenContainer>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const ChildrenContainer = styled.div`
  width: 100%;
`;

export default SettingCategory;
