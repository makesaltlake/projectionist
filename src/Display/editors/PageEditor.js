import React, { Component } from 'react';

import { Field } from 'react-final-form';

export default class PageEditor extends Component {
  render() {
    return <React.Fragment>
      <Field component="input" type="text" name="url" placeholder="Page URL" parse={null}/>
    </React.Fragment>;
  }
}
