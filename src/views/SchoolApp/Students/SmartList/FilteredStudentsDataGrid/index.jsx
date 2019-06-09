import React from 'react';
import connect from 'src/redux/connect';
import moment from 'moment';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import { getReferenceItemById } from 'src/api/referenceItems';
import { getUTCDateTime } from 'util/localization/timezone';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CSVLink, CSVDownload } from 'react-csv';
import Workbook from 'react-excel-workbook';
import SubmitButton from 'components/Forms/SubmitButton';

type FilteredStudentsDataGridProps = {
  data: {
    payload: Array<{}>,
  },
  history: {
    push: any,
  },
};

const csvHeaders = [
  { label: 'First Name', key: 'FirstName' },
  { label: 'Last Name', key: 'LastName' },
  { label: 'Email', key: 'Email' },
  { label: 'Phone Number', key: 'PhoneNumber' },
  { label: 'Status', key: 'Status' },
];

class FilteredStudentsDataGrid extends React.Component {
  props: FilteredStudentsDataGridProps;
  state = { data: [] };

  componentWillMount() {
    let newData = [];
    if (this.props.data) {
      newData = this.props.data.map(item => {
        item.StatusTypeId =
          getReferenceItemById(
            this.props.references,
            'LstStudentStatusTypes',
            item.StatusTypeId
          ) &&
          getReferenceItemById(
            this.props.references,
            'LstStudentStatusTypes',
            item.StatusTypeId
          ).Description;

        item.CountryId =
          getReferenceItemById(
            this.props.references,
            'LstCountries',
            item.CountryId
          ) &&
          getReferenceItemById(
            this.props.references,
            'LstCountries',
            item.CountryId
          ).Description;

        item.Dob = moment(item.Dob).format('MMMM Do, YYYY');

        return item;
      });
    }

    let data = newData;
    this.setState({ data });
  }

  handlePdfExport = e => {
    e.preventDefault();
    html2canvas(document.querySelector('#smartListPrintable')).then(canvas => {
      document.body.appendChild(canvas); // if you want see your screenshot in body.
      const imgData = canvas.toDataURL('image/jpg');
      const pdf = new jsPDF('p', 'px', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'JPG', 0, 0);
      pdf.save('EFC_SmartList.pdf');
    });
  };

  renderExportButtons = () => {
    const buttonStyle = {
      height: '40px',
      width: '60px',
      cursor: 'pointer',
      marginLeft: '20px',
      marginRight: '20px',
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          margin: '4px 8px',
          justifyContent: 'flex-end',
          width: '96%',
        }}
      >
        <SubmitButton className="pt-icon-export" size="small" intent="primary">
          <CSVLink
            data={this.state.data}
            headers={csvHeaders}
            filename={'EFC_SmartList.csv'}
          >
            {' '}
            <span style={{ marginLeft: '8px' }} /> CSV
          </CSVLink>
        </SubmitButton>
        <SubmitButton className="pt-icon-export" size="small" intent="primary">
          {' '}
          <a onClick={this.handlePdfExport} href="#">
            <span style={{ marginLeft: '8px' }} /> PDF
          </a>
        </SubmitButton>
        <SubmitButton className="pt-icon-export" size="small" intent="primary">
          <Workbook
            filename="EFC_SmartList.xlsx"
            element={
              <p>
                <span style={{ marginLeft: '8px' }} /> XLS
              </p>
            }
          >
            <Workbook.Sheet data={this.state.data} name="Smart List">
              <Workbook.Column label="First Name" value="FirstName" />
              <Workbook.Column label="Last Name" value="LastName" />
              <Workbook.Column label="Emain" value="Email" />
              <Workbook.Column label="Phone Number" value="PhoneNumber" />
              <Workbook.Column label="Status" value="Status" />
            </Workbook.Sheet>
          </Workbook>
        </SubmitButton>
      </div>
    );
  };

  renderPrinterPage = () => {
    const now = new moment();
    const timeNow = now.format('MM/DD/YYYY hh:mm A');

    return (
      <div>
        <div
          id="smartListPrintable"
          style={{
            width: '21cm',
            display: 'flex',
            margin: 'auto',
            flexDirection: 'column',
            textAlign: 'center',
            marginBottom: '0.5cm',
          }}
        >
          <div
            className="printHeader"
            style={{
              display: 'flex',
              flexDirection: 'row',
              height: '120px',
              marginTop: '2cm',
            }}
          >
            <div
              className="logo"
              style={{ width: '20%', justifyContent: 'center' }}
            >
              <img
                src="/assets/images/TAP_Color_2b0f639c98886b14ec02d6ffe94302eb.svg"
                height="80px"
                style={{ marginTop: '0.5cm' }}
              />
            </div>
            <div
              className="printHeaderDetails"
              style={{ width: '60%', marginTop: '0.5cm' }}
            >
              <h1>SMART LIST</h1>
              <h4>{`Saved at ${timeNow} by ${
                this.props.token.payload.UserName
              }`}</h4>
            </div>
          </div>
          <div
            style={{
              backgroundColor: 'gray',
              width: '92%',
              height: '1px',
              margin: '0 auto',
              opacity: '0.5',
              marginTop: '6px',
              marginBottom: '6px',
            }}
          />
          <div
            className="smartTableData"
            style={{
              width: '92%',
              marginLeft: '4%',
              marginRight: '4%',
              marginTop: '20px',
            }}
          >
            <DynamicHeightReactTable
              className="FilteredStudentsDataGrid linked-row"
              data={this.state.data}
              columns={this.props.columns}
              getTrProps={(state, rowInfo, column, instance) => ({
                onClick: () => {
                  this.props.history.push(
                    `/app/school-app/${this.props.schoolId}/students/detail/${
                      rowInfo.original.StudentId
                    }`
                  );
                },
              })}
            />
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.renderExportButtons()}
        <DynamicHeightReactTable
          className="FilteredStudentsDataGrid linked-row"
          data={this.state.data}
          columns={this.props.columns}
          getTdProps={(state, rowInfo, column, instance) => ({
            onClick: () => {
              if (column.Header === 'Email') {
                this.props.history.push({
                  pathname: `/app/school-app/${
                    this.props.schoolId
                  }/students/smart-list/report/send-email`,

                  state: {
                    studentId: rowInfo.original.StudentId,
                    schoolId: rowInfo.original.SchoolId,
                    firstName: rowInfo.original.FirstName,
                    lastName: rowInfo.original.LastName,
                    prevPath: location.pathname,
                  },
                });
              } else if (column.Header === 'Phone Number') {
                this.props.history.push({
                  pathname: `/app/school-app/${
                    this.props.schoolId
                  }/students/smart-list/report/send-sms`,

                  state: {
                    studentId: rowInfo.original.StudentId,
                    schoolId: rowInfo.original.SchoolId,
                    firstName: rowInfo.original.FirstName,
                    lastName: rowInfo.original.LastName,
                    prevPath: location.pathname,
                  },
                });
              } else if (column.id !== 'isEnabled') {
                this.props.history.push(
                  `/app/school-app/${this.props.schoolId}/students/detail/${
                    rowInfo.original.StudentId
                  }`
                );
              }
            },
          })}
        />

        {this.renderExportButtons()}
        {this.renderPrinterPage()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
  references: state.utility.references,
});

export default connect(
  FilteredStudentsDataGrid,
  mapStateToProps
);
