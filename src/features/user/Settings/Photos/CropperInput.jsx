import React, {Component} from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

class CropperInput extends Component {
  cropper = React.createRef();

  cropImage = () => {
    if (!this.cropper.current) {
      return;
    } else {
      this.cropper.current.getCroppedCanvas().toBlob(blob => this.props.setImage(blob), 'image/jpeg');
    }
  }

  render() {
    return (
      <Cropper
        ref={this.cropper}
        src={this.props.imagePreview}
        style={{height: 200, width: '100%'}}
        // Cropper.js options
        preview="#image-preview"
        aspectRatio={1}
        viewMode={1}
        dragMode="move"
        guides={false}
        scalable={true}
        cropBoxMovable={true}
        cropBoxResizable={true}
        crop={this.cropImage} />
    );
  }
}

export default CropperInput;
