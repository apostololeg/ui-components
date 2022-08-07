import { createStore } from 'justorm/react';
import Time from 'timen';

import { colorsConfig, getThemeConfig } from '../theme';

const initialThemeType =
  (localStorage.getItem('theme') as 'light' | 'dark') ?? 'dark';

function getInitialActiveColor() {
  return (
    localStorage.getItem('activeColor') ??
    colorsConfig[initialThemeType]['active-color']
  );
}

const initialActiveColor = getInitialActiveColor();

const getRandomDegree = () => Math.random() * 360;
let clearGradientTimeout;

const STORE = createStore('app', {
  isMenuOpen: false,
  theme: initialThemeType,
  currThemeConfig: getThemeConfig(initialThemeType, initialActiveColor),
  activeColor: initialActiveColor,
  gradient: {
    prev: [getRandomDegree(), getRandomDegree(), getRandomDegree()],
    curr: [getRandomDegree(), getRandomDegree(), getRandomDegree()],
    changeCount: 0,
  },

  setTheme(theme) {
    this.theme = theme;
    this.updateTheme(theme);

    localStorage.setItem('theme', theme);
  },

  setActiveColor(color) {
    this.activeColor = color;
    this.updateTheme();

    localStorage.setItem('activeColor', color);
  },

  updateTheme(theme = this.theme) {
    this.currThemeConfig = getThemeConfig(theme, this.activeColor);
  },

  updateGradient() {
    clearGradientTimeout?.();
    clearGradientTimeout = Time.after(10000, STORE.updateGradient);

    const gr = STORE.gradient;

    STORE.gradient = {
      prev: [...gr.curr],
      curr: [getRandomDegree(), getRandomDegree(), getRandomDegree()],
      changeCount: gr.changeCount + 1,
    };
  },

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  },
});

export default STORE;
