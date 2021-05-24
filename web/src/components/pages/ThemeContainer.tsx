import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "../../redux";
import { HomeState } from "../../redux/reducers/general/home";
import styled from "styled-components";
import { ExtensionType, ColorType } from "../RouterHandler";

export interface ThemeContainerProps {
  extension: ExtensionType;
  lastContainerScrolled: boolean;
  colorTheme: number | undefined;
  mouseDown: boolean;
}
const Container = styled.div<{
  firstContainer?: boolean;
  imgPreview?: string;
  heightContainer?: number;
  scrolled?: boolean;
}>`
  ${
    ({ firstContainer }) => (firstContainer ? `margin: 100px 50px;text-align: center;` : "") /* prettier-ignore*/
  }
  position: relative;
  height: ${({ heightContainer }) =>
    heightContainer && heightContainer - 200}px;
  .mouse-down {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
  }
  .title-xall > span {
    font-size: 60px;
    font-family: Calibri, sans-serif;
    font-weight: 400;
    animation-name: fadeIn;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-duration: 1.5s;
  }
  .description {
    font-size: 16px;
    margin: 5px;
    color: var(--main-gidden-color);
    &.box {
      position: relative;
      padding: 20px;
      background: var(--main-background-forced);
      border-radius: 4px;
      box-shadow: 5px 5px 10px var(--main-black-transparent);
      margin: 10px;
      z-index: 9999;
    }
  }
  .content {
    position: relative;
    width: 100%;
    .left-side {
      width: 40%;
      float: left;
      .hr {
        width: 80%;
        height: 2px;
        background: var(--main-background-forced);
        margin: 10px;
      }
      .labels {
        margin: 0 5px;
        span {
          margin: 5px;
          padding: 2px 15px;
          font-size: 13px;
          border-radius: 20px;
          cursor: pointer;
          margin-left: 20px;
          ${({ scrolled }) =>
            scrolled
              ? "opacity:1;margin-left: 5px;"
              : "opacity: 0;margin-left: -10px;"}
        }
      }
      .features {
        .title {
          font-size: 15px;
          margin: 0 10px;
        }
        ul {
          li {
            ${({ scrolled }) => (scrolled ? "opacity:1;" : "opacity: 0;")}
            font-size: 15px;
          }
        }
        .button-to-the-market {
          width: 150px;
          margin: 10px;
          padding: 10px;
          background: var(--main-white-transparent);
          border-radius: 50px;
          text-align: center;
          cursor: pointer;
          &:hover {
            background: var(--main-white-transparent-hoved);
          }
        }
      }
    }
    .right-side {
      width: 35%;
      float: left;
      border-left: 1px solid var(--main-background-forced);
      .img-box {
        margin: 0 10px;
        border-radius: 10px;
        width: 600px;
        background: #fff;
        float: left;
        background: url(${({ imgPreview }) => imgPreview}) no-repeat;
        ${({ scrolled }) =>
          scrolled
            ? "opacity:1;margin-left: 10px;"
            : "opacity: 0;margin-left: 20px;"}
      }
    }
  }
`;

export const ThemeContainer: FC<ThemeContainerProps> = ({
  extension,
  colorTheme,
  lastContainerScrolled,
  mouseDown,
}) => {
  const [SHeightContainer, setHeightContainer] = useState(0);
  const dispatch = useDispatch<Dispatch<HomeState>>();
  const colorState: ColorType =
    extension.versions[typeof colorTheme !== "undefined" ? colorTheme : 0];
  const chnageColor = (color: number) => {
    if (extension.versions[color]) {
      dispatch({
        type: "UPDATE_HOME_STATE",
        payload: {
          colorTheme: color,
        },
      });
    }
  };
  const redirectMarketPlace = () => {
    window.open(
      "https://marketplace.visualstudio.com/items?itemName=cair71.melyon-vscode"
    );
  };
  useEffect(() => {
    setHeightContainer(window.screen.height);
  }, [setHeightContainer]);
  return (
    <>
      <Container firstContainer={true} heightContainer={SHeightContainer}>
        <div className="title-xall">
          <span className="gradient-text blue">Melyon</span> <span>Theme</span>
        </div>
        <div className="description">A dark theme for visual studio code</div>

        <div className="svgs">
          {extension.badges.map((badge, i) => (
            <a
              key={i}
              href={`#${badge}`}
              onClick={() => redirectMarketPlace()}
              style={{ margin: "5px" }}
            >
              <img
                alt={badge}
                src={`https://vsmarketplacebadge.apphb.com/${badge}/cair71.melyon-vscode.svg`}
              />
            </a>
          ))}
        </div>
        {mouseDown ? <div className="mouse-down">🔻 GO DOWN 🔻</div> : null}
      </Container>
      <Container
        heightContainer={SHeightContainer}
        scrolled={lastContainerScrolled}
      >
        <div className="number-subject">.01</div>
        <div className="title-xall">
          <span>Theme</span>
        </div>
        <div className="content">
          <div className="left-side">
            <div className="hr"></div>
            <div className="labels">
              {extension.versions.map((label, i) => (
                <span
                  key={i}
                  onClick={() => chnageColor(i)}
                  style={{
                    color: label.hex_color,
                    border: `1px solid ${label.hex_color}`,
                  }}
                >
                  {label.name_color}
                </span>
              ))}
            </div>
            <div className="description box">
              A dark theme for vs code, Designed for night time coding.
            </div>
            <div className="features">
              <div className="title">Features :</div>
              <ul>
                {extension.features.map((fueature, i) => (
                  <li key={i}>{fueature}</li>
                ))}
              </ul>
              <div className="title">Links :</div>
              <div
                className="button-to-the-market"
                onClick={() => redirectMarketPlace()}
              >
                Marketplace
              </div>
            </div>
          </div>
          <div className="right-side">
            <img className="img-box" src={colorState.preview_image}></img>
          </div>
        </div>
      </Container>
    </>
  );
};
