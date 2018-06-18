import React, { Component } from 'react';

import { Form, Field } from 'react-final-form';

import types from './types';

export default class PanelItem extends Component {
  state = {
    editing: false,
    panel: null
  };

  moveUp = () => {
    this.props.onMoveUp(this.props.index);
  }

  moveDown = () => {
    this.props.onMoveDown(this.props.index);
  }

  edit = () => {
    this.setState({editing: true});
  }

  cancel = () => {
    this.setState({editing: false, panel: null});
  }

  onSubmit = async (values) => {
    let panel = Object.assign({}, this.props.panel, values);
    panel.seconds = Number.parseFloat(panel.seconds) || 10; // TODO: validation
    await this.props.onSave(this.props.index, panel);
    this.setState({editing: false, panel: null});
  }

  render() {
    if (this.state.editing) {
      let TypeEditor = types.types[this.props.panel.type].editor;
      return <Form
        onSubmit={this.onSubmit}
        initialValues={this.props.panel}
        render={({handleSubmit, pristine, reset, submitting, values}) => {
          return <form className="PanelItem-editor" onSubmit={handleSubmit}>
            <div>
              <Field type="text" name="name" component="input" placeholder="Name (informational only)" className="PanelItem-name-field" parse={null}/>
            </div>
            <div>
              <Field type="text" name="seconds" component="input" className="PanelItem-seconds-field"/>&nbsp;
              seconds
              <div className="float-right">
                <Field name="enabled" component="input" type="checkbox"/>
                <label className="label-inline" htmlFor="enabled">Enabled</label>
              </div>
            </div>
            <TypeEditor panel={this.props.panel} displayId={this.props.displayId}/>
            <div className="PanelItem-button-row">
              <button type="submit">Save</button>
              <button onClick={this.cancel} className="button-outline">Cancel</button>
            </div>
          </form>
        }}
      />;
    } else {
      return <React.Fragment>
        <div className="PanelItem-name">{this.props.panel.name}</div>
        <button className="PanelItem-edit" onClick={this.edit}>Edit</button>
        {this.props.canMoveUp && <button className="PanelItem-move-up button-outline" onClick={this.moveUp}>&uarr;</button>}
        {this.props.canMoveDown && <button className="PanelItem-move-down button-outline" onClick={this.moveDown}>&darr;</button>}
      </React.Fragment>;
    }
  }
}
