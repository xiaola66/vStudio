/*
 * @Author: Ren jieyun
 * @Date:   2020-02-19 15:28:27
 * @Last Modified by:   Ren jieyun
 * @Last Modified time: 2020-02-20 17:16:28
 */
import Swal from 'sweetalert2';
const Toast: any = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  customClass: {
    container: 'v-toast',
  },
});

export default Toast;
