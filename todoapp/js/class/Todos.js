import { Task } from  "./Task.js";

class Todos {
    #tasks = []
    #backend_url = ''

    constructor(url) {
        this.#backend_url = url
    }

    getTasks = () => {
        return new Promise(async(resolve, reject) => {
            fetch(this.#backend_url)
            .then((response) => response.json()) // Fixed typo: "Response" to "response"
            .then((json) => {
                this.#readJson(json)
                resolve(this.#tasks)
            }, (error) => {
                reject(error) // Fixed typo: "rekect" to "reject"
            })
        })
    }

    #readJson = (tasksAsJson) => {
        tasksAsJson.forEach(node => {
            const task = new Task(node.id,node.description)
            this.#tasks.push(task)
        })
    }
}

export { Todos }
