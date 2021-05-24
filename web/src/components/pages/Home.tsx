import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StateInterface } from "../../redux";
import { Navbar } from "./Navbar";
import { ThemeContainer } from "./ThemeContainer";
import { Footer } from "./Footer";

import { HomeState } from "../../redux/reducers/general/home";
import { RoutersHandlerState } from "../../redux/reducers/general/router-handler";

export const Home: FC = () => {
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const [lastConatainerScrolled, setLastConatainerScrolled] = useState(false);
  const { colorTheme } = useSelector<StateInterface, HomeState>(
    (state) => state.home
  );
  const { extension } = useSelector<StateInterface, RoutersHandlerState>(
    (state) => state.routersHandler
  );
  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
    setLastConatainerScrolled(
      window.pageYOffset >= Math.abs(document.body.offsetHeight / 2)
    );
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  });
  if (!extension) return null;
  return (
    <div id="g-container">
      <Navbar isVisible={scrolledToTop} extension={extension} />
      <ThemeContainer
        mouseDown={scrolledToTop}
        extension={extension}
        colorTheme={colorTheme}
        lastContainerScrolled={lastConatainerScrolled}
      />
      <Footer />
    </div>
  );
};
