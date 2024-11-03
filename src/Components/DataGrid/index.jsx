/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

import { Pagination, Typography, Flex, Space, Divider } from "antd";
import DataGrid, {
  SelectColumn,
  textEditor,
  TreeDataGrid,
} from "react-data-grid";
import { ExportExcel } from "./excelFunction.js";

import { renderCellEditDatePicker } from "./renderCellEditDatePicker";
import { renderCellEditTimePicker } from "./TimePicker.jsx";
import { renderCellEditPassword } from "./MPassword.jsx";
import { renderCellEditSelect } from "./MSelect.jsx";

export const selectionTypes = {
  multi: "multi",
  single: "single",
  none: "none",
};
export const columnTypes = {
  DatePicker: "DatePicker",
  TimePicker: "TimePicker",
  TextEditor: "TextEditor",
  Checkbox: "Checkbox",
  Password: "Password",
  Select: "Select",
};
export const paginationTypes = {
  none: "none",
  scroll: "scroll",
  pagination: "pagination",
};

const { Title } = Typography;

const getEditCell = (key, cellType, options = [], baseColumn) => {
  switch (cellType) {
    case columnTypes.DatePicker:
      return ({ row, onRowChange }) =>
        renderCellEditDatePicker({
          key,
          row,
          onRowChange,
        });
    case columnTypes.TimePicker:
      return ({ row, onRowChange }) =>
        renderCellEditTimePicker({
          key,
          row,
          onRowChange,
        });
    case columnTypes.Password:
      return ({ row, onRowChange }) =>
        renderCellEditPassword({
          key,
          row,
          onRowChange,
        });
    case columnTypes.Select:
      return ({ row, onRowChange }) =>
        renderCellEditSelect({
          row,
          key,
          options,
          onRowChange,
        });
    default:
      return ({ row, onRowChange, column, onClose }) => {
        if (!row.isNew) row.isEdit = true;
        return textEditor({ row, onRowChange, column, onClose });
      };
  }
};

const handleRenderColumn = ({
  type = columnTypes.TextEditor,
  editable = false,
  visible = false,
  render,
  key,
  selection,
  index,
  baseColumn,
  ...props
}) => {
  const column = {
    ...props,
    key,
    renderEditCell: editable
      ? getEditCell(key, type, props?.options ?? [], baseColumn)
      : null,
  };

  // Hide column when visible = true
  if (visible) return null;

  // custom renderCell
  if (typeof render === "function") column["renderCell"] = render;

  // Hide header of column SelectColumn
  if (selection === selectionTypes.single && index === 0)
    column["renderHeaderCell"] = null;

  // Hide all SelectColumn
  if (selection === selectionTypes.none && index === 0) {
    return null;
  }

  return column;
};

const getComparator = (sortColumn) => {
  switch (sortColumn) {
    ////// so sánh các dữ liệu kiểu số
    case "month_cons":
    case "ID":
    case "IDRef":
    case "STT":
      return (a, b) => {
        return a[sortColumn] - b[sortColumn];
      };
    ////// so sánh các dữ liệu kiểu chuỗi
    default:
      return (a, b) => {
        if (
          (a[sortColumn] === null && b[sortColumn] === null) ||
          (a[sortColumn] === undefined && b[sortColumn] === undefined)
        )
          return 0;
        else if (a[sortColumn] === null || a[sortColumn] === undefined)
          return 1;
        else if (b[sortColumn] === null || b[sortColumn] === undefined)
          return -1;
        else return a[sortColumn].localeCompare(b[sortColumn]);
      };
  }
};

const Grid = forwardRef(
  (
    {
      direction = "ltr",
      style,
      columns = [],
      className,
      columnKeySelected = "id",
      selection = selectionTypes.multi,
      rows = new Set(),
      groupBy = [],
      setRows,
      onFocus = () => {},
      limit = 20,
      maxHeight = 720,
      pagination = paginationTypes.scroll,
      onCellClick = false,
      onCellDoubleClick,
      bottomSummaryRows = [],
      handleGetSelected = () => {},
    },
    ref
  ) => {
    const [sortColumns, setSortColumns] = useState([]);
    const [selectedRows, setSelectedRows] = useState(() => new Set());
    const [currentRows, setCurrenRows] = useState([]);
    const [currentPage, setCurrenPage] = useState(1);
    const [expandedGroupIds, setExpandedGroupIds] = useState(() => new Set([]));
    const reactDataGridRef = useRef();
    let Component;
    const rowGrouper = (rows, columnKey) => {
      const groupedRows = {};
      rows.forEach((row) => {
        const key = row[columnKey];
        if (!groupedRows[key]) {
          groupedRows[key] = [];
        }
        groupedRows[key].push(row);
      });
      return groupedRows;
    };

    const handleSelected = (idRowSelected) => {
      if (selection === selectionTypes.multi) {
        setSelectedRows(idRowSelected);
      }
      if (selection === selectionTypes.single) {
        let value = idRowSelected;
        if (typeof value === "object") {
          const rowSelectedArr = [...value];
          value = rowSelectedArr[rowSelectedArr.length - 1];
        }
        handleGetSelected(value);
        setSelectedRows(() => new Set([value]));
      }
    };

    useEffect(() => {
      setCurrenRows([]);
      setCurrenPage(1);
    }, [rows]);

    useEffect(() => {
      const start_index = (currentPage - 1) * limit;
      const dataRowCurrent = rows.slice(start_index, start_index + limit);
      switch (pagination) {
        case "none":
          setCurrenRows(rows);
          break;
        case "scroll":
          let dataRowCurrentScroll;
          if (start_index === 0) {
            dataRowCurrentScroll = rows.slice(
              rateScreen * start_index,
              rateScreen * (start_index + limit)
            );
          } else {
            dataRowCurrentScroll = rows.slice(
              limit * (rateScreen - 1) + start_index,
              limit * rateScreen + start_index
            );
          }
          if (
            currentRows.length === selectedRows.size &&
            currentRows.length !== 0 &&
            selectedRows.size !== 0
          ) {
            const idArrRowCurrent = dataRowCurrentScroll.map(
              (item) => item[columnKeySelected]
            );
            setSelectedRows(
              (prevSelectedRows) =>
                new Set([...prevSelectedRows, ...idArrRowCurrent])
            );
          }
          setCurrenRows((prevCurrenRows) => {
            return [...prevCurrenRows, ...dataRowCurrentScroll];
          });
          break;
        case "pagination":
          setCurrenRows(dataRowCurrent);
          break;
        default:
          break;
      }
    }, [currentPage, limit, pagination, rows]);

    useEffect(() => {
      rows.map((row, index) => (row["STT"] = index + 1));
      if (pagination === "scroll") {
        reactDataGridRef.current?.element.addEventListener(
          "scroll",
          handleScroll
        );
      }
      return () => {
        reactDataGridRef.current?.element.removeEventListener(
          "scroll",
          handleScroll
        );
      };
    }, [rows]);

    useEffect(() => {
      Component = groupBy.length === 0 ? DataGrid : TreeDataGrid;
    }, [groupBy]);

    const rateScreen = useMemo(() => {
      return Math.ceil(maxHeight / (limit * 40));
    }, []);

    const summaryRows = useMemo(() => {
      return [
        {
          id: "total_0",
          totalCount: rows.length,
        },
      ];
    }, [rows]);

    const columnsCombined = useMemo(() => {
      return [SelectColumn, ...columns]
        .map((column, index) =>
          handleRenderColumn({ ...column, selection, index })
        )
        .filter((column) => column);
    }, [columns, selection]);

    const handleFill = useCallback(({ columnKey, sourceRow, targetRow }) => {
      return { ...targetRow, [columnKey]: sourceRow[columnKey] };
    }, []);

    const handlePaste = useCallback(
      ({ sourceColumnKey, sourceRow, targetColumnKey, targetRow }) => {
        return { ...targetRow, [targetColumnKey]: sourceRow[sourceColumnKey] };
      },
      []
    );

    const handleCopy = useCallback(({ sourceRow, sourceColumnKey }) => {
      if (window.isSecureContext) {
        navigator.clipboard.writeText(sourceRow[sourceColumnKey]);
      }
    }, []);

    const handleExportExcel = useCallback(
      () => ExportExcel(columns, rows),
      [rows]
    );

    const handleResetSelected = useCallback(
      () => setSelectedRows(() => new Set()),
      [rows]
    );

    const handleValidate = (keyId = columnKeySelected) => {
      const listRowsChange = rows.filter((row) => row?.isEdit || row?.isNew);
      const requiredFields = columns.filter((field) => field.required);
      const listValidate = listRowsChange.map((item) => {
        const errors = [];
        requiredFields.forEach((field) => {
          if (
            (field.required && !item.hasOwnProperty(field.key)) ||
            item[field.key] === ""
          ) {
            errors.push(field.key);
          }
        });
        return { [keyId]: item[keyId], isError: errors.length > 0, errors };
      });

      setRows(
        rows.map((row) => {
          const indexValidate = listValidate.findIndex(
            (itemValidate) => itemValidate[keyId] === row[keyId]
          );
          if (indexValidate !== -1) {
            return {
              ...row,
              isError: listValidate[indexValidate].isError,
              errors: listValidate[indexValidate].errors,
            };
          } else
            return {
              ...row,
            };
        })
      );

      return {
        isCheck: !listValidate.some((item) => item.isError),
        validate: listValidate,
      };
    };

    useImperativeHandle(
      ref,
      () => {
        return {
          getSelectedRows: () => {
            return selectedRows;
          },
          setSelectedRows: () => {
            setSelectedRows(new Set());
          },
          exportExcel: () => handleExportExcel(),
          ResetSelected: () => handleResetSelected(),
          Validate: () => handleValidate(),
        };
      },
      [selectedRows]
    );
    const handleScroll = () => {
      const dataGridScrollTop = reactDataGridRef.current.element.scrollTop;
      const dataGridScrollHeight =
        reactDataGridRef.current.element.scrollHeight;
      const dataGridClientHeight =
        reactDataGridRef.current.element.clientHeight;
      if (
        dataGridScrollTop + 20 >=
        dataGridScrollHeight - dataGridClientHeight
      ) {
        setCurrenPage((prevPage) => {
          return prevPage + 1;
        });
      }
    };

    const sortedRows = useMemo(() => {
      if (sortColumns.length === 0) return currentRows;

      return [...currentRows].sort((a, b) => {
        for (const sort of sortColumns) {
          const comparator = getComparator(sort.columnKey);
          const compResult = comparator(a, b);
          if (compResult !== 0) {
            return sort.direction === "ASC" ? compResult : -compResult;
          }
        }
        return 0;
      });
    }, [currentRows, sortColumns]);

    return (
      <>
        <TreeDataGrid
          renderers={{
            noRowsFallback: (
              <Title
                level={5}
                style={{ color: "#818181", gridColumn: "1/-1", margin: "10px" }}
              >
                --- Không có dữ liệu ---
              </Title>
            ),
          }}
          ref={reactDataGridRef}
          className={`rdg-light ${className} ${
            pagination === "scroll" ? "fill-grid" : ""
          }`}
          style={{
            height: "calc(100% - 50px)",
            maxHeight: maxHeight,
            ...style,
          }}
          defaultColumnOptions={{ sortable: true, resizable: true }}
          sortColumns={sortColumns}
          onSortColumnsChange={setSortColumns}
          rows={sortedRows}
          columns={columnsCombined}
          selectedRows={selectedRows}
          rowHeight={42}
          direction={direction}
          rowKeyGetter={(row) => row[columnKeySelected]}
          onRowsChange={setRows}
          groupBy={groupBy}
          rowGrouper={rowGrouper}
          bottomSummaryRows={bottomSummaryRows}
          expandedGroupIds={expandedGroupIds}
          onExpandedGroupIdsChange={setExpandedGroupIds}
          onSelectedCellChange={
            typeof onFocus === "function" ? onFocus : () => {}
          }
          enableVirtualization
          //onFill={handleFill}
          onCopy={handleCopy}
          onPaste={handlePaste}
          onSelectedRowsChange={(row) => {
            handleSelected(row);
          }}
          onCellClick={(args) => {
            if (onCellClick && args.column.key !== "select-row") {
              handleSelected(args.row[columnKeySelected]);
            }
          }}
          onCellDoubleClick={(args) => {
            if (
              typeof onCellDoubleClick === "function" &&
              args.column.key !== "select-row"
            )
              onCellDoubleClick();
          }}
        />
        <Flex
          style={{ boxSizing: "border-box", height: "40px" }}
          align="center"
          justify="space-between"
        >
          <Space style={{ padding: "10px 20px" }}>
            <Typography
              level={5}
              style={{
                textAlign: "center",
                fontWeight: "600",
                color: "#555555",
              }}
            >
              Số dòng: {summaryRows[0].totalCount.toLocaleString("vi-VN")}
            </Typography>
          </Space>
          {pagination === "pagination" && rows && rows.length > 0 ? (
            <Pagination
              style={{
                marginTop: 10,
                marginRight: 10,
                display: "flex",
                justifyContent: "flex-end",
              }}
              pageSize={limit}
              showSizeChanger={false}
              onChange={(pageChange) => setCurrenPage(pageChange)}
              defaultCurrent={currentPage}
              total={rows.length}
            />
          ) : (
            ""
          )}
        </Flex>
      </>
    );
  }
);

export default Grid;
