import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "../../redux";
import { HomeState } from "../../redux/reducers/general/home";
import styled from "styled-components";
import { ExtensionType, ColorType } from "../RouterHandler";

const ThemeContainerStyled = styled.div`
  margin: 100px 10px;
  .number-subject {
    margin: 10px 0;
  }
  .title-subject {
    font-size: 50px;
  }
  a {
    margin: 5px;
  }
  .decription-subject {
    color: var(--main-hidden-color);
    margin: 5px 0 10px 5px;
    span {
      cursor: pointer;
      color: rgb(37, 198, 220);
    }
  }
  .cl {
    .title {
      font-size: 13px;
      color: var(--main-hidden-color);
    }
  }
  .features,
  .colors-available {
    margin: 20px 10px;
    ul div li {
      list-style-type: square;
    }
  }
`;

const ColorButton = styled.div<ColorType & { isVisible: boolean }>`
  display: inline-block;
  margin: 10px 5px;
  padding: 1px;
  border: 1px solid ${(theme) => (theme.isVisible ? "#fff" : "transparent")};
  background: linear-gradient(
    50deg,
    ${(theme) => theme.gradient_css.join(",")}
  );
  cursor: pointer;
  position: relative;
  &,
  .border {
    border-radius: 20px;
  }
  .border {
    padding: 5px 15px;
    width: calc(100% - ${15 * 2}px);
    height: 100%;
    background: var(--main-background);
  }
`;
const ColorDetails = styled.div<ColorType>`
  .line-text {
    margin: 3px 10px;
    div {
      display: inline-block;
    }
    .detail-title {
      background: linear-gradient(
        50deg,
        ${(color) => color.gradient_css.join(",")}
      );
    }
    .answer {
      margin: 0 5px;
      width: auto;
      font-family: monospace;
      background: rgb(255, 255, 255, 8%);
      border-radius: 5px;
      padding: 2px 5px;
    }
  }
`;
const ImagePreview = styled.div`
  width: 50%;
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: flex-end;
  img {
    &.preview-image {
      width: 100%;
      border-radius: 20px;
      box-shadow: 5px 5px 20px rgb(0, 0, 0, 38%);
    }
  }
  @media (max-width: 1000px) {
    img {
      display: none;
    }
  }
`;
export interface ThemeContainerProps {
  extension: ExtensionType;
  colorTheme: number | undefined;
}
export const ThemeContainer: FC<ThemeContainerProps> = ({
  extension,
  colorTheme,
}) => {
  const dispatch = useDispatch<Dispatch<HomeState>>();
  const redirectToVSCode = (): void => {
    window.open("https://code.visualstudio.com");
  };
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
  return (
    <ThemeContainerStyled id="theme-container">
      <div className="number-subject gradient-text">01.</div>
      <div className="title-subject">
        {extension.name.split(/\s/).map((text: string, i: number) =>
          i > 0 ? (
            <span key={i} className="gradient-text blue">
              {text}
            </span>
          ) : (
            <span key={i}>{text}</span>
          )
        )}
      </div>
      <div className="decription-subject">
        A dark theme for <span onClick={() => redirectToVSCode()}>vscode</span>
      </div>
      <a href="https://marketplace.visualstudio.com/items?itemName=cair71.melyon-vscodee">
        <img
          alt="Version"
          src="https://vsmarketplacebadge.apphb.com/version/cair71.melyon-vscode.svg"
        />
      </a>
      <a href="https://marketplace.visualstudio.com/items?itemName=cair71.melyon-vscode">
        <img
          alt="Downloads"
          src="https://vsmarketplacebadge.apphb.com/downloads/cair71.melyon-vscode.svg"
        />
      </a>
      <a href="https://marketplace.visualstudio.com/items?itemName=cair71.melyon-vscode">
        <img
          alt="Installs"
          src="https://vsmarketplacebadge.apphb.com/installs/cair71.melyon-vscode.svg"
        />
      </a>
      <div className="features cl">
        <div className="title">Extension features :</div>
        <ul>
          {extension.features.map((feature: string, i: number) => (
            <div key={i}>
              <li className={"gradient-text blue"}>{feature}</li>
            </div>
          ))}
        </ul>
      </div>
      <div className="colors-available cl">
        <div className="title">Colors details :</div>
        <ColorDetails {...colorState}>
          {Object.keys(colorState).map((color: string, i: number) => {
            if (color === "preview_image") return null;
            return (
              <div key={i} className="line-text">
                <div className="detail-title gradient-text">{color}</div>
                <span className="answer">
                  {color === "gradient_css"
                    ? `gradient(${colorState[color].join(",")})`
                    : colorState[color]}
                </span>
              </div>
            );
          })}
        </ColorDetails>
        <div className="colors-wrap"></div>
        <div className="title">Currently colors :</div>
        <div className="content-buttons">
          {extension.versions.map((color, i: number) => (
            <ColorButton
              onClick={() => chnageColor(i)}
              key={i}
              isVisible={colorTheme === i}
              {...color}
            >
              <div className="border">
                <div className={`name-color gradient-text ${color.name_color}`}>
                  {color.name_color}
                </div>
              </div>
            </ColorButton>
          ))}
        </div>
      </div>
      <ImagePreview>
        <img
          className="preview-image"
          src={
            typeof colorTheme === "number"
              ? extension.versions[colorTheme].preview_image
              : ""
          }
          alt="melyon"
        />
      </ImagePreview>
    </ThemeContainerStyled>
  );
};
