## Layout Components

`<Module>`

- A wrapper component which usually corresponds to a Nav item.
- You may have a module inside of a module. For example: **School Module** contains **School Detail Module** which contains many **Pages**.
- Has a className attribute: `className="____Module"`

`<Page>`

- An individual page inside of a Module.
- Has a className attribute: `className="____Page"`
- Has a title attribute which is output to the browser `<title>` tag.
- **Important:** There should only be one Page component per page. If you are splitting a module into multiple pages, you must remove any redundant wrapper `<Page>` components.

`<PageHeader>`

- Contains a `<PageTitle>` component.
- Contains any navigation or important action buttons: `<BackButton>`, Add new item button, etc.

`<PageTitle>`

- Use this component within PageHeader for consistent title styles.
- If the PageHeader contains both a PageTitle and action buttons, use the `inline` attribute for proper alignment.

`<PageBody>`

- Wraps the main content of the page.

`<FormWrapper>`

- Wraps a form to keep it centered and at a reasonable width.
- Only necessary outside of Modals.

## Layout Component Structure

Typically the layout would include a `<Module>` component wrapping the entire module, which usually corresponds to a main navigation item (Dashboard, for example).

- Module contains top-level routes
- Module contains SubNav if needed
- Module contains any Pages for that module

```
const ExampleModule = props => (
  <Module>
    <SubNav>
      <div className="breadcrumbs-placeholder" />
      <TabList>
        <NavLink
          exact
          to="/app/example-module/example-page"
          className="NavLink"
          activeClassName="selected"
        >
          <Tab>Example Page</Tab>
        </NavLink>
      </TabList>
    </SubNav>
    <Route component={() => (
      <ExamplePage />
    )} />
  </Module>
);
```

Each Page inside of the module would follow this structure:

```
const ExamplePage = props => (
  <Page className="ExamplePage" title="Example">
    <PageHeader>
      <PageTitle>Example Page</PageTitle>
    </PageHeader>
    <PageBody>
      Example page content goes here.
    </PageBody>
  </Page>
);
```
