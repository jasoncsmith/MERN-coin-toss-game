export const formatNumber = (num: number): string =>
    new Intl.NumberFormat('en-US').format(num);

export const isTokenExpired = (time: number): boolean =>
    time * 1000 < new Date().getTime();
