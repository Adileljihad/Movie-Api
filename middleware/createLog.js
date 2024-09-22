import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);

const createLog = (req, res, next) => {
    const { method, url } = req;
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    hour = hour < 10 ? `0${hour}` : hour;
    minute = minute < 10 ? `0${minute}` : minute;
    second = second < 10 ? `0${second}` : second;

    const message = `${chalk.blue(
        `${year}-${month}-${day}  |  ${hour}:${minute}:${second}`
    )} | ${chalk.green(method)}- ${chalk.yellow(url)} `;
    console.log(message);

    const log = `${year}-${month}-${day}  |  ${hour}:${minute}:${second} | ${method}- ${url}\n`;
    fs.appendFile(path.join(PATH, '..', 'logs', 'logs.txt'), log, (err) => {
        if (err) {
            console.error(err); // Handle errors, e.g. write to a file
        }
    });

    next();
};

export default createLog;
