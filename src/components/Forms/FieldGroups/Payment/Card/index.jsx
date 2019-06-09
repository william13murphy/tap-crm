import React from 'react';
import TextField from 'components/Forms/TextField';
import SelectField from 'components/Forms/SelectField';
import moment from 'moment';
import CardValidator from 'card-validator';
import InputBlock from 'components/Forms/InputBlock';
import connect from 'src/redux/connect';
import './styles';
import { formValueSelector } from 'redux-form';
// import CardCVC from 'assets/images/card_cvc.png';
// import CardCVCAmex from 'assets/images/card_cvc_amex.png';
import CardAmex from 'assets/images/card_amex.png';
import CardDiners from 'assets/images/card_diners.png';
import CardMastercard from 'assets/images/card_mastercard.png';
import CardMaestro from 'assets/images/card_mastercard.png';
import CardDiscover from 'assets/images/card_discover.png';
import CardJCB from 'assets/images/card_jcb.png';
import CardUnknown from 'assets/images/card_unknown.png';
import CardVisa from 'assets/images/card_visa.png';

const months = new Array(12).fill(0).map((item, index) => {
  return {
    label: index + 1 < 10 ? `0${index + 1}` : index + 1,
    value: index + 1 < 10 ? `0${index + 1}` : `${index + 1}`,
  };
});

const years = new Array(22).fill(0).map((item, index) => {
  return {
    label: moment().year() + index,
    value: `${moment().year() + index}`,
  };
});

const Icons = {
  // cvc: CardCVC,
  // cvc_amex: CardCVCAmex,
  'american-express': CardAmex,
  'diners-club': CardDiners,
  'master-card': CardMastercard,
  maestro: CardMaestro,
  discover: CardDiscover,
  jcb: CardJCB,
  placeholder: CardUnknown,
  visa: CardVisa,
};

const GetCardType = number => {
  if (!number) return Icons['placeholder'];

  let cardType = CardValidator.number(number).card
    ? CardValidator.number(number).card.type
    : 'placeholder';

  return Icons[cardType] ? Icons[cardType] : Icons['placeholder'];
  // // visa
  let re = new RegExp('^4');
  if (number.match(re) != null) return 'card_visa.png'; //'Visa';

  // // Mastercard
  // // Updated for Mastercard 2017 BINs expansion
  if (
    /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
      number
    )
  )
    return 'card_mastercard.png'; //'Mastercard';

  // // AMEX
  re = new RegExp('^3[47]');
  if (number.match(re) != null) return 'card_amex.png'; //'AMEX';

  // // // Discover
  re = new RegExp(
    '^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)'
  );
  if (number.match(re) != null) return 'card_discover.png'; //'Discover';

  // // // Diners
  re = new RegExp('^36');
  if (number.match(re) != null) return 'card_diners.png'; //'Diners';

  // // Diners - Carte Blanche
  re = new RegExp('^30[0-5]');
  if (number.match(re) != null) return 'card_diners.png'; // 'Diners - Carte Blanche';

  // // JCB
  re = new RegExp('^35(2[89]|[3-8][0-9])');
  if (number.match(re) != null) return 'card_jcb.png'; //'JCB';

  // // Visa Electron
  re = new RegExp('^(4026|417500|4508|4844|491(3|7))');
  if (number.match(re) != null) return 'card_visa.png'; // 'Visa Electron';

  return 'card_unknown.png';
};

type CardPaymentFieldGroupProps = {
  showIcon: boolean,
};

class CardPaymentFieldGroup extends React.Component {
  props: CardPaymentFieldGroupProps;
  state = {
    picture: null,
  };

  handleCardNumberChange = value => {
    let picture = GetCardType(value);

    this.setState({
      picture: picture,
    });
  };

  componentDidMount() {
    let picture = GetCardType('');

    this.setState({
      picture: picture,
    });
  }

  render() {
    return (
      <div className="CardPaymentFieldGroup">
        <InputBlock>
          <TextField
            label=""
            type="text"
            placeholder="Card Holder Full Name"
            name="CardHolder"
            required={true}
          />
        </InputBlock>
        <InputBlock>
          <div className="CardNumberInput">
            <div className="CardNumber">
              <TextField
                label=""
                type="number"
                placeholder="Card Number"
                name="CardNumber"
                required={true}
                onChange={(event, value) => this.handleCardNumberChange(value)}
              />
            </div>
            {this.props.showIcon && (
              <div className="CardLogo">
                <img className="CardLogo__image" src={this.state.picture} />
              </div>
            )}
          </div>
        </InputBlock>
        <InputBlock columns={3}>
          <TextField
            className="CardCvs"
            label=""
            type="number"
            placeholder="CVV/CVC"
            name="CardCvs"
            required={true}
          />
          <SelectField
            options={months}
            placeholder="Expiry Month"
            name="CardExpirationMonth"
            required={true}
          />

          <SelectField
            options={years}
            placeholder="Expiry Year"
            name="CardExpirationYear"
            required={true}
          />
        </InputBlock>
      </div>
    );
  }
}

const selector = formValueSelector('checkout');

const mapStateToProps = state => {
  return {
    CardNumber: selector(state, 'CardNumber'),
  };
};

export default connect(
  CardPaymentFieldGroup,
  mapStateToProps
);
