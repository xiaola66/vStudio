import Swal from 'sweetalert2';
import './style.css';

/**
 * confirm
 * @param title confirm title
 * @param text confirm text
 * @param func on click ok
 * @param cancelMessage cancel message
 * @param confirmMessage confirm message
 */
export const Confirm = (
  title: string,
  text: string,
  func: () => void,
  cancelMessage = '',
  confirmMessage = ''
) => {
  Swal.fire({
    width: '370px',
    title: title,
    html: text,
    showConfirmButton: cancelMessage === '' || Boolean(cancelMessage),
    showCancelButton: confirmMessage === '' || Boolean(confirmMessage),
    cancelButtonText: cancelMessage ? cancelMessage : '关闭',
    confirmButtonText: confirmMessage ? confirmMessage : '确定',
    reverseButtons: true,
    customClass: {
      container: 'v-confirm',
    },
  }).then(result => {
    if (result.value) {
      func();
    }
  });
};
