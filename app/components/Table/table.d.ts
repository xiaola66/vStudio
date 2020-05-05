/*
 * @Author: Ren jieyun
 * @Date:   2020-02-19 13:58:00
 * @Last Modified by: changChun Zhang
 * @Last Modified time: 2020-04-07 18:20:57
 */

type columnAlign = 'left' | 'center' | 'right';

interface columnDataProps {
  id: string;
  label?: string;
  type?: string;
  operations?: any;
  render?: any;
  align?: string;
  xs?: number; // xs for waterfall
  width?: string; // persent || number px for table
  link?: string;
  linkParam?: string; // link param
}

interface BasicTabelProps {
  data: Array<object>;
  columnData: Array<columnDataProps>;
  foldData?: Array<object>;
  foldColumnData?: Array<columnDataProps>;
  foldColumnData2?: Array<columnDataProps>;
  classes: any;
  emptyText: string;
  page?: any;
  type?: number; // 1: has title 2: small table 3: waterfall
  title?: any;
  caption?: string;
  setting?: any;
  scrollHeight?: number;
  foldScrollHeight?: number;
  key?: string;
  tooltip?: any;
  onChange?: (change: any) => void;
  getScrollData?: () => void;
  apiURL?: string;
  intl: { formatMessage };
  handleSearchChange?: (value: any) => void;
}
