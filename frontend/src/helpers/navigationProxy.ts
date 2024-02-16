import { NavigateFunction } from 'react-router-dom';

// custom history object to allow navigation outside react components
interface NavigationProxy {
    navigate: null | NavigateFunction;
}

export const navigationProxy: NavigationProxy = {
    navigate: null,
};
