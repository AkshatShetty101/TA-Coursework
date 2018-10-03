const children = (xmlNode, attributeName = 'innerHTML') => Array.from(xmlNode.children).map(child => child[attributeName]);

const element = ({
    name,
    className = undefined,
    children = undefined
} = {}) => {
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

const cell = (values, name = 'td') => element({
    name: name,
    className: 'mdl-data-table__cell',
    children: values
});

const createOrderTable = (data, boot, person) => {
    table = element({
        name: 'table',
        className: 'mdl-data-table mdl-js-data-table mdl-shadow--2dp'
    });
    table.appendChild(element({
        name:'tr',
        children: [cell(`Name: ${person.name}`,'th'),cell(``,'td'),cell(`Email: ${person.email}`,'th')]
    }))
    total = 0;
    for (key in data) {
        orderId = data[key].id;
        let head = element({
            name: 'tr',
            children: ['Name', 'Description', 'Cost'].map(d => cell(d.toString(), 'th'))
        });
        let body = []
        for (k1 in data[key].boots) {
            b = data[key].boots[k1];
            total += boot[b.id].cost * b.quantity;
            body.push(element({
                name: 'tr',
                children: [boot[b.id].name, boot[b.id].description, '$' + boot[b.id].cost * b.quantity].map(d => cell(d.toString(), 'td'))
            }));
        }
        table.appendChild(element({
            name: 'tr',
            classList: 'mdl-data-table__cell',
            children: [cell(``, 'td'),cell(`OrderID: ${orderId}`, 'th'),cell(``, 'td')]

        }));
        table.appendChild(head);
        for(b of body)
        table.appendChild(b);
    }
    table.appendChild(element({
        name: 'tr',
        classList: 'mdl-data-table__cell',
        children: cell(`Total: $${total}`, 'th')
    }));
    return (table);
}


const createTable = (xmlData, dataIsUniform = true) => {
    // Initialization
    let columnNames = new Set([]),
        header, body,
        table = element({
            name: 'table',
            className: 'mdl-data-table mdl-js-data-table mdl-shadow--2dp'
        });
    console.log(xmlData);
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