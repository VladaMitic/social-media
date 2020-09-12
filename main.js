class Link {
    constructor (title, url, author) {
        let absoluteUrl = url;
        if (!absoluteUrl.startsWith("http://") && !absoluteUrl.startsWith("https://")) {
            absoluteUrl = `http://${absoluteUrl}`;
        }
        this.title = title;
        this.url = absoluteUrl;
        this.author = author;
    };
    toString() {
        return `${this.title}, (${this.url}). Author:${this.author}`;
    }
}
const contentElement = document.getElementById("content");
const createLinkElement = link => {
    //creating element for link title
    const titleElement = document.createElement("a");
    titleElement.href = link.url;
    titleElement.classList.add("title");
    titleElement.textContent = link.title;
    //creating element for link url
    const urlElement = document.createElement("span");
    urlElement.classList.add("url");
    urlElement.textContent = link.url;
    //creating heading to put together title and url
    const headlineElement = document.createElement("h4");
    headlineElement.classList.add("headline");
    headlineElement.appendChild(titleElement);
    headlineElement.appendChild(urlElement);
    //creating elemet for author
    const authorElement = document.createElement("p");
    authorElement.classList.add("author");
    authorElement.textContent = `Submmited by: ${link.author}`;
    //creating element for whole link
    const linkElement = document.createElement("div");
    linkElement.classList.add("link");
    linkElement.appendChild(headlineElement);
    linkElement.appendChild(authorElement);
    return linkElement;
}
//create input element with function
const createInputElement = (name, placeholder, size) => {
    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.setAttribute("name", name);
    inputElement.setAttribute("placeholder", placeholder);
    inputElement.setAttribute("size", size);
    inputElement.setAttribute("required", "true");
    inputElement.classList.add("input");
    return inputElement;
}
//creating form element using input element function for each input
const createFormElement = () => {
    const titleElement = createInputElement("title", "Eneter link title", "20");
    const urlElement = createInputElement("url", "Eneter link url", "20");
    const authorElement = createInputElement("author", "Enter author name", "20");
    //create subbmit buttom for adding new link
    const addButton = document.createElement("input");
    addButton.type = "submit";
    addButton.value = "Add link";
    addButton.classList.add("addbutt");
    const formElement = document.createElement("form");
    //creating form element
    formElement.classList.add("form");
    formElement.appendChild(titleElement);
    formElement.appendChild(urlElement);
    formElement.appendChild(authorElement);
    formElement.appendChild(addButton);
    //create event on form on subbmit
    formElement.addEventListener("submit", e => {
        e.preventDefault;
        //creating new link object from input values
        const newLink = new Link (titleElement.value, urlElement.value, authorElement.value);
        const newLinkElement = createLinkElement(newLink);
        //replacing from with link
        contentElement.replaceChild(newLinkElement, e.target);
        //creating info message with succesfull added link
        const infoElement = document.createElement("div");
        infoElement.classList.add("info");
        infoElement.textContent = `The link ${newLink.title} has been succesfully added!!!`;
        contentElement.insertBefore(infoElement, newLinkElement);
        //remove info mesage after 2 seconds
        setTimeout(() => {
            contentElement.removeChild(infoElement)
        }, 4000);
    });
    return formElement;
}
//creating array with links
const links = [];
links.push(new Link("Stonemaier games", "https://stonemaiergames.com", "Vlada"));
links.push(new Link("Mantic games", "www.manticgames.com", "Vlada"));
links.push(new Link("Cephalofair Games", "http://www.cephalofair.com", "Sandra"));
//add each link to page
links.forEach(link => {
    const linkElement = createLinkElement(link);
    contentElement.appendChild(linkElement);
})
const submitButtonElement = document.getElementById("button");
submitButtonElement.addEventListener("click", e => {
    const firstLink = document.querySelector(".link");
    const formElement = createFormElement();
    contentElement.insertBefore(formElement, firstLink);
})