import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

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
          <Typography component="div" style={{ fontWeight: 'bold' }}>
            {label}
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
  width: 220px;
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  min-height: 50px;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 10px;
    ${ComponentContainer} {
      width: 100%;
    }
    ${Label} {
    }
  }
`;

export default OptionItem;
