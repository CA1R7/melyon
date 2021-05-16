import React, { FC } from "react";
import styled from "styled-components";
import staticImage from "../../assets/melyon-static.svg";
import github from "../../assets/github.svg";
import { ExtensionType } from "../RouterHandler";

export interface NavPropsStyleType {
  isVisible: boolean;
}
export interface NavbarType extends NavPropsStyleType {
  extension: ExtensionType;
}
const NavBarStyle = styled.nav<NavPropsStyleType>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
  z-index: 999999999;
  animation: fromTop 2s;
  @keyframes fromTop {
    from {
      top: -100px;
    }
    to {
      top: 0;
    }
  }
`;

type ImageAttr = { url: string };

const LogoImage = styled.div<ImageAttr>`
  float: left;
  background: url(${(theme) => theme.url}) no-repeat;
  width: 40px;
  height: 40px;
  margin: 5px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;
const GithubLogo = styled.div<ImageAttr>`
  background-color: #fff;
  background: url(${(theme) => theme.url}) no-repeat;
  width: 30px;
  height: 30px;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;

const redirecttoRepo = (url: string): void => {
  window.open(url);
};

export const Navbar: FC<NavbarType> = ({ isVisible = true, extension }) => {
  return (
    <NavBarStyle id="navbar" isVisible={isVisible}>
      <LogoImage url={staticImage} />
      <GithubLogo
        url={github}
        onClick={() => redirecttoRepo(extension.repoGithub)}
      />
    </NavBarStyle>
  );
};
