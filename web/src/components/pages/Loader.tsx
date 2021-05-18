import React, { FC, ReactElement, useEffect } from "react";
import logo from "../../assets/melyon-animation.svg";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { LoaderState } from "../../redux/reducers/general/loader";
import { Dispatch, StateInterface } from "../../redux";

const LoaderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const LogoStyle = styled.div<{ url: string }>`
  width: 100px;
  height: 100px;
  background: url(${(theme) => theme.url}) no-repeat;
  margin: 0 0 30px auto;
`;

const Trouble = styled.div<{ isTrouble: boolean }>`
  display: ${(theme) => (theme.isTrouble ? "inline-block" : "none")};
  margin: 0 -30px;
  color: var(--main-hidden-color);
  font-family: monospace, sans-serif;
`;

export const Loader: FC = (): ReactElement => {
  const dispatch = useDispatch<Dispatch<LoaderState>>();
  const { troubleMessage } = useSelector<StateInterface, LoaderState>(
    (state) => state.loader
  );
  useEffect(() => {
    const trouble = setTimeout(() => {
      dispatch({
        type: "UPDATE_LOADER_STATE",
        payload: {
          troubleMessage: "⚠ A connection trouble",
        },
      });
    }, 3000 * 2);
    return () => {
      clearTimeout(trouble);
    };
  });
  return (
    <LoaderContainer>
      <LogoStyle url={logo} />
      <Trouble
        isTrouble={troubleMessage && troubleMessage.length !== 0 ? true : false}
      >
        {troubleMessage}
      </Trouble>
    </LoaderContainer>
  );
};
