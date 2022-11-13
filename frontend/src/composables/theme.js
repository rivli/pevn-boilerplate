import { reactive, toRefs } from "vue";

const themes = {
  light: {
    "--successColor": "#22b85b",
    "--errorColor": "#ed4b4b",

    "--backgroundColor": "#f5f5f5",
    "--backgroundColorLight": "#ffffff",
    "--codeColorLight": "#e4e4e4",
    "--textColor": "#222831",
    "--primaryColor": "#ffa500",
    "--secondaryColor": "#a45d5d",
    "--disabledColor": "#a0a0a0",
    "--borderColor": "#d9dbda",

    "--tabTextColor": "#696969",
    "--appBarTextColor": "#757575",
  },
  dark: {
    "--successColor": "#22b85b",
    "--errorColor": "#ed4b4b",

    "--backgroundColor": "#222831",
    "--backgroundColorLight": "#393e46",
    "--codeColorLight": "#434b57",
    "--textColor": "#eeeeee",
    "--primaryColor": "#ffa500",
    "--secondaryColor": "#a45d5d",
    "--disabledColor": "#a0a0a0",
    "--borderColor": "#8d8d8d",

    "--tabTextColor": "#eeeeee",
    "--appBarTextColor": "#757575",
  },
};

const state = reactive({
  appDOM: null,
  theme: "light",
  custom: {
    "--successColor": "#E7F7F3",
    "--errorColor": "#FEF0F0",

    "--backgroundColor": "#f5f5f5",
    "--backgroundColorLight": "#ffffff",
    "--codeColorLight": "#e4e4e4",
    "--textColor": "#222831",
    "--primaryColor": "#ffa500",
    "--secondaryColor": "#a45d5d",
    "--disabledColor": "#a0a0a0",
    "--borderColor": "#d9dbda",

    "--appBarTextColor": "#757575",
  },
});

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const rgb = result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;

  return {
    ...rgb,
    rgb: `${rgb.r}, ${rgb.g}, ${rgb.b}`,
  };
}

export default () => {
  /**
   * Toggle theme: light/dark
   */
  const toggleTheme = () => {
    state.theme = state.theme === "light" ? "dark" : "light";
    activateTheme(state.theme);
  };

  /** Activates theme
   * @param  {} theme_id Theme identificator - light, dark, custom
   * @param  {} saveToLocaleStorage=true Saves theme change to localStorage
   */
  const activateTheme = (theme_id, saveToLocaleStorage = true) => {
    if (!state.appDOM) return false;

    const theme = themes[theme_id] || state.custom;
    state.theme = themes[theme_id] ? theme_id : "custom";

    for (let prop in theme) {
      state.appDOM.style.setProperty(prop, theme[prop]);
      state.appDOM.style.setProperty(prop + "RGB", hexToRgb(theme[prop]).rgb);
    }

    if (saveToLocaleStorage) {
      const lsTheme = {
        current: state.theme,
        custom: state.custom,
      };

      localStorage.setItem("theme", JSON.stringify(lsTheme));
    }
  };

  /** Set custom theme
   * @param  {} theme=false Custom theme object
   */
  const setCustomTheme = (theme = false) => {
    state.custom = theme || state.custom;
    activateTheme("custom");
  };

  /**
   * Sets the reference to app wrapper for appling theme changes
   * Also it is trigger for appling theme from localStorage on app mounting
   * @param  {} v ref to app wrapper
   */
  const setAppDOMValue = (v) => {
    state.appDOM = v;
    const lsTheme = localStorage.getItem("theme");
    if (lsTheme) {
      const theme = JSON.parse(lsTheme);
      state.custom = theme.custom;
      activateTheme(theme.current, false);
    }
  };

  return {
    state: toRefs(state),
    toggleTheme,
    activateTheme,
    setCustomTheme,
    setAppDOMValue,
  };
};
