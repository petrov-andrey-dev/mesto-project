export default class Section {
    constructor(renderer, container) {
        this._renderer = renderer;
        this._container = container;
    }

    addItem(element, position) {
        if (position === 'append') {
            this._container.append(element);
        } else if (position === 'prepend') {
            this._container.prepend(element);
        }
        
    }

    _clear() {
        this._container.innerHTML = '';
    } 

    renderItems(items) {
        items.reverse().forEach(item => this._renderer({ data: item, position: 'prepend'}))
    }
}

