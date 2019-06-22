import React, {Component} from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const CropperInput = ({imagePreview, setImage}) => {
  let cropper = React.useRef(null);

  const cropImage = () => {
    if (!cropper.current) {
      return;
    } else {
      cropper.current.getCroppedCanvas().toBlob(blob => setImage(blob), 'image/jpeg');
    }
  }

  return (
    <Cropper
      ref={cropper}
      src={imagePreview}
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
      crop={cropImage}/>
  );
}

export default CropperInput;
