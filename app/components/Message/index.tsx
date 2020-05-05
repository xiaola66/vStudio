import Swal from 'sweetalert2';
import './style.css';

export const warnMessage = (message: string, time: number = 3000) => {
  Swal.fire({
    width: '360px',
    icon: 'warning',
    title: `${message}`,
    timer: time,
    showCancelButton: false,
    showConfirmButton: false,
    customClass: {
      container: 'v-warning',
    },
  });
};

export const successMessage = (message: string, time: number = 3000) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: time,
    customClass: {
      container: 'v-success',
    },
  });

  Toast.fire({
    icon: 'success',
    title: `${message}`,
  });
};
