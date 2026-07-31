import * as XLSX from 'xlsx';

export interface ParsedStaffRow {
  name: string;
  department: string;
  employee_number: string;
  corporate_number: string;
}

export interface ParseStaffExcelResult {
  rows: ParsedStaffRow[];
  warning?: 'empty' | 'noRows';
}

// 헤더명 → 필드 매핑 (동의어 허용)
const HEADER_ALIASES: Record<keyof ParsedStaffRow, string[]> = {
  name: ['담당자', '이름', '성명'],
  department: ['부서', '소속', '소속(업무)'],
  employee_number: ['사원번호', '사번'],
  corporate_number: ['법인번호', '등록번호', '법인등록번호'],
};

function readSheetRows(buffer: ArrayBuffer): string[][] {
  const workbook = XLSX.read(buffer, { type: 'array', cellText: true });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) return [];
  const sheet = workbook.Sheets[sheetName];
  const sheetRef = sheet['!ref'];
  if (!sheetRef) return [];

  const range = XLSX.utils.decode_range(sheetRef);
  const rows: string[][] = [];
  for (let r = range.s.r; r <= range.e.r; r += 1) {
    const row: string[] = [];
    for (let c = range.s.c; c <= range.e.c; c += 1) {
      const cell = sheet[XLSX.utils.encode_cell({ r, c })];
      if (!cell) {
        row.push('');
        continue;
      }
      if (typeof cell.w === 'string') row.push(cell.w.trim());
      else if (typeof cell.v === 'string') row.push(cell.v.trim());
      else row.push(String(cell.v ?? '').trim());
    }
    if (row.some((v) => v.length > 0)) rows.push(row);
  }
  return rows;
}

// 헤더 행에서 각 필드의 컬럼 인덱스를 찾음. 못 찾으면 위치 기반(0~3)으로 폴백.
function resolveColumnIndexes(header: string[]): Record<keyof ParsedStaffRow, number> {
  const fields = Object.keys(HEADER_ALIASES) as (keyof ParsedStaffRow)[];
  const indexes = {} as Record<keyof ParsedStaffRow, number>;
  let matched = 0;
  fields.forEach((field, fallbackIdx) => {
    const found = header.findIndex((h) => HEADER_ALIASES[field].includes(h.trim()));
    if (found >= 0) {
      indexes[field] = found;
      matched += 1;
    } else {
      indexes[field] = fallbackIdx; // 담당자=0, 부서=1, 사원번호=2, 법인번호=3
    }
  });
  return matched > 0 ? indexes : { name: 0, department: 1, employee_number: 2, corporate_number: 3 };
}

export function parseStaffExcel(buffer: ArrayBuffer): ParseStaffExcelResult {
  const rows = readSheetRows(buffer);
  if (!rows.length) return { rows: [], warning: 'empty' };

  const header = rows[0].map((c) => String(c ?? '').trim());
  const hasHeader = (Object.values(HEADER_ALIASES) as string[][]).some((aliases) =>
    header.some((h) => aliases.includes(h))
  );
  const dataRows = hasHeader ? rows.slice(1) : rows;
  const idx = resolveColumnIndexes(header);

  const parsed = dataRows
    .map((row) => ({
      name: String(row[idx.name] ?? '').trim(),
      department: String(row[idx.department] ?? '').trim(),
      employee_number: String(row[idx.employee_number] ?? '').trim(),
      corporate_number: String(row[idx.corporate_number] ?? '').trim(),
    }))
    .filter((r) => r.name.length > 0); // 담당자(이름) 없는 행은 제외

  if (!parsed.length) return { rows: [], warning: 'noRows' };
  return { rows: parsed };
}
