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
import { digits, statusList } from './resources/configs';

console.log('👋 This message is being logged by "renderer.ts", included via Vite');

const total_value = document.getElementById("total");
const state_element = document.getElementById("stateToggle");
const digits_container = document.getElementById("digits");
const buttons = document.querySelectorAll(".button");
let reset_button = document.getElementById("resetButton");
let delete_button = document.getElementById("delButton");
const total_digit = 0;

let status = statusList.STARTED;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        addValue(button);
    })
});

const addValue = (button: Element) => {
    if (status === statusList.STARTED || status === statusList.RESULT) {
        total_value.innerHTML = button.innerHTML;
        status = statusList.TIPING;
    } else {
        total_value.innerHTML += button.innerHTML;
    }

    render_touglest_elements();
}

const delKey = () => {
    if (total_value.innerHTML.length > 1) {
        console.log(total_value.innerHTML.length)
        total_value.innerHTML = total_value.innerHTML.substring(0, total_value.lang.length - 1);
    } else {
        total_value.innerHTML = "0";
        status = statusList.STARTED;
    }
};

const reset = () => {
    total_value.innerHTML = "0";
    status = statusList.STARTED;
};

const render_touglest_elements = () => {
    if (status != statusList.TIPING && !reset_button) {
        reset_button = create_element("button", ["aux", "button"], "reset_button");
        reset_button.addEventListener("click", reset);
        reset_button.innerHTML = "AC";
        replace_element(reset_button, delete_button, digits_container);
    } else if (status == statusList.TIPING) {
        delete_button = create_element("button", ["aux", "button"], "delete_button");
        delete_button.addEventListener("click", delKey);
        reset_button.innerHTML = "DEL";
        replace_element(delete_button, reset_button, digits_container);
    }
}

const replace_element = (newElement: HTMLElement, replacedElement: HTMLElement, container: HTMLElement) => {
    container.replaceChild(newElement, replacedElement);
};

const create_element = (type: string, classes: string[], id: string) => {
    const new_element = document.createElement(type);
    classes.map(cls => new_element.className += " " + cls);

    new_element.id = id;

    return new_element;
};

const render_data = () => {
    reset_button.addEventListener("click", reset);
};

render_data();