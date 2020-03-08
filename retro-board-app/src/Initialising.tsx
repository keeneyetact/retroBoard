import React from 'react';
import styled from 'styled-components';

const Initialising = () => {
  return (
    <Content>
      <Spinner>
        <Ball>
          <div></div>
          <div></div>
        </Ball>
      </Spinner>
    </Content>
  );
};

const Content = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #512da8;
  body {
  }
`;

const Spinner = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
  width: 100px;
  height: 100px;
`;

const Ball = styled.div`
  &,
  & > div {
    position: relative;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 96px;
    height: 96px;
  }

  & {
    display: block;
    font-size: 0;
    color: #fff;
  }

  & > div {
    display: inline-block;
    float: none;
    background-color: currentColor;
    border: 0 solid currentColor;
  }

  & > div {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 100%;
    opacity: 0.5;
    -webkit-animation: ball-scale-pulse 2s infinite ease-in-out;
    -moz-animation: ball-scale-pulse 2s infinite ease-in-out;
    -o-animation: ball-scale-pulse 2s infinite ease-in-out;
    animation: ball-scale-pulse 2s infinite ease-in-out;
  }

  & > div:last-child {
    -webkit-animation-delay: -1s;
    -moz-animation-delay: -1s;
    -o-animation-delay: -1s;
    animation-delay: -1s;
  }

  @-webkit-keyframes ball-scale-pulse {
    0%,
    100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }

    50% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }

  @-moz-keyframes ball-scale-pulse {
    0%,
    100% {
      -moz-transform: scale(0);
      transform: scale(0);
    }

    50% {
      -moz-transform: scale(1);
      transform: scale(1);
    }
  }

  @-o-keyframes ball-scale-pulse {
    0%,
    100% {
      -o-transform: scale(0);
      transform: scale(0);
    }

    50% {
      -o-transform: scale(1);
      transform: scale(1);
    }
  }

  @keyframes ball-scale-pulse {
    0%,
    100% {
      -webkit-transform: scale(0);
      -moz-transform: scale(0);
      -o-transform: scale(0);
      transform: scale(0);
    }

    50% {
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
    }
  }
`;

export default Initialising;
