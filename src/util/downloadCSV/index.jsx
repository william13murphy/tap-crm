import XLSX from 'xlsx';

const download = (url, name) => {
  let a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();

  window.URL.revokeObjectURL(url);
};

const s2ab = s => {
  const buf = new ArrayBuffer(s.length);

  const view = new Uint8Array(buf);

  for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;

  return buf;
};

export const downloadCSV = data => {
  let gender =
    data.GenderId === '8a29a4ab-62a7-4a06-b2fa-46a40f449a84'
      ? 'Male'
      : 'Female';

  let updatedData = data.map(element => {
    let gender =
      element.GenderId === '8a29a4ab-62a7-4a06-b2fa-46a40f449a84'
        ? 'Male'
        : 'Female';

    let fomattedDob;

    if (element.Dob) {
      fomattedDob = element.Dob.substring(0, 10);
    }

    delete element['SchoolId'];
    delete element['UserTypeId'];
    delete element['CountryId'];
    delete element['StatusTypeId'];
    delete element['CreatedBy'];
    delete element['CreatedOn'];
    delete element['Claims/0/ClaimValue'];
    delete element['Password'];
    delete element['GenderId'];
    delete element['UserName'];
    delete element['Dob'];
    element['Gender'] = gender;
    element['Dob(mm-dd-yyyy)'] = fomattedDob;
    return element;
  });

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(updatedData);
  const csv = XLSX.utils.sheet_to_csv(ws);

  wb.SheetNames.push('sheet1');
  wb.Sheets['sheet1'] = ws;

  const wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'binary',
  });

  let url = window.URL.createObjectURL(
    new Blob([s2ab(csv)], { type: 'application/octet-stream' })
  );

  download(url, 'UploadFailed-StudentList.csv');
};
