import React from 'react';
import XLSX from 'xlsx';
import './styles.less';

const ImportProgramData = [
  {
    ProgramName: '',
    RateName: '',
    Description: '',
    EnrollmentType: ' ',
    StartDate: ' ',
    EndDate: ' ',
    DefaultClasses: ' ',
    SignUpCost: ' ',
    CancellationCost: ' ',
    RankName: ' ',
    RequiredClasses: ' ',
    RequiredWeeks: ' ',
    SkillName: ' ',
    SkillColor: ' ',
  },
];

class ImportProgramSampleCSV extends React.Component {
  download = (url, name) => {
    let a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();

    window.URL.revokeObjectURL(url);
  };

  s2ab = s => {
    const buf = new ArrayBuffer(s.length);

    const view = new Uint8Array(buf);

    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;

    return buf;
  };

  exportToExcel = ImportProgramData => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(ImportProgramData);
    const csv = XLSX.utils.sheet_to_csv(ws);

    wb.SheetNames.push('sheet1');
    wb.Sheets['sheet1'] = ws;

    const wbout = XLSX.write(wb, {
      bookType: 'xlsx',
      bookSST: true,
      type: 'binary',
    });

    let url = window.URL.createObjectURL(
      new Blob([this.s2ab(csv)], { type: 'application/octet-stream' })
    );

    this.download(url, 'SmapleImportStudentForm.csv');
  };
  render() {
    return (
      <div className="ImportProgramSampleCSV">
        <a
          className="DownloadSample"
          onClick={() => this.exportToExcel(ImportProgramData)}
        >
          Download Sample CSV
        </a>
      </div>
    );
  }
}

export default ImportProgramSampleCSV;
