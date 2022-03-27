export class Section {
    constructor({ data, renderer }, containerSelector) {
        this._initiallArray = data;
        this._renderer = renderer;
        this._container = containerSelector;
    }

    renderItems() {             //твечает за отрисовку всех элементов
        this._initiallArray.forEach((item) => {
      this._renderer(item);
    });

    }

    addItem(element) {              //принимает DOM-элемент и добавляет его в контейнер.
        this._container.prepend(element);
    }
}