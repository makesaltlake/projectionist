import React, { Component } from 'react';

import { storage } from '../../firebase';
import { DateTime } from 'luxon';

import { Field } from 'react-final-form';

export default class ImageEditor extends Component {
  state = {
    uploading: false,
    currentImageUrl: null,
    loadingCurrentImage: false
  }

  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
    this.currentImageName = null;
  }

  fileInputChanged = async (event) => {
    let file = event.target.files[0];
    this.setState({uploading: true});

    let filename = `${DateTime.local().toISO()}-${Math.random()}-${file.name}`;
    let ref = storage.ref().child('displays').child(this.props.displayId).child('images').child(filename);
    await ref.put(file);

    this.setState({uploading: false});
    this.onChange(filename);
  }

  uploadImage = (event) => {
    event.preventDefault();
    this.fileInputRef.current.click();
  }

  changeImage = (event) => {
    event.preventDefault();
    this.fileInputRef.current.click();
  }

  setCurrentImageName = (imageName) => {
    if (imageName != this.currentImageName) {
      this.currentImageName = imageName;
      if (imageName) {
        this.setState({loadingCurrentImage: true});
        let ref = storage.ref().child('displays').child(this.props.displayId).child('images').child(imageName);
        ref.getDownloadURL().then(url => {
          // make sure this is still the image we want before setting the URL
          if (this.currentImageName == imageName) {
            this.setState({currentImageUrl: url, loadingCurrentImage: false});
          }
        });
      } else {
        this.setState({currentImageUrl: null, loadingCurrentImage: false});
      }
    }
  }

  render() {
    return <React.Fragment>
      <input type="file" name="imageUrl" ref={this.fileInputRef} style={{display: 'none'}} onChange={this.fileInputChanged}/>
      <Field
        type="text"
        name="imageUrl"
        placeholder="Image URL"
        parse={null}
        currentImageUrl={this.state.currentImageUrl}
        loadingCurrentImage={this.state.loadingCurrentImage}
        uploading={this.state.uploading}
      >
        {({input: {value, onChange}, currentImageUrl, loadingCurrentImage, uploading}) => {
          this.onChange = onChange;
          this.setCurrentImageName(value);

          if (uploading) {
            return <div>Uploading...</div>;
          } else if (loadingCurrentImage) {
            return <div>Loading...</div>;
          } else if (currentImageUrl) {
            return <div>
              <img className="ImageEditor-image" src={currentImageUrl}/>
              <button onClick={this.changeImage}>Change Image</button>
            </div>;
          } else {
            return <div>
              <button onClick={this.uploadImage}>Upload Image</button>
            </div>;
          }
        }}
      </Field>
    </React.Fragment>;
  }
}
