import React from 'react';
import XLSX from 'xlsx';
import './styles.less';

const AddStudentData = [
  {
    '*First Name': '',
    '*Last Name': '',
    Email: '',
    Program: ' ',
    Rank: ' ',
    Rate: ' ',
    Phone: ' ',
    '*Address Line1': '',
    AddressLine2: '',
    '*City': '',
    '*State': '',
    '*Zip': '',
    '*Country': '',
    Gender: '',
    'Date Of Birth(mm-dd-yyyy)': '',
    PreferredName: '',
    Age: '',
    'Contact1 First Name': '',
    'Contact1 Last Name': '',
    'Contact1 Relationship(Father, Mother, etc)': '',
    'Contact1 Phone': ' ',
    'Contact1 Email': ' ',
    'Contact2 First Name': '',
    'Contact2 Last Name': '',
    'Contact2 Relationship(Father, Mother, etc)': '',
    'Contact2 Phone': ' ',
    'Contact2 Email': ' ',
    'Rate(Rate Name)': ' ',
    'Payment Type(EFT/CASH/CARD)': ' ',
    'Account Type': ' ',
    'Account Number': ' ',
    'Account Holder': ' ',
    'Routing Number': ' ',
    'Card Holder': ' ',
    'Card Number': ' ',
    'Authorization Code': ' ',
    'Expiration Code': ' ',
    'Account Owner Name': ' ',
    'Account Owner Phone': ' ',
    'Account Owner Email': ' ',
    'Account Owner Address Line1': ' ',
    'Account Owner Address Line2': ' ',
  },
];

class ImportStudentSampleCSV extends React.Component {
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

  exportToExcel = AddStudentData => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(AddStudentData);
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
      <div className="ImportStudentSampleCSV">
        <a
          className="DownloadSample"
          onClick={() => this.exportToExcel(AddStudentData)}
        >
          Download Sample CSV
        </a>
      </div>
    );
  }
}

export default ImportStudentSampleCSV;
