/* JS File */

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
function SingleElement(folderName){
    const name = folderName;
    this.createElement = () => {
        /*
            <div class="iframeParent">
                <iframe class="iframe" src='http://localhost:3000/newpen'></iframe>
                <a class='iframeLink' href="/sample">
                    
                </a>
                <h3>
                    Sample
                </h3>
            </div> 
        */
       const iframeParent = document.createElement('div');
       const iframeElement = document.createElement('iframe');
       const iframeLink = document.createElement('a');
       const heading = document.createElement('h3');
       
       iframeParent.className = 'iframeParent';
       iframeElement.className = 'iframe';
       iframeLink.className = 'iframeLink';
       heading.className = 'pentitle';
    
       const src =  '/' + folderName;
       iframeElement.src = src;
       iframeLink.href = src;
       heading.textContent = folderName; // Need to replace with a valid title
       
       iframeParent.appendChild(iframeElement);
       iframeParent.appendChild(iframeLink);
       iframeParent.appendChild(heading);
       
       return iframeParent;
    }
}

function createElements(names){
    const wholeParent = document.createElement('div');
    names.forEach(name => {
        const element = new SingleElement(name);
        wholeParent.appendChild(element.createElement());
    });
    wholeParent.className = 'codepen';
    return wholeParent;
}

const iframeParent = createElements(folders);
const rootEle = document.getElementById('root')
rootEle.appendChild(iframeParent);

