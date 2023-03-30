import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { getTemplateColumns } from 'state';
import { Template, TemplateDefinition } from 'state/types';
import Icon from 'components/Icon/Icon';
import { colors } from '@mui/material';

type TemplateItemProps = {
  definition: TemplateDefinition;
  selected: boolean;
  onSelect: (template: Template) => void;
};

export function TemplateItem({
  definition,
  selected,
  onSelect,
}: TemplateItemProps) {
  const { t } = useTranslation();
  const columns = getTemplateColumns(definition.type, t);
  return (
    <Item
      selected={selected}
      onClick={() => {
        onSelect(definition.type);
      }}
    >
      <ItemIcon>
        {columns.map((col) => (
          <Icon key={col.type} icon={col.icon} />
        ))}
      </ItemIcon>
      <ItemTitle>{definition.name}</ItemTitle>
    </Item>
  );
}

const Item = styled.div<{ selected: boolean }>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: ${(p) => (p.selected ? colors.deepPurple[700] : null)};
  color: ${(p) => (p.selected ? colors.grey[50] : colors.grey[500])};
  min-width: 185px;

  :hover {
    background-color: ${colors.deepPurple[50]};
    color: ${colors.grey[700]};
  }
`;

const ItemIcon = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const ItemTitle = styled.div`
  margin-top: 15px;
  font-size: 0.8rem;
`;
