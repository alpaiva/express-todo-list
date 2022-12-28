const fs = require('fs');
const Task = require('../model/Task');
const DB_FILE = './api/db-tasks.db';

const getAll = function getAll() {
    return new Promise(
        (resolve) => {
            let taskList = [];
            fs.readFile(DB_FILE, 'utf-8', (err, data) => {
                if (err) {
                    throw new Error('File error on read');
                }
                let registers = data.split('\n');
                registers = registers.slice(0, registers.length - 1);
                taskList = registers.map((register) => {
                    let fields = register.split('|');

                    return new Task.Task(
                        fields[0],
                        fields[1],
                        fields[2],
                        fields[3],
                        fields[4],
                        fields[5]
                    );
                });
                resolve(taskList);
            });
        },
        (reject) => reject('err')
    );
};

const save = function save(task) {
    let register = task.flat(task);

    return new Promise(
        (resolve) => {
            fs.appendFile(DB_FILE, register + '\n', (err) => {
                if (err) {
                    throw new Error('error on post task');
                }
                resolve(task);
            });
        },
        (reject, err) => reject(err)
    );
};

module.exports = { getAll, save };
