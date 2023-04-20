import View from './View';
import previewView from './previewView';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :) ';

  _generateMarkup() {
    return this._data.map(previewView._generateMarkup).join('');
  }
}

export default new BookmarksView();
