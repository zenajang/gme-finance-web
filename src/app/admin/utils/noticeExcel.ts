import * as XLSX from 'xlsx';

interface ParseNoticeExcelOptions {
  getDefaultColumnLabel: (index: number) => string;
  stripHeader?: (header: string) => boolean;
}

interface ParseNoticeExcelResult {
  columns: string[];
  rows: string[][];
  warning?: 'empty' | 'noRows';
}

const defaultStripHeader = (header: string) => {
  const normalized = header.trim().toLowerCase();
  return normalized === 'no' || normalized === 'no.' || normalized === '번호';
};

export function parseNoticeExcel(buffer: ArrayBuffer, options: ParseNoticeExcelOptions): ParseNoticeExcelResult {
  const workbook = XLSX.read(buffer, { type: 'array', cellNF: true, cellText: true, cellDates: true });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) {
    return { columns: [], rows: [], warning: 'empty' };
  }
  const sheet = workbook.Sheets[sheetName];
  const sheetRef = sheet['!ref'];
  if (!sheetRef) {
    return { columns: [], rows: [], warning: 'empty' };
  }

  const range = XLSX.utils.decode_range(sheetRef);
  const rows: string[][] = [];
  for (let r = range.s.r; r <= range.e.r; r += 1) {
    const row: string[] = [];
    for (let c = range.s.c; c <= range.e.c; c += 1) {
      const addr = XLSX.utils.encode_cell({ r, c });
      const cell = sheet[addr];
      if (!cell) {
        row.push('');
        continue;
      }
      if (cell.t === 'd' && cell.v instanceof Date) {
        const year = cell.v.getFullYear();
        const month = String(cell.v.getMonth() + 1).padStart(2, '0');
        const day = String(cell.v.getDate()).padStart(2, '0');
        row.push(`${year}-${month}-${day}`);
        continue;
      }
      if (cell.t === 'n' && typeof cell.v === 'number' && cell.z) {
        try {
          row.push(String(XLSX.SSF.format('yyyy-mm-dd', cell.v)).trim());
          continue;
        } catch {
          // fall through
        }
      }
      if (typeof cell.w === 'string') {
        row.push(cell.w.trim());
        continue;
      }
      if (typeof cell.v === 'string') {
        row.push(cell.v.trim());
        continue;
      }
      row.push(String(cell.v ?? '').trim());
    }
    const hasValue = row.some((value) => value.length > 0);
    if (hasValue) {
      rows.push(row);
    }
  }

  if (!rows.length) {
    return { columns: [], rows: [], warning: 'empty' };
  }

  const header = rows[0].map((cell) => String(cell ?? '').trim());
  const dataRows = rows.slice(1);
  const stripHeader = options.stripHeader ?? defaultStripHeader;

  const activeIndexes = header
    .map((_, idx) => idx)
    .filter((idx) => {
      if (stripHeader(header[idx])) return false;
      if (header[idx]) return true;
      return dataRows.some((row) => String(row?.[idx] ?? '').trim().length > 0);
    });

  if (!activeIndexes.length) {
    return { columns: [], rows: [], warning: 'empty' };
  }

  const columns = activeIndexes.map((idx, colIndex) => {
    const label = header[idx];
    return label || options.getDefaultColumnLabel(colIndex + 1);
  });

  const normalizedRows = dataRows
    .map((row) => activeIndexes.map((idx) => String(row?.[idx] ?? '').trim()))
    .filter((row) => row.some((cell) => cell.length > 0));

  if (!normalizedRows.length) {
    return { columns, rows: [Array(columns.length).fill('')], warning: 'noRows' };
  }

  return { columns, rows: normalizedRows };
}
