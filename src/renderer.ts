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

const total_state = document.getElementById("total");
const state_element = document.getElementById("stateToggle");
const digits_element = document.getElementById("digits");

let status = statusList["STARTED"];

const render_data = () => {
    digits.forEach((digit) => {
        const button = document.createElement("button");
        button.classList.add("numeral_button");
        button.innerText = digit.toString();

        button.addEventListener("click", () => {
            if (status === statusList.STARTED) {
                total_state.innerHTML = digit.toString();
                status = statusList.TIPING;
                return;
            };
            total_state.innerHTML += digit.toString();
            return;
        });

        digits_element.appendChild(button);
    });
};

render_data();