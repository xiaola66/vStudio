/*
 * @Author: Ren jieyun
 * @Date:   2020-02-19 13:58:00
 * @Last Modified by:   Ren jieyun
 * @Last Modified time: 2020-02-20 17:13:10
 */
interface PaginationProps {
  pageIndex: number;
  pageSize: number;
  count: number;
  classes?: any;
  type?: number;
  onChange?: (pageIndex: number, pageSize: number) => void;
}

interface PageProps {
  value: number;
  isActive: boolean;
  onClick: () => void;
  isDisabled: boolean;
}

interface EllipsisProps {
  onClick: () => void;
  isDisabled: boolean;
}

interface FirstPageLinkProps {
  onClick: () => void;
  isDisabled: boolean;
}

interface PreviousPageLinkProps {
  onClick: () => void;
  isDisabled: boolean;
}

interface NextPageLinkProps {
  onClick: () => void;
  isDisabled: boolean;
}

interface LastPageLinkProps {
  onClick: () => void;
  isDisabled: boolean;
}
