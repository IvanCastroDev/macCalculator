/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';
import { statusList } from './resources/configs';

console.log('👋 This message is being logged by "renderer.ts", included via Vite');

const total_value = document.getElementById("total");
const digits_container = document.getElementById("digits");
const buttons = document.querySelectorAll(".button");
let reset_button = document.getElementById("resetButton");
let delete_button = document.getElementById("delButton");
const equal_button = document.getElementById("equalButton");
const last_operation_display = document.getElementById("last_operation");

let status = statusList.STARTED;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        addValue(button);
    })
});

const addValue = (button: Element) => {
    if ((status === statusList.STARTED || status === statusList.RESULT) && !button.className.includes("operator")) {
        total_value.textContent = button.textContent;
        status = statusList.TIPING;
    } else {
        total_value.textContent += button.textContent;
    }

    render_touglest_elements();
}

const delKey = () => {
    if (total_value.textContent.length > 1) {
        total_value.textContent = total_value.textContent.substring(0, total_value.textContent.length - 1);
    } else {
        total_value.textContent = "0";
        status = statusList.STARTED;
        render_touglest_elements();
    }
};

const reset = () => {
    total_value.textContent = "0";
    last_operation_display.textContent = "";
    status = statusList.STARTED;
};

const render_touglest_elements = () => {
    if (status != statusList.TIPING && !reset_button) {
        reset_button = create_element("button", ["aux"], "reset_button", "AC", "click", reset);
        replace_element(reset_button, delete_button, digits_container);
        delete_button = null;
    } else if (status == statusList.TIPING && !delete_button) {
        delete_button = create_element("button", ["aux"], "delete_button", "«", "click", delKey);
        replace_element(delete_button, reset_button, digits_container);
        reset_button = null;
    }
}

const replace_element = (newElement: HTMLElement, replacedElement: HTMLElement, container: HTMLElement) => {
    container.replaceChild(newElement, replacedElement);
};

const create_element = (type: string, classes: string[], id: string, textContent: string, eventCallback: string, callback: () => void) => {
    const new_element = document.createElement(type);
    classes.map(cls => new_element.className += " " + cls);

    new_element.id = id ? id : undefined;

    new_element.textContent = textContent;
    new_element.addEventListener(eventCallback, callback);

    return new_element;
};

const getEqual = () => {
    if (status === statusList.STARTED || status === statusList.RESULT)
        return;
     
    let aux = total_value.textContent;
    total_value.textContent = eval(total_value.textContent);
    last_operation_display.textContent = aux;
    status = statusList.RESULT;
    render_touglest_elements();
};

const render_data = () => {
    reset_button.addEventListener("click", reset);
    equal_button.addEventListener("click", getEqual);
};

render_data();