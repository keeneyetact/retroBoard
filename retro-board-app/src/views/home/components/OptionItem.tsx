import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';

interface OptionItemProps {
  children: JSX.Element;
  help: string;
  label: string;
}

const OptionItem = ({ label, help, children }: OptionItemProps) => {
  return (
    <Container>
      <Label>
        <Tooltip title={help} placement="top">
          <Typography>
            <Box fontWeight="bold">{label}</Box>
          </Typography>
        </Tooltip>
      </Label>
      <ComponentContainer>{children}</ComponentContainer>
    </Container>
  );
};

const ComponentContainer = styled.div`
  flex: 1;
`;

const Label = styled.div`
  width: 200px;
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  min-height: 50px;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    ${ComponentContainer} {
      width: 100%;
    }
    ${Label} {
    }
  }
`;

export default OptionItem;
