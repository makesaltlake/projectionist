import React, { Component } from 'react';

export default class FieldEditor extends Component {
  state = {
    editing: false,
    value: null,
    saving: false
  }

  startEditing = () => {
    this.setState({editing: true, value: this.props.value});
  }

  setValue = (event) => {
    this.setState({value: event.target.value});
  }

  cancel = () => {
    this.setState({
      editing: false,
      value: null
    });
  }

  save = () => {
    this.setState({saving: true});
    Promise.resolve(this.props.onSave(this.state.value)).then(() => {
      this.setState({editing: false, value: null, saving: false});
    }).catch((e) => {
      console.warn("error while saving field:", e);
      this.setState({saving: false});
    });
  }

  render() {
    let WrapWith = this.props.wrapWith || 'div';

    if (this.state.editing) {
      return <div>
        <input type='text' value={this.state.value} onChange={this.setValue} disabled={this.state.saving} className="FieldEditor-field"/>&nbsp;
        <button disabled={this.state.saving} onClick={this.save}>Save</button>&nbsp;
        <button disabled={this.state.saving} onClick={this.cancel} className="button-outline">Cancel</button>
      </div>;
    } else {
      return <WrapWith>{this.props.value} <a href='javascript:void(0)' onClick={this.startEditing}>Edit</a></WrapWith>;
    }
  }
}
