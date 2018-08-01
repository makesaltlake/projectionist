import React, { Component } from 'react';

import uuidv4 from 'uuid/v4';

import { firestore } from '../firebase';

import types from './types';
import FieldEditor from '../components/FieldEditor';
import PanelItem from './PanelItem';

const panelTemplates = {
  image: {
    imageUrl: null
  }
}

export default class Display extends Component {
  state = {
    display: null,
    addPanelType: types.order[0],
    showingToken: false,
    creatingToken: false
  }

  componentDidMount() {
    this.unregisterListener = firestore.collection('displays').doc(this.props.id).onSnapshot(display => {
      this.setState({display: display});
    });
  }

  componentWillUnmount() {
    this.unregisterListener();
  }

  setName = async name => {
    return firestore.collection('displays').doc(this.props.id).update({name});
  }

  addPanelTypeChanged = event => {
    this.setState({addPanelType: event.target.value});
  }

  addPanel = () => {
    let panelData = Object.assign({}, panelTemplates[this.state.addPanelType], {
      id: `${Math.random()}`,
      type: this.state.addPanelType,
      name: `New ${types.types[this.state.addPanelType].label}`,
      enabled: false,
      seconds: 10
    });
    firestore.collection('displays').doc(this.props.id).update({
      panels: this.state.display.data().panels.concat([panelData])
    });
  }

  movePanelUp = async (index) => {
    let panels = this.state.display.data().panels.slice(0);
    let panel1 = panels[index - 1];
    let panel2 = panels[index];
    panels[index - 1] = panel2;
    panels[index] = panel1;
    firestore.collection('displays').doc(this.props.id).update({panels});
  }

  movePanelDown = (index) => {
    this.movePanelUp(index + 1);
  }

  savePanel = (index, value) => {
    let panels = this.state.display.data().panels.slice(0);
    panels[index] = value;
    firestore.collection('displays').doc(this.props.id).update({panels});
  }

  deletePanel = (index) => {
    let panels = this.state.display.data().panels.slice(0);
    panels.splice(index, 1);
    firestore.collection('displays').doc(this.props.id).update({panels});
  }

  getToken = async () => {
    try {
      if (!this.state.display.get('clientToken')) {
        this.setState({creatingToken: true});
        await firestore.collection('displays').doc(this.props.id).update({clientToken: uuidv4()});
      }
    } finally {
      this.setState({creatingToken: false, showingToken: true});
    }
  }

  hideToken = () => {
    this.setState({showingToken: false});
  }

  renderTokenGetter() {
    if (this.state.display) {
      if (this.state.showingToken) {
        return <span>Token: {this.state.display.get('clientToken')} <a href="#" onClick={this.hideToken}>Hide</a></span>;
      } else {
        return <button onClick={this.getToken} disabled={this.state.creatingToken}>Get Token</button>;
      }
    } else {
      return null;
    }
  }

  render() {
    if (this.state.display) {
      let panels = this.state.display.data().panels || [];

      return <div>
        <div><FieldEditor wrapWith={'h4'} value={this.state.display.data().name} onSave={this.setName}/></div>
        <div>{this.renderTokenGetter()}</div>
        <div className="Display-panel-grid">
          {(this.state.display.data().panels || []).map((panel, index) =>
            <PanelItem
              key={panel.id}
              panel={panel}
              index={index}
              displayId={this.props.id}
              canMoveUp={index != 0}
              canMoveDown={index != panels.length - 1}
              onMoveUp={this.movePanelUp}
              onMoveDown={this.movePanelDown}
              onSave={this.savePanel}
              onDelete={this.deletePanel}
            />
          )}
        </div>
        <div>
          <select value={this.state.addPanelType} onChange={this.addPanelTypeChanged} className="Display-add-panel-field">
            {types.order.map(type => <option key={type} value={type}>{types.types[type].label}</option>)}
          </select>&nbsp;
          <button onClick={this.addPanel}>Add</button>
        </div>
      </div>;
    } else {
      return <div>Loading...</div>;
    }
  }
}
