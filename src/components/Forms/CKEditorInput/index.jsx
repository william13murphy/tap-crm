import React from 'react';
import CKEditor from 'react-ckeditor-component';

type CKEditorInputProps = {
  updateFormData: any,
  value: string,
  placeholders?: [], // For placeholder-select plugin
};

class CKEditorInput extends React.Component {
  props: CKEditorInputProps;
  state = {
    content: this.props.value,
  };

  //Updates the CKEditor component, as well as the formData it was called from
  onChange = evt => {
    let newContent = evt.editor.getData();
    this.setState({ content: newContent }, () => {
      this.props.updateFormData(this.state.content);
    });
  };

  //Updates the CKEditor content when changing the selected template
  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ content: nextProps.value });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.content === nextState.content ||
      this.props.value === nextProps.value
    ) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    return (
      <CKEditor
        activeClass="p10"
        scriptUrl="/vendor/ckeditor/ckeditor.js"
        content={this.state.content}
        key={this.props.value}
        events={{
          change: this.onChange,
        }}
        config={{
          placeholder_select: {
            placeholders: this.props.placeholders || [],
          },
        }}
      />
    );
  }
}

export default CKEditorInput;
