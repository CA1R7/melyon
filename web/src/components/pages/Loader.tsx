import React, { FC, ReactElement } from "react";

import logo from "../../assets/melyon-animation.svg";

import styled from "styled-components";

const LogoStyle = styled.div<{ url: string }>`
  width: 100px;
  height: 100px;
  background: url(${(theme) => theme.url}) no-repeat;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Loader: FC = (): ReactElement => (
  <div id="loader-screen">
    <div className="content">
      <LogoStyle url={logo} />
    </div>
  </div>
);
