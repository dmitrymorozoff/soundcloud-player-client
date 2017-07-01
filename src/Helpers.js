function createElement(props, ...children) {
    const element = document.createElement(props.tag);
    element.classList.add(...props.classList);
    Object.keys(props).forEach(key => {
        if (key.startsWith("data-")) {
            element.setAttribute(key, props[key]);
        }
    });
    for (let item of children) {
        element.appendChild(item);
    }

    return element;
}

export { createElement };