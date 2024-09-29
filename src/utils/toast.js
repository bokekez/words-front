import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const options = {
  position: 'bottom-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'light',
  toastId: 'default',
};

export const showToastifyError = (error, popUpId) =>
  toast.error(error, { ...options, toastId: popUpId });

export const showToastifySuccess = (message, popUpId) =>
  toast.success(message, { ...options, toastId: popUpId });

export const showToastifyWarning = (message, popUpId) =>
  toast.warning(message, { ...options, toastId: popUpId });
