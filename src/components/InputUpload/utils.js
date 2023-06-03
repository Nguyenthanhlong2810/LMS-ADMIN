import { MegaByteToByte } from 'helpers';
import { IMAGE_ACCEPT } from 'consts';
import { isEmpty } from 'lodash';

export const isFileSizeValid = (file, maxSize) => {
  return !maxSize || file.size <= MegaByteToByte(maxSize);
};
export const isFileAccepted = (file, accept) => {
  const transferAccept = accept.map((type) => {
    switch (type) {
      case '.png':
      case '.jpg':
      case '.jpeg':
        return 'image/' + type.slice(1);
      case '.docx':
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      case '.doc':
        return 'application/msword';
      case '.pdf':
        return 'application/pdf';
      case '.mp4':
        return 'video/mp4';
      default:
        return type;
    }
  });
  return !accept.length || transferAccept.includes(file.type);
};
export const isDimensionsValid = (file, acceptDimensions) => {
  if (IMAGE_ACCEPT?.includes(file.type) && !isEmpty(acceptDimensions)) {
    const img = new Image();
    img.src = window.URL.createObjectURL(file);
    const promise = new Promise((resolve, reject) => {
      img.onload = () => {
        if (img.width < acceptDimensions.width || img.height < acceptDimensions.height) {
          resolve(false);
        }
        resolve(true);
      };
      // Reject promise on error
      img.onerror = reject;
    });
    return promise;
  }
  return true;
};
