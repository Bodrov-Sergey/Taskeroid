import { memo as reactMemo } from 'react';

export const memo: <T>(Component: T) => T = reactMemo;
