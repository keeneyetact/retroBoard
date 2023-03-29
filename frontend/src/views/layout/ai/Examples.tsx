import styled from '@emotion/styled';
import { Color, colors } from '@mui/material';
import { useTranslation } from 'react-i18next';

type ExamplesProps = {
  onSelect: (message: string) => void;
};

const palette: Color[] = [
  colors.blue,
  colors.orange,
  colors.green,
  colors.purple,
  colors.cyan,
];

export function Examples({ onSelect }: ExamplesProps) {
  const { t } = useTranslation();
  return (
    <Container>
      <Title>{t('Ai.examplesTitle')}</Title>
      <Items>
        {(t('Ai.examples', { returnObjects: true }) as string[]).map(
          (example, index) => (
            <Item
              mainColor={palette[index % (palette.length - 1)]}
              key={index}
              onClick={() => onSelect(example)}
            >
              {example}
            </Item>
          )
        )}
      </Items>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
  font-weight: 100;
  color: #ccc;
`;

const Item = styled.div<{ mainColor: Color }>`
  display: inline-flex;
  padding: 10px;
  border: 1px solid ${(p) => p.mainColor[200]};
  border-radius: 20px;
  margin: 10px;
  color: ${(p) => p.mainColor[200]};

  :hover {
    cursor: pointer;
    color: ${(p) => p.mainColor[500]};
    background-color: ${(p) => p.mainColor[50]};
  }
`;

const Items = styled.div`
  margin: 0 40px;
  display: flex;
  justify-items: center;
  flex-wrap: wrap;
`;
