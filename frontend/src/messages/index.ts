import { toast, ToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastProps extends ToastContainerProps {}

export const DEFAULT_TOAST_OPTIONS: ToastProps = {
    position: 'bottom-left',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
};

const success = (message: string) =>
    toast.success(message, DEFAULT_TOAST_OPTIONS);
const error = (message: string) => toast.error(message, DEFAULT_TOAST_OPTIONS);
const warning = (message: string) =>
    toast.warning(message, DEFAULT_TOAST_OPTIONS);
const info = (message: string) => toast(message, DEFAULT_TOAST_OPTIONS);

export default {
    success,
    error,
    warning,
    info,
};
