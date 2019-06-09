import { log } from 'log';

export function imageToBase64String(file) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.onload = function() {
      return resolve(reader.result);
    };

    reader.onerror = function(error) {
      log('FileReader Error: ', error);
      return reject(error);
    };
  });
}

//Specifically designed to return an .xlsx file
//Create a new function with different blob type if another file format is needed
export function excelToBase64String(data) {
  const blob = new Blob([data], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  let reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve, reject) => {
    reader.onload = function() {
      return resolve(reader.result);
    };

    reader.onerror = function(error) {
      log('FileReader Error: ', error);
      return reject(error);
    };
  });
}

//Specifically designed to return an .pdf file
//Create a new function with different blob type if another file format is needed
export function pdfToBase64String(data) {
  const blob = new Blob([data], {
    type: 'application/pdf',
  });
  let reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve, reject) => {
    reader.onload = function() {
      return resolve(reader.result);
    };

    reader.onerror = function(error) {
      log('FileReader Error: ', error);
      return reject(error);
    };
  });
}

// Take base64String and split it into headerString and imageString.
export function base64StringToFields(base64ImageString: string) {
  const headerEnd = base64ImageString.indexOf(',') + 1;
  const headerString = base64ImageString.substr(0, headerEnd);
  const imageString = base64ImageString.substr(
    headerEnd,
    base64ImageString.length
  );

  return {
    headerString,
    imageString,
  };
}
