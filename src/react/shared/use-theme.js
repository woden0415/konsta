import { useContext } from 'react';
import { TailwindMobileTheme } from './context';
import { cls } from './cls';

const propClasses = (classesObj, theme, state) => {
  if (typeof classesObj === 'string') return classesObj;
  const arr = [classesObj.common, classesObj[theme]];
  if (state && classesObj[state]) {
    if (typeof classesObj[state] === 'string') arr.push(classesObj[state]);
    else {
      arr.push(classesObj[state].common, classesObj[state][theme]);
    }
  }
  return arr;
};
const themeClasses = (classesObj, theme, addBaseClassName) => {
  const c = {};
  const themeSubKeys = ['common', 'ios', 'material', 'both'];
  Object.keys(classesObj).forEach((key) => {
    const addBaseClass = key === 'base' ? addBaseClassName : '';
    c[key] = cls(propClasses(classesObj[key], theme), addBaseClass);
    const hasStates =
      typeof classesObj[key] !== 'string' &&
      Object.keys(classesObj[key]).filter(
        (state) => !themeSubKeys.includes(state)
      ).length > 0;
    if (!hasStates) {
      c[key] = cls(propClasses(classesObj[key], theme), addBaseClass);
      return;
    }
    c[key] = {};
    const defaultStateClasses = propClasses(classesObj[key], theme);
    c[key].default = cls(defaultStateClasses, addBaseClass);
    Object.keys(classesObj[key])
      .filter((state) => !themeSubKeys.includes(state))
      .forEach((state) => {
        c[key][state] = cls(
          defaultStateClasses,
          propClasses(classesObj[key], theme, state),
          addBaseClass
        );
      });
  });
  return c;
};

const useTheme = ({ ios, material } = {}) => {
  const themeContext = useContext(TailwindMobileTheme);
  let theme = themeContext || 'both';
  if (ios) theme = 'ios';
  if (material) theme = 'material';
  return {
    theme,
    themeClasses: (classesObj, addBaseClassName) =>
      themeClasses(classesObj, theme, addBaseClassName),
  };
};

export { useTheme };