
function Events(){
    const callbacks = [];
    this.addCallback = (callback) => {
        callbacks.push(callback);
    },
    this.removeCallback = (callback) => {
        callbacks.push(callback);
    }
    this.listenToEvent = (event) => {
        callbacks.forEach(callback => {
            callback(event);
        })
    }
}
const globalClickEvent = new Events();
document.addEventListener('click', globalClickEvent.listenToEvent);
function SingleElement(elementName){
    const name = elementName;
    this.createElement = () => {
        let element = document.createElement('div');
        let iFrameElement = document.createElement('iframe');
        let buttonEle = document.createElement('button');
        buttonEle.textContent = 'Open Pen';
        iFrameElement.src = `/${name}`;
        function onClick(e){
            if(e.target === buttonEle){
                document.location.href = `/${name}`
            }
        }
        globalClickEvent.addCallback(onClick);
        element.appendChild(iFrameElement);
        element.appendChild(buttonEle);
        return element;
    }
}

function createElements(names){
    const wholeParent = document.createElement('div');
    names.forEach(name => {
        const element = new SingleElement(name);
        wholeParent.appendChild(element.createElement());
    });
    return wholeParent;
}

const wholeParent = createElements(folders);
document.body.appendChild(wholeParent);
