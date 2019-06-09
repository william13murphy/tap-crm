import React from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Link } from 'react-router-dom';

import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import SelectField from 'components/Forms/SelectField';
import SubmitButton from 'components/Forms/SubmitButton';
import Modal from 'components/Modal';
import NoDataMessage from 'components/DataLoading/NoDataMessage';

import RankRequirementSelectField from '../RankRequirementSelectField';
import connect from 'src/redux/connect';

import SchoolRankRequirementsContainer from 'containers/School/SchoolRankRequirementsContainer';
import SchoolRankRequirementFormContainer from 'containers/School/SchoolRankRequirementFormContainer';
import { schoolRankRequirementsFetch } from 'src/redux/actionCreators/school/rankRequirements';
import { log } from 'log';
import './styles.less';

type AddSchoolStyleRankFormProps = {
  schoolId: string,
  styleId: string,
  rankRequirements: {
    payload: Array<{}>,
  },
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  allBeltMaster: [{}],
  dispatchAddedSkills: Function,
};

const validate = values => {
  const errors = {};
  if (!values.Name) {
    errors.Name = 'Please enter a Name.';
  }
  if (!values.Order) {
    errors.Order = 'Please enter an Order.';
  }
  if (!values.LogoBlobUrl) {
    errors.LogoBlobUrl = 'Please select the Belt type.';
  }
  return errors;
};

const SkillsList = props => {
  return (
    <ul>
      <SchoolRankRequirementsContainer dispatchFetchParams={props.schoolId}>
        {props.fields.map((skill, index) => (
          <li key={index} className="SelectSkill ">
            <RankRequirementSelectField name={skill} />
            <button
              className="Close__selectskill pt-button"
              type="button"
              title="Remove Skill"
              onClick={() => props.fields.remove(index)}
            >
              X
            </button>
          </li>
        ))}
      </SchoolRankRequirementsContainer>
      <li>
        <button
          type="button"
          className="AddSkill pt-button"
          onClick={() => props.fields.push({})}
        >
          Add Skill
        </button>
      </li>
    </ul>
  );
};

class AddSchoolStyleRankForm extends React.Component {
  props: AddSchoolStyleRankFormProps;
  constructor(props) {
    super(props);

    this.state = {
      beltImageUrl: '',
      isBeltType: true,
      shouldUpdate: true,
    };
  }

  onSubmit = formData => {
    formData.SchoolId = this.props.schoolId;
    formData.SchoolStyleId = this.props.styleId;
    if (formData.skills) {
      let skillsData = formData.Skills.filter(element => {
        return element != null;
      });
    }

    formData.PromotionRule = this.makePromotionRule(
      formData.Classes ? formData.Classes : 0,
      formData.Weeks ? formData.Weeks : 0,
      formData.Skills
    );
    formData.LogoBlobUrl =
      this.state.beltImageUrl === ''
        ? this.props.initialValues.LogoBlobUrl
        : this.state.beltImageUrl;

    delete formData.Classes;
    delete formData.Weeks;
    delete formData.Skills;

    // Set default color to #000000 if no input received from user
    formData.Color = formData.Color || '#000000';

    log('onSubmit formData', formData);
    this.props.dispatchFormPost(formData);
  };
  makePromotionRule(classes, weeks, skills) {
    const PromotionRule = [
      {
        Field: 'Classes',
        Id: '6f63d689-f85c-4667-95f6-cc5161e0427c', // This is a hardcoded value
        Operator: 'greater_or_equal',
        Type: 'integer',
        Value: classes,
        Color: '',
      },
      {
        Field: 'Weeks',
        Id: '97a99d4c-ed90-4338-9057-da3a22f464f4', // This is a hardcoded value
        Operator: 'greater_or_equal',
        Type: 'integer',
        Value: weeks,
        Color: '',
      },
    ];
    if (skills) {
      let skillsData = skills.filter(element => {
        return typeof element === 'string';
      });

      skillsData.forEach(skillValue => {
        const skillName = this.props.rankRequirements.payload.filter(cV => {
          let skillId = skillValue.slice(-36);

          if (cV.Id === skillId) {
            return cV.Name;
          }
        });

        const skillObject = {
          Field: skillName[0].Name,
          Id: skillName[0].Id,
          Operator: 'equal',
          Type: 'boolean',
          Value: false,
          Color: skillName[0].Color,
        };
        PromotionRule.push(skillObject);
      });
    } else {
      const skillObject = {};
      PromotionRule.push(skillObject);
    }
    return JSON.stringify(PromotionRule);
  }
  handleSelectField(selectedItem) {
    let beltImageUrl = selectedItem.substring(selectedItem.indexOf('https'));
    this.setState({ beltImageUrl });
  }

  handleEditBeltType() {
    this.setState({ isBeltType: !this.state.isBeltType });
  }

  componentWillReceiveProps(prevProps, props, state) {
    let skillsArr = [];

    if (
      this.props.initialValues &&
      this.state.shouldUpdate &&
      prevProps &&
      prevProps.rankRequirements &&
      prevProps.rankRequirements.payload
    ) {
      prevProps.initialValues.Skills.map(element => {
        prevProps.rankRequirements.payload.map(cV => {
          if (cV.Id === element) {
            skillsArr.push(cV.Name + element);
          }
        });
      });
      this.setState({
        shouldUpdate: !this.state.shouldUpdate,
      });

      this.props.initialize({
        RankRequirements:
          this.props.initialValues && this.props.initialValues.RankRequirements,
        Id: this.props.initialValues && this.props.initialValues.Id,
        SchoolStyleId:
          this.props.initialValues && this.props.initialValues.SchoolStyleId,
        Name: this.props.initialValues && this.props.initialValues.Name,
        Description:
          this.props.initialValues && this.props.initialValues.Description,
        Color: this.props.initialValues && this.props.initialValues.Color,
        LogoBlobUrl:
          this.props.initialValues && this.props.initialValues.LogoBlobUrl,
        Logo: this.props.initialValues && this.props.initialValues.Logo,

        LogoHeader:
          this.props.initialValues && this.props.initialValues.LogoHeader,
        Order: this.props.initialValues && this.props.initialValues.Order,
        RankLevelId:
          this.props.initialValues && this.props.initialValues.RankLevelId,
        PromotionRule:
          this.props.initialValues && this.props.initialValues.PromotionRule,
        Name: this.props.initialValues && this.props.initialValues.Name,

        PromotionClassAlert:
          this.props.initialValues &&
          this.props.initialValues.PromotionClassAlert,
        PromotionDateAlert:
          this.props.initialValues &&
          this.props.initialValues.PromotionDateAlert,
        PromotionPercentAlert:
          this.props.initialValues &&
          this.props.initialValues.PromotionPercentAlert,
        SupplyClassAlert:
          this.props.initialValues && this.props.initialValues.SupplyClassAlert,
        SupplyDateAlert:
          this.props.initialValues && this.props.initialValues.SupplyDateAlert,
        SupplyPercentAlert:
          this.props.initialValues &&
          this.props.initialValues.SupplyPercentAlert,
        Udf1: this.props.initialValues && this.props.initialValues.Udf1,
        Udf2: this.props.initialValues && this.props.initialValues.Udf2,
        Udf3: this.props.initialValues && this.props.initialValues.Udf3,
        HasStudents:
          this.props.initialValues && this.props.initialValues.HasStudents,
        Classes: this.props.initialValues && this.props.initialValues.Classes,
        Weeks: this.props.initialValues && this.props.initialValues.Weeks,
        Skills: skillsArr,
      });
    }
  }

  render() {
    return (
      <form
        className="AddSchoolStyleRankForm"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        method="POST"
      >
        <InputBlock>
          <TextField label="Name*" name="Name" required={true} />
        </InputBlock>
        <InputBlock>
          <TextField label="Order*" name="Order" required={true} />
        </InputBlock>
        <InputBlock>
          {this.props.initialValues && this.state.isBeltType ? (
            <SelectField
              name="LogoBlobUrl"
              label="Belt Type*"
              options={
                this.props.allBeltMaster &&
                this.props.allBeltMaster.payload &&
                this.props.allBeltMaster.payload.map(beltItem => {
                  return {
                    label: (
                      <div
                        onClick={() => this.handleEditBeltType()}
                        className="BeltTypeSelectItem"
                      >
                        <img
                          className="BeltTypeSelectItem__belt-image"
                          src={beltItem.PictureBlobUrl}
                        />
                        <span>{beltItem.Name}</span>
                      </div>
                    ),
                    value: beltItem.PictureBlobUrl,
                  };
                })
              }
              onChange={(evt, newIndex) => this.handleSelectField(newIndex)}
            />
          ) : (
            <SelectField
              name="LogoBlobUrl"
              label="Belt Type*"
              options={
                this.props.allBeltMaster &&
                this.props.allBeltMaster.payload &&
                this.props.allBeltMaster.payload.map(beltItem => {
                  return {
                    label: (
                      <div className="BeltTypeSelectItem">
                        <img
                          className="BeltTypeSelectItem__belt-image"
                          src={beltItem.PictureBlobUrl}
                        />
                        <span>{beltItem.Name}</span>
                      </div>
                    ),

                    value: beltItem.Name + ' ' + beltItem.PictureBlobUrl,
                  };
                })
              }
              onChange={(evt, newIndex) => this.handleSelectField(newIndex)}
            />
          )}
        </InputBlock>
        <div>
          <label className="pt-label">Promotion Requirement</label>
        </div>
        <InputBlock className="RankRequirements">
          <span className="flex align-items-center">Must attend&nbsp;</span>
          <TextField
            className="TextField__Classes"
            label=""
            name="Classes"
            required={true}
            type="number"
            input={{ min: 0 }}
          />
          <span className="flex align-items-center">
            &nbsp;classes, and&nbsp;
          </span>
          <TextField
            className="TextField__Weeks"
            label=""
            name="Weeks"
            required={true}
            type="number"
            input={{ min: 0 }}
          />
          <span className="flex align-items-center">&nbsp;weeks.</span>
        </InputBlock>
        <div>
          <label className="Additional__skills pt-label">
            Additional Skills
          </label>
        </div>
        <InputBlock className="AdditionalSkills">
          {this.props.rankRequirements.payload &&
          this.props.rankRequirements.payload.length > 0 ? (
            <fieldset>
              <FieldArray
                name="Skills"
                component={SkillsList}
                props={{
                  schoolId: this.props.schoolId,
                }}
              />
            </fieldset>
          ) : (
            <div>
              <Link
                className="Add__NewSkill float-left pt-button pt-icon-series-add"
                to={{
                  pathname: `${this.props.match.url}/add-skill`,
                  state: { initialValues: this.props.initialValues },
                }}
              >
                Add New Skill
              </Link>
            </div>
          )}

          {this.props.rankRequirements.payload &&
            this.props.rankRequirements.payload.length > 0 && (
              <div>
                <Link
                  className="Add__NewSkill pt-button pt-icon-series-add"
                  to={{
                    pathname: `${this.props.match.url}/add-skill`,
                    state: { initialValues: this.props.initialValues },
                  }}
                >
                  Add New Skill
                </Link>
              </div>
            )}
        </InputBlock>
        <div className="FormButtonsContainer">
          <SubmitButton intent="pt-intent-primary">Submit</SubmitButton>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchAddedSkills: schoolId => {
      dispatch(schoolRankRequirementsFetch(schoolId));
    },
  };
};

const mapStateToProps = state => {
  return {
    allBeltMaster: state.utility.allBeltMaster,
    rankRequirements: state.school.rankRequirements,
  };
};

const AddSchoolStyleRank = connect(
  AddSchoolStyleRankForm,
  mapStateToProps
);

export default reduxForm({
  form: 'add-school-style-rank', // a unique identifier for this form
  validate,
})(AddSchoolStyleRank);
