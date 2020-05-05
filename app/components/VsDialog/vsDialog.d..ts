/*
 * @Author: Ren jieyun
 * @Date:   2020-02-19 13:58:00
 * @Last Modified by:   jieyun Ren
 * @Last Modified time: 2020-03-28 20:25:47
 */
interface VsDialogProps {
  title: any;
  classes: any;
  type?: number; // type === 1 ? 'basic form'
  open: boolean;
  actions?: any;
  content: any;
  className?: any;
  formatMessage?: any;
  onCancel?: () => void;
  onDataChange?: () => void;
  onSubmit?: () => void;
}
