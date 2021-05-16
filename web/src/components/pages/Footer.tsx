import React, { FC, ReactElement } from "react";
import styled from "styled-components";

const FooterStyled = styled.footer`
  width: 100%;
`;
const Column = styled.div`
  position: relative;
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
`;
export const Footer: FC = (): ReactElement => ( // new footer soon
  <FooterStyled>
    <Column>
      <div className="made-with">
        Made with <span className="gradient-text green">❤</span>{" "}
        <a className="gradient-text blue" href="https://github.com/CA1R7">
          cair71
        </a>
      </div>
    </Column>
  </FooterStyled>
);
