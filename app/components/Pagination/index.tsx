import React, { useEffect } from 'react';
import {
  createUltimatePagination,
  ITEM_TYPES,
} from 'react-ultimate-pagination';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
//import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import NavigationFirstPage from '@material-ui/icons/FirstPage';
import NavigationLastPage from '@material-ui/icons/LastPage';
import NavigationChevronLeft from '@material-ui/icons/ChevronLeft';
import NavigationChevronRight from '@material-ui/icons/ChevronRight';

const flatButtonStyle = {
  minWidth: 36,
};

const styles = {
  pagingRoot: {
    paddingBottom: '10px',
  },
  pagingC: {
    width: '40%',
    display: 'inline-block',
    paddingLeft: '25px',
  },
  padingR: {
    width: '60%',
    display: 'inline-block',
    '& button': {
      fontWeight: '400',
    },
  },
  paging: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  pagingText: {
    fontSize: '12px',
  },
  pageSelect: {
    lineHeight: '0.8em',
    '& div div': {
      padding: '6px 10px 0',
      paddingRight: '20px',
      minHeight: '1.3em',
      fontSize: '12px',
      color: '#333333',
    },
    '& svg': {
      top: 'calc(50% - 12px)',
    },
  },
  pageMenuItem: {
    fontSize: '12px',
    height: '18px',
  },
  pageJumpTo: {
    paddingLeft: '10px',
    fontSize: '12px',
    '& input': {
      width: '30px',
      padding: '3px',
      fontSize: '12px',
    },
  },
  pagingCur: {
    fontSize: '12px',
  },
};

const Page = ({ value, isActive, onClick, isDisabled }: PageProps) => (
  <Button
    style={flatButtonStyle}
    color={isActive ? 'primary' : 'default'}
    onClick={onClick}
    disabled={isDisabled}
  >
    {value.toString()}
  </Button>
);

const Ellipsis = ({ onClick, isDisabled }: EllipsisProps) => (
  <Button style={flatButtonStyle} onClick={onClick} disabled={isDisabled}>
    ...
  </Button>
);

const FirstPageLink = ({ onClick, isDisabled }: FirstPageLinkProps) => (
  <IconButton style={flatButtonStyle} onClick={onClick} disabled={isDisabled}>
    <NavigationFirstPage />
  </IconButton>
);

const PreviousPageLink = ({ onClick, isDisabled }: PreviousPageLinkProps) => (
  <IconButton style={flatButtonStyle} onClick={onClick} disabled={isDisabled}>
    <NavigationChevronLeft />
  </IconButton>
);

const NextPageLink = ({ onClick, isDisabled }: NextPageLinkProps) => (
  <IconButton style={flatButtonStyle} onClick={onClick} disabled={isDisabled}>
    <NavigationChevronRight />
  </IconButton>
);

const LastPageLink = ({ onClick, isDisabled }: LastPageLinkProps) => (
  <IconButton style={flatButtonStyle} onClick={onClick} disabled={isDisabled}>
    <NavigationLastPage />
  </IconButton>
);

const itemTypeToComponent = {
  [ITEM_TYPES.PAGE]: Page,
  [ITEM_TYPES.ELLIPSIS]: Ellipsis,
  [ITEM_TYPES.FIRST_PAGE_LINK]: FirstPageLink,
  [ITEM_TYPES.PREVIOUS_PAGE_LINK]: PreviousPageLink,
  [ITEM_TYPES.NEXT_PAGE_LINK]: NextPageLink,
  [ITEM_TYPES.LAST_PAGE_LINK]: LastPageLink,
};

const UltmPagination = createUltimatePagination({ itemTypeToComponent });

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

const Pagination = ({
  pageIndex = 0,
  pageSize = 10,
  count = 0,
  type = 0,
  classes,
  onChange,
  ...rest
}: PaginationProps) => {
  useEffect(() => {}, []);

  const hide = true;
  const pageTotal: number =
    parseInt(((count + pageSize - 1) / pageSize).toString()) || 0;

  const onPrev = () => {
    const p =
      pageIndex <= pageTotal - 1 ? (pageIndex > 0 ? pageIndex - 1 : 0) : 0;
    onChange && onChange(p, pageSize);
  };

  const onNext = () => {
    // let p =
    //   pageIndex < pageTotal
    //     ? pageIndex + 1
    //     : pageTotal !== 0
    //       ? pageTotal - 1
    //       : 0;
    let p = 0;
    if (pageIndex < pageTotal) {
      p = pageIndex + 1;
    } else {
      p = pageTotal !== 0 ? pageTotal - 1 : 0;
    }
    onChange && onChange(p, pageSize);
  };

  const onGoFirst = () => {
    onChange && onChange(0, pageSize);
  };

  const onGoLast = () => {
    onChange && onChange(pageTotal !== 0 ? pageTotal - 1 : 0, pageSize);
  };

  // const onChangePageSize = event => {
  //   onChange && onChange(0, event.target.value);
  // };

  // const onChangeJumpTo = event => {
  //   if (event.keyCode === 13) {
  //     const { value } = event.target;
  //     const v = value ? parseInt(event.target.value, 10) : pageIndex;
  //     let p = 0;
  //     if (v < pageTotal && v > 0) {
  //       p = v - 1;
  //     } else if (pageTotal <= v) {
  //       p = pageTotal - 1;
  //     }
  //     onChange && onChange(p, pageSize);
  //   }
  // };

  // const checkChangePage = event => {
  //   const { value } = event.target;
  //   const id: any = document.querySelector('#jumpTo');
  //   if (value < 1) {
  //     id.value = 1;
  //   } else if (value > pageTotal) {
  //     id.value = pageTotal;
  //   }
  // };

  //const pages = type === 0 ? [10, 20, 50, 100] : [30, 60, 90];
  return (
    <div className={classes.pagingRoot}>
      <div className={classes.pagingC}>
        <span className={classes.pagingText}>
          <FormattedMessage
            id="common.pagination"
            values={{ pageSize, pageTotal, count }}
          />
        </span>
      </div>
      <div className={classes.padingR}>
        <div className={classes.paging}>
          <FirstPageLink isDisabled={pageIndex <= 0} onClick={onGoFirst} />
          <PreviousPageLink isDisabled={pageIndex <= 0} onClick={onPrev} />
          <Hidden xsDown>
            <UltmPagination
              currentPage={pageIndex + 1}
              totalPages={pageTotal}
              onChange={page => onChange && onChange(page - 1, pageSize)}
              hidePreviousAndNextPageLinks={hide}
              hideFirstAndLastPageLinks={hide}
              {...rest}
            />
          </Hidden>
          <NextPageLink
            isDisabled={pageIndex + 1 >= pageTotal}
            onClick={onNext}
          />
          <LastPageLink
            isDisabled={pageIndex + 1 >= pageTotal}
            onClick={onGoLast}
          />
          {/* <Select
            displayEmpty
            value={pageSize}
            onChange={onChangePageSize}
            input={<Input id="select-placeholder" />}
            MenuProps={MenuProps}
            className={classes.pageSelect}
          >
            <MenuItem disabled value="" className={classes.pageMenuItem}>
              选择条数
            </MenuItem>
            {pages.map(page => (
              <MenuItem
                value={page}
                key={`pagination-pagesize-${page}`}
                className={classes.pageMenuItem}
              >
                {`${page}条 / 页`}
              </MenuItem>
            ))}
          </Select> */}
          {/* <span className={classes.pageJumpTo}>
            跳至：
            <Input
              id="jumpTo"
              type="number"
              min="1"
              max={`${pageTotal}`}
              onKeyDown={onChangeJumpTo}
              // value={`${pageIndex + 1}`}
              onChange={checkChangePage}
              // onClick={(event, pageTotal) =>
              //   onClickChangeJumpTo(event, pageTotal)
              // }
            />{' '}
            页
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Pagination);
