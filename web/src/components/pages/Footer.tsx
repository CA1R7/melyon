import React, { FC, ReactElement, useEffect, useState } from "react";
import styled from "styled-components";

import logo from "../../assets/melyon-static.svg";

const FooterStyled = styled.footer`
  width: 100%;
  height: 100px;
`;
const Column = styled.div`
  position: relative;
  img {
    width: 50px;
    margin: 23px;
    opacity: 3;
    display: none;
    &.active {
      display: inline-block;
      animation: fadeIn 1s;
    }
  }
  @media (max-width: 800px) {
    img {
      display: none;
    }
  }
  .made-with {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 15px;
    color: var(--main-hidden-color);
    a {
      text-transform: uppercase;
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 3;
    }
  }
`;
export const Footer: FC = (): ReactElement => {
  const [visibledLogo, setVisibleLogo] = useState(false);
  const handleScroll = () => {
    setVisibleLogo(window.pageYOffset >= 100);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);
  return (
    <FooterStyled>
      <Column>
        <img
          className={visibledLogo ? "active" : ""}
          src={logo}
          alt="melyon-logo"
        />
        <div className="made-with">
          Made with <span className="gradient-text green">❤</span>{" "}
          <a className="gradient-text blue" href="https://github.com/CA1R7">
            cair71
          </a>
        </div>
      </Column>
    </FooterStyled>
  );
};
