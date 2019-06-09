import React from 'react';
import { reduxForm } from 'redux-form';
import connect from 'src/redux/connect';

import InputBlock from 'components/Forms/InputBlock';

import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';

import SelectField from 'components/Forms/SelectField';
import ImageField from 'components/Forms/ImageField';
import { imageToBase64String, base64StringToFields } from 'util/base64';
import { log } from 'log';

type AddInventoryItemFormProps = {
  studentId: string,
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  token: {
    payload: {
      UserId: string,
    },
  },
  posId: string,
  initialValues: {
    PictureBlobUrl: Blob,
  },
};

const validate = values => {
  const errors = {};
  if (!values.CategoryId) {
    errors.CategoryId = 'Please select a Category.';
  }
  if (!values.Name) {
    errors.Name = 'Please enter a Name.';
  }
  if (!values.Description) {
    errors.Description = 'Please enter a Description.';
  }

  if (!values.SellingPrice) {
    errors.SellingPrice = 'Please enter a Selling Price.';
  }

  if (!values.AvailableQuantity) {
    errors.AvailableQuantity = 'Please enter Available Quantity.';
  }

  if (!values.MinimumQuantity) {
    errors.MinimumQuantity = 'Please enter Minimum Quantity.';
  }

  if (!values.MaximumQuantity) {
    errors.MaximumQuantity = 'Please enter Maximum Quantity.';
  }

  if (!values.TaxRate) {
    errors.TaxRate = 'Please enter Tax Rate.';
  }
  return errors;
};

class AddInventoryItemForm extends React.Component {
  props: AddInventoryItemFormProps;
  onSubmit = formData => {
    let Stock = {
      SkuId: '00000000-0000-0000-0000-000000000000',
    };
    formData['Stock'] = Stock;
    formData['AvailableQuantity'] = +formData.AvailableQuantity;
    formData['MinimumQuantity'] = +formData.MinimumQuantity;
    formData['MaximumQuantity'] = +formData.MaximumQuantity;
    formData['SellingPrice'] = +formData.SellingPrice;
    formData['TaxRate'] = +formData.TaxRate;
    formData['PosId'] = this.props.posId;
    formData['CreatedBy'] = this.props.token.payload.UserId;

    if (formData.Image) {
      imageToBase64String(formData.Image).then(base64ImageString => {
        const base64Fields = base64StringToFields(base64ImageString);

        formData['PictureHeader'] = base64Fields.headerString;
        formData['Picture'] = base64Fields.imageString;
        delete formData.Image;
        log('onSubmit formData', formData);
        this.props.dispatchFormPost(formData);
      });
    } else {
      log('onSubmit formData', formData);
      this.props.dispatchFormPost(formData);
    }
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <SelectField
            label="Category*"
            name="CategoryId"
            placeholder="Select Category"
            required={true}
            referenceOptions="LstSkuCategory"
          />
        </InputBlock>
        <InputBlock>
          <TextField label="Name*" name="Name" required={true} />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Description*"
            name="Description"
            textarea={true}
            required={true}
          />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Selling Price*"
            name="SellingPrice"
            required={true}
            type="number"
            input={{ min: 0, step: '.01' }}
            currency
          />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Available Quantity*"
            name="AvailableQuantity"
            required={true}
            type="number"
            input={{ min: 0 }}
          />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Tax Rate*"
            name="TaxRate"
            required={true}
            type="number"
            input={{ min: 0, step: '.01' }}
            percent
          />
        </InputBlock>
        <InputBlock>
          <ImageField
            label="Image*"
            name="Image"
            required={true}
            imageFile={
              this.props.initialValues
                ? this.props.initialValues.PictureBlobUrl
                : ''
            }
          />
        </InputBlock>
        <div className="FormButtonsContainer">
          <SubmitButton intent="pt-intent-primary">Submit</SubmitButton>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
  };
};

const connectedAddInventoryItemForm = connect(
  AddInventoryItemForm,
  mapStateToProps
);

export default reduxForm({
  form: 'add-school-inventory', // a unique identifier for this form
  validate,
})(connectedAddInventoryItemForm);
