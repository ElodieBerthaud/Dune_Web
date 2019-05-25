import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import {
  AutoSizer, Column, SortDirection, Table
} from 'react-virtualized';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

const styles = (theme) => ({
  table: {
    fontFamily: theme.typography.fontFamily
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box'
  },
  tableRow: {
    cursor: 'pointer',
    backgroundColor: '#b2ebf2'
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    }
  },
  tableCell: {
    flex: 1,
  },
  head: {
    backgroundColor: '#5c6bc0',
  },
});

class AverageTab extends React.PureComponent {
    getRowClassName = ({ index }) => {
      const { classes, rowClassName, onRowClick } = this.props;

      return classNames(classes.tableRow, classes.flexContainer, rowClassName, {
        [classes.tableRowHover]: index !== -1 && onRowClick != null,
      });
    };

    cellRenderer = ({ cellData, columnIndex = null }) => {
      let red = null;
      let bold = null;
      if (columnIndex === 1 || columnIndex === 2) {
        bold = true;
        if (cellData < 30) red = '#b71c1c';
        else if (cellData < 40 && cellData > 30) red = '#e53935';
        else if (cellData < 50 && cellData > 40) red = '#ef5350';
        else if (cellData > 50 && cellData < 60) red = '#ff6d00';
        else if (cellData > 60 && cellData < 70) red = '#ffee58';
        else if (cellData > 70 && cellData < 80) red = '#9ccc65';
        else if (cellData > 80) red = '#8bc34a';
      }

      const {
        columns, classes, rowHeight, onRowClick
      } = this.props;
      return (
        <TableCell
          component="div"
          className={classNames(classes.tableCell, classes.flexContainer, {
            [classes.noClick]: onRowClick == null,
          })}
          variant="body"
          style={{
            height: rowHeight, borderBottom: `2px solid ${red}`, color: red, fontWeight: bold === true ? 'bold' : ''
          }}
          align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
        >
          {cellData}
        </TableCell>
      );
    };

    headerRenderer = ({
      label, columnIndex, dataKey, sortBy, sortDirection
    }) => {
      const {
        headerHeight, columns, classes, sort
      } = this.props;
      const direction = {
        [SortDirection.ASC]: 'asc',
        [SortDirection.DESC]: 'desc',
      };

      const inner = !columns[columnIndex].disableSort && sort != null ? (
        <TableSortLabel active={dataKey === sortBy} direction={direction[sortDirection]}>
          {label}
        </TableSortLabel>
      ) : (
        label
      );

      return (
        <TableCell
          component="div"
          className={classNames(classes.tableCell, classes.flexContainer, classes.noClick)}
          variant="head"
          style={{ height: headerHeight, backgroundColor: '#4dd0e1' }}
          align={columns[columnIndex].numeric || false ? 'right' : 'left'}
        >
          {inner}
        </TableCell>
      );
    };

    render() {
      const { classes, columns, ...tableProps } = this.props;
      return (
        <AutoSizer>
          {({ height, width }) => (
            <Table
              className={classes.table}
              height={height}
              width={width}
              {...tableProps}
              rowClassName={this.getRowClassName}
            >
              {columns.map(({
                cellContentRenderer = null, className, dataKey, ...other
              }, index) => {
                let renderer;
                if (cellContentRenderer != null) {
                  renderer = (cellRendererProps) => this.cellRenderer({
                    cellData: cellContentRenderer(cellRendererProps),
                    columnIndex: index
                  });
                } else {
                  renderer = this.cellRenderer;
                }

                return (
                  <Column
                    key={dataKey}
                    headerRenderer={(headerProps) => this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                    }
                    className={classNames(classes.flexContainer, className)}
                    cellRenderer={renderer}
                    dataKey={dataKey}
                    {...other}
                  />
                );
              })}
            </Table>
          )}
        </AutoSizer>
      );
    }
}

AverageTab.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      cellContentRenderer: PropTypes.func,
      dataKey: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowClassName: PropTypes.string,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  sort: PropTypes.func,
};

AverageTab.defaultProps = {
  headerHeight: 56,
  rowHeight: 56,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AverageTab)));
