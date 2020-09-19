const uuid = require('uuid')
const fs = require('fs')
const path = require('path')
const {
    v4: uuidv4
} = require('uuid');
const {
    rejects
} = require('assert');
class DataBase {
    constructor(title, price, img) {
        this.title = title
        this.price = price
        this.img = img
        this.id = uuidv4()
    }
    toJson() {
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        }
    }
    async save() {
        const courses = await DataBase.getAll()

        courses.push(this.toJson())

        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, '..', 'data', 'courses.json'), JSON.stringify(courses), (er) => {

                if (er) reject(er)
                else {
                    resolve()
                }
            })
        })
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '..', 'data', 'courses.json'),
                'utf-8',
                (er, content) => {
                    if (er) {
                        reject(er)
                    } else {
                        if (content) {
                            resolve(JSON.parse(content))
                        }
                    }
                }
            )
        })
    }
}
// fs.readFile(path.join(__dirname, '../data/courses.json'), 'utf-8', (er, res) => {
//     if (er) throw er
//     else console.log(res);
// })
module.exports = DataBase