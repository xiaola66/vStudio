/*
 * @Author: Ren jieyun
 * @Date:   2020-02-19 13:58:00
 * @Last Modified by:   jieyun Ren
 * @Last Modified time: 2020-03-28 14:46:34
 */
interface RenameProps {
  name: string;
  classes: any;
  isRename?: boolean;
  onChange: (name: string) => void;
  onEdit?: (isEdit: boolean) => void;
  linkPath?: string | undefined;
  type: number;
  apiURL: string;
}
