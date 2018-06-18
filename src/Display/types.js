import ImageEditor from './editors/ImageEditor';
import PageEditor from './editors/PageEditor';

const types = {
  order: ['image', 'page'],
  types: {
    image: {
      label: 'Image',
      editor: ImageEditor
    },
    page: {
      label: 'Web page',
      editor: PageEditor
    }
  }
};

export default types;
