import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import dayjs from "dayjs";

const ExportExcel = async (defaultColumns, dataSource) => {
  try {
    let fileName = document.title;
    let currentTime = dayjs().format("DD-MM-YYYY");
    const data2 = dataSource;
    let temp = defaultColumns.map(({ name, key, ...data }) => {
      return { header: name, key: key };
    });
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet(currentTime);
    sheet.columns = temp;
    data2.forEach((row) => {
      sheet.addRow(row);
    });
    sheet.getRow(1).eachCell((cell, colNumber) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFF00" },
      };
      cell.font = {
        size: 12,
        bold: true,
      };
    });

    sheet.columns.forEach((column) => {
      let maxCellLength = 0;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const cellTextLength = cell.value ? cell.value.toString().length : 0;
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        maxCellLength = Math.max(maxCellLength, cellTextLength);
      });
      column.width = Math.max(10, maxCellLength + 2);
    });

    const blob = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([blob]), `${fileName}.xlsx`);
    return true;
  } catch (error) {
    return false;
  }
};

const ImportExcel = async (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("Vui lòng chọn một file để nhập.");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = e.target.result;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(data);
        const worksheet = workbook.worksheets[0];
        const rows = [];
        worksheet.eachRow((row, rowNumber) => {
          const rowData = {};
          row.eachCell((cell, colNumber) => {
            rowData[`column${colNumber}`] = cell.value;
          });
          rows.push(rowData);
        });
        resolve(rows);
      } catch (error) {
        reject("Có lỗi xảy ra khi đọc file.");
      }
    };
    reader.onerror = (error) => {
      reject("Có lỗi xảy ra khi đọc file.");
    };
    reader.readAsArrayBuffer(file);
  });
};

export { ImportExcel, ExportExcel };
