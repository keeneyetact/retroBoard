import styled from '@emotion/styled';

export function FullScreenLoader() {
  return (
    <Container>
      <Loader>
        R<span>.</span>
        <span>.</span>
        <span>.</span>
      </Loader>
    </Container>
  );
}

const Container = styled.div`
  background-color: #673ab7;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`;

const Loader = styled.div`
  font-size: 5rem;
  font-weight: bold;
  display: flex;
  margin: 0;
  padding: 0;
  @keyframes blink {
    50% {
      color: transparent;
    }
  }
  > span {
    animation: 1s blink infinite;
    display: block;
    margin: 0;
  }
  > span:nth-child(2) {
    animation-delay: 250ms;
  }
  > span:nth-child(3) {
    animation-delay: 500ms;
  }
`;
