const children = (xmlNode, attributeName = 'innerHTML') => Array.from(xmlNode.children).map(child => child[attributeName]);

const element = ({name, className = undefined, children = undefined} = {}) => {
    let el = document.createElement(name),
        isString = (value) => value instanceof String || typeof value === 'string';
    if (className) {
        el.className = className;
    }
    if (children) {
        children = children instanceof Array ? children : [children];
        children.forEach(value => {
            if (isString(value)) {
                el.innerHTML = value;
            } else {
                el.appendChild(value);
            }
        });
    }
    return el;
};

const cell = (values, name = 'td') => element({name: name, classList: 'mdl-data-table__cell', children: values});

const createTable = (xmlData, dataIsUniform = true) => {
    // Initialization
    let columnNames = new Set([]), header, body,
        table = element({
            name: 'table',
            className: 'mdl-data-table mdl-js-data-table mdl-shadow--2dp'
        });

    if (dataIsUniform) {
        columnNames = new Set(children(xmlData[0], 'nodeName'));
    } else {
        xmlData.forEach(dataNode => columnNames.add(dataNode.nodeName));
    }

    // Generating Table's Header HTML
    header = element({
        name: 'thead',
        children: element({
            name: 'tr',
            children: Array.from(columnNames).map(column => cell(column, 'th'))
        })
    });
    table.appendChild(header);

    // Generating Table's Body HTML
    console.log(dataIsUniform);
    if (dataIsUniform) {
        body = element({
            name: 'tbody',
            children: xmlData.map(row => element({
                name: 'tr',
                children: children(row).map(child => cell(child))
            }))
        });
    } else {
        body = element({
            name: 'tbody',
            children: Array(xmlData.length / columnNames.size).fill().map(_ => {
                console.log(1);
                return element({
                    name: 'tr',
                    children: Array(columnNames.size).fill().map(_ => element({
                        name: 'td',
                        children: xmlData.shift().innerHTML
                    }))
                })
            })
        });
    }
    table.appendChild(body);
    return table;
};