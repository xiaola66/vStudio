/*
 * @Author: Ren jieyun
 * @Date:   2020-02-20 14:35:01
 * @Last Modified by:   Ren jieyun
 * @Last Modified time: 2020-02-20 17:14:31
 */
// . pageIndex
// . pageSize
// . keyWords
// . orderBy   default: asc
// . orderKey
// . total

const Pagination: {
  pageIndex: number;
  pageSize: number;
  keyWords: string;
  total: number;
} = {
  pageIndex: 0,
  pageSize: 10,
  keyWords: '',
  // orderBy: 'asc',
  // orderKey: '',
  total: 0,
};

export default Pagination;
