import React, { FC } from "react";
import styled from "styled-components";
import staticImage from "../../assets/melyon-static.svg";
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
  margin: 10px;
`;

const Links = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  .link {
    width: auto;
    margin: 5px;
    display: inline-block;
    padding: 7px 10px;
    text-align: center;
    background: var(--main-white-transparent);
    cursor: pointer;
    border-radius: 5px;
    &:hover {
      background: var(--main-white-transparent-hoved);
    }
  }
`;

export const Navbar: FC<NavbarType> = ({ isVisible = true, extension }) => {
  return (
    <NavBarStyle id="navbar" isVisible={isVisible}>
      <LogoImage url={staticImage} />
      <Links>
        {extension.links.map((link, i) => (
          <div
            key={i}
            title={link.name}
            className="link"
            onClick={() => window.open(link.href)}
          >
            <i className={link.ico} />
          </div>
        ))}
      </Links>
    </NavBarStyle>
  );
};
