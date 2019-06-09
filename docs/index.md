## TAP Coding Guidelines

### Table of Contents

- Git Workflow
- Layout Components & Structure
- Project Structure
- Directory Organization
- Code Quality Plugins
- File & ClassName Conventions
- Redux
- Reference Data
- Localization
- Authorization

### Git Workflow

- See git-workflow.md

### Layout Components & Structure

- See layout.md

### Project Structure

Blueprintjs informs the components’ style. If a component is missing from the `src/components/` directory, you can use Blueprintjs components as a starting point.

Redux contains the global state of the project.

Forms are handled by redux-form.

Containers wrap components which will need to access data from the API. The containers fetch the data, and show loaders or errors as appropriate:
https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0

- GenericFetchContainer
- GenericFormContainer

Flow is used for type annotations.

### Form Containers

FormContainers wrap all of our forms in the app, and handle the success/error states.

Take `SchoolLeadFormContainer` as a good example of the protocol to follow.

A. Every form should have 3 properties on it: dispatchActionOnClose, dispatchActionOnCloseParams, and redirectOnSuccess.

B. The dispatchActionOnClose should be mapped to props, directly inside of the form container. So if the form needs to fetch all leads after it is submitted, we would map it this way:

```
import { schoolLeadsFetch } from 'src/redux/actionCreators/school/leads';

...

dispatchActionOnClose: data => {
  dispatch(schoolLeadsFetch(data));
},
```

C. dispatchActionOnCloseParams should be passed in on instantiation.

```
<SchoolLeadFormContainer
  dispatchActionOnCloseParams={
    this.props.schoolId
  }
>
```

D. Additionally, all forms will now require a redirect prop, to redirect back to the page they came from, or to a destination page. This should be passed in on instantiation:

```
<SchoolLeadFormContainer
  redirectOnSuccess="/app/students/leads"
>
```

### Many-Fetch Reducers

Sometimes you need to fetch several instances of an endpoint.

For example, if you need to fetch the calendar for _each_ staff member, and display all of the calendars on a single page.

In this scenario, you would create a _many_ fetch reducer using `createManyFetchReducer.js`. The manyFetchReducers have a different `FETCH_SUCCESS` case, which accumulates multiple payloads, sorted by id:

```
payload: Object.assign({}, state.payload, {
  [action.payload.id]: action.payload.data,
}),
```

Then the actionCreator would be written slightly differently. We need to dispatch the success action with a `id` and `data` attributes instead of a typical payload:

```
.done(payload => {
  dispatch(
    anExampleManyFetchSuccess({
      id: params.Id,
      data: payload,
    })
  );
})
```

When using a many fetch reducer, you **must** reset the state when the container un-mounts. Otherwise, the data will continue to accumulate on the state object, and cause some bugs. To do this, connect a dispatchActionOnClose parameter which calls the `RESET_STATE` action:

```
const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (params: string) => {
      dispatch(anExampleManyFetch(params));
    },
    dispatchActionOnClose: () => {
      dispatch(anExampleManyResetState());
    },
  };
};
```

### Directory Organization

built/

- build directory

src/

- dev directory

**Within the src/ directory:**

api/

- list of endpoints
- roles
- reference item utility functions

assets/

- media files including images, fonts, etc

components/

- re-usable components for the app.

styles/

- Global styles

components/Auth/

- Any components related to Authorization

components/Forms/

- form-related components
- forms/ConnectedFields/ “smart” form components (has associated data)

components/DataLoading/

- Spinners, Progress Bars, Fail/Success Messages, etc

containers/

- container components which fetch/post data and pass along its data and state to its children

redux/

- action creators & reducers
- some hardcoded data

vendor/

- any vendor libraries which are not included via npm
- blueprintjs, CKEditor, font-awesome

views/

- views which implement the components.
- closely matches the navigation of the application.

views/shared/

- Shared components, to be used in the `views/***App/` directories

views/App/

- Application entry point
- Root-level views

### Code Quality Plugins

To ensure quality code, this project requires the use of a few plugins:

- ESLint
- StyleLint
- Editorconfig
- Prettier
- Flow

Before starting development, make sure to install the linter plugins in your IDE. In Atom, install the plugins named `editorconfig`, `linter`, `linter-eslint`, `linter-stylelint`, and `atom-prettier`.

To run Prettier:
`npm run prettier`

### File & ClassName Conventions

**CSS**

_Every component's highest-level block should have a className equal to the component name._

This makes it much easier to find which component is responsible for each DOM node when using the web inspector.

In this example, the component is named "MyComponent", so its outermost div has a className of "MyComponent".

```
const MyComponent = (props) => (
  <div className="MyComponent">{props.children}</div>
);
```

All other CSS ClassNames should follow the [BEM](http://getbem.com/) methodology.

So a nested element inside of a component would start in PascalCase, and continue in the BEM style:

```
const MyComponent = (props) => (
  <div className="MyComponent">
    <div className="MyComponent__header">
      {props.children}
    </div>
  </div>
);
```

**File Names**

Most components should follow this structure:

```
ComponentName/
  index.jsx
  styles.less
```

Components should be placed into a directory that matches the name of the component.

Components are named with PascalCase, with a `.jsx` file extension: `ThisIsAComponent.jsx`.

Non-component modules should use camelCase, and a `.js` file extension: `myModuleIsSnakeCase.js`

Assets should use snake_case: `this_is_an_image.png`

Routes should use dash-case, however route parameters will use camelCase (schoolId in this example is a route parameter): `<Route path="/app/school-app/:schoolId/another-long-route-name" />`

### Redux

This project utilizes [Flux Standard Actions](https://github.com/acdlite/flux-standard-action) with [redux-actions](https://redux-actions.js.org).
Each actionCreator call creates an action in the following format:

```
{
  type: string,
  payload: {},
  error: boolean
}
```

If the payload is an `new Error()` object, then error is automatically marked as `true`.

### Reference Data

A table of reference data is available throughout the app once logged in.

To retrieve reference data for a <select>:

1. Locate the reference data name, for example: 'LstEmailTemplateTypes'.

2. Most reference data contains the fields: { Id, Description }, which would translate to { value, label }.

If so, pass in the reference list name to the select field as the "referenceOptions" parameter. The SelectField utilizes the getReferenceItemOptions function from 'src/api/referenceItems'.

```
<SelectField
  label="TemplateTypeId*"
  name="TemplateTypeId"
  placeholder="Select a Template Type"
  referenceOptions="LstEmailTemplateTypes" />
```

4. If you require reference data in another format, use the "getReferenceItemOptions" function from 'src/api/referenceItems'.

### Localization

An environment variable is set in views/App/index.jsx, for `window.locale`;

Whenever referencing locales, use the `locales.js` list of constants; never use string values directly.

- See `util/localization/locales.js`

When using the localization components or utility functions, pass in a **locales object** whose keys are from `locales.js`:

```
import statesUnitedStates from './statesUnitedStates';
import statesAustralia from './statesAustralia';
import regionsUnitedKingdom from './regionsUnitedKingdom';

const myLocalesObject = {
  [locales.UnitedStates]: statesUnitedStates,
  [locales.Australia]: statesAustralia,
  [locales.UnitedKingdom]: regionsUnitedKingdom,
};
```

A higher-level component, `<LocalComponent />` has been created to render the correct component based on a "locales object" argument: `components`.

- See `components/Localization/LocalComponent`

A utility function, `localValue`, renders the correct value based on a "locales object" argument: `values`.

- See `util/localization/localValue`;

When using locales in **.less**, use the locale variables found in `_base.less`

### Authorization

Two components are provided for Authorization / Access Control:

- PrivateRoute
- PrivateComponent

**PrivateRoute**

Wrap a component in a PrivateRoute, and pass in the allowed roles
as the `allow` parameter.
PrivateRoute will allow/deny entry based on the role.

Use PrivateRoute for routes of the app where you want to deny entry for unauthorized roles.
PrivateRoute will kick the user out to a `401 Unauthorized` page.

Example usage, rendering a "MyComponent" component:

```
import { roles } from 'util/auth/roles';

<PrivateRoute
  allow={roles.SUBSET_SCHOOL_STAFF}
  component={MyComponent}
/>
```

Note: In general you should use PrivateComponent over PrivateRoute, when possible. When a PrivateRoute is used where a PrivateComponent should be, you may get a "flickering" bug in your component.

**PrivateComponent**

Wrap a component with a PrivateComponent, and pass in the allowed roles
as the `allow` parameter.
PrivateComponent will allow/deny entry based on the role.

Use PrivateComponent where you want to hide/show a component, but not kick the user out to a `401 Unauthorized` page.

Example usage, rendering a "MyComponent" component:

```
import { roles } from 'util/auth/roles';

<PrivateComponent allow={roles.SUBSET_SCHOOL_STAFF}>
  <MyComponent />
</PrivateComponent>
```
