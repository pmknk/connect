import type { Theme } from '@mui/material/styles';
import { breakpoints } from '../theme/breakpoints';

type ColorShade =
    | '50'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | '950';
type ColorPalette = Record<ColorShade, string>;

export type ExtendedTheme = {
    palette: {
        gray: ColorPalette;
        slate: ColorPalette;
        lime: ColorPalette;
        yellow: ColorPalette;
        red: ColorPalette;
        stone: ColorPalette;
        amber: ColorPalette;
        neutral: ColorPalette;
        orange: ColorPalette;
        zinc: ColorPalette;
        cyan: ColorPalette;
        teal: ColorPalette;
        emerald: ColorPalette;
        green: ColorPalette;
        violet: ColorPalette;
        indigo: ColorPalette;
        blue: ColorPalette;
        sky: ColorPalette;
        purple: ColorPalette;
        fuchsia: ColorPalette;
        pink: ColorPalette;
        rose: ColorPalette;
    };
    breakpoints: {
        values: (typeof breakpoints)['values'];
    };
} & Theme;
