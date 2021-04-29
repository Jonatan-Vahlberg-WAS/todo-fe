import axios from 'axios'
import storageKeys from './StorageKeys'

class ApiKit {
    baseUrl = 'http://138.197.191.174/api'
    // baseUrl = 'http://localhost:8000/api'

    getConfig() {
        const token = localStorage.getItem(storageKeys.ACCESS_TOKEN ?? '')
        console.log('TOKEN', token)
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        }
        return config
    }

    obtainToken(username: string, password: string, onComplete: () => void) {
        axios
            .post(`${this.baseUrl}/token/`, { username, password })
            .then((response) => {
                const { access, refresh } = response.data
                localStorage.setItem(storageKeys.ACCESS_TOKEN, access)
                localStorage.setItem(storageKeys.REFRESH_TOKEN, refresh)
                onComplete()
            })
            .catch((error) => {
                console.warn('ERROR', error)
            })
    }

    refreshToken(onComplete: () => void) {
        const refresh = localStorage.getItem(storageKeys.REFRESH_TOKEN)
        axios
            .post(`${this.baseUrl}/token/refresh/`, { refresh })
            .then((response) => {
                const { access, refresh } = response.data
                localStorage.setItem(storageKeys.ACCESS_TOKEN, access)
                onComplete()
            })
            .catch((error) => {
                console.warn('ERROR', error)
            })
    }

    createUser(username: string, password: string, onComplete: () => void) {
        axios
            .post(`${this.baseUrl}/user/create/`, {
                username,
                password,
            })
            .then((response) => {
                if (response.status === 201) {
                    this.obtainToken(username, password, onComplete)
                }
            })
    }

    getLists(onComplete: (data: any) => void, doneOnce?: boolean) {
        axios
            .get(`${this.baseUrl}/lists/`, this.getConfig())
            .then((response) => {
                if (response.status === 200) {
                    onComplete(response.data)
                }
            })
            .catch((error) => {
                console.log('ERROR', error.response)
                if (error.response?.status === 401 && !doneOnce) {
                    this.refreshToken(() => {
                        this.getLists(onComplete, true)
                    })
                }
            })
    }

    getList(id: number, onComplete: (data: any) => void, doneOnce?: boolean) {
        axios
            .get(`${this.baseUrl}/lists/detail/${id}`, this.getConfig())
            .then((response) => {
                if (response.status === 200) {
                    onComplete(response.data)
                }
            })
            .catch((error) => {
                console.log('ERROR', error.response)
                if (error.response?.status === 401 && !doneOnce) {
                    this.refreshToken(() => {
                        this.getLists(onComplete, true)
                    })
                }
            })
    }

    createList(
        list: TaskList,
        onComplete: (data: any) => void,
        doneOnce?: boolean
    ) {
        axios
            .post(`${this.baseUrl}/lists/create/`, list, this.getConfig())
            .then((response) => {
                if (response.status === 200) {
                    onComplete(response.data)
                }
            })
            .catch((error) => {
                console.log('ERROR', error.response)
                if (error.response?.status === 401 && !doneOnce) {
                    this.refreshToken(() => {
                        this.createList(list, onComplete, true)
                    })
                }
            })
    }

    updateList(
        list: TaskList,
        onComplete: (data: any) => void,
        doneOnce?: boolean
    ) {
        axios
            .put(
                `${this.baseUrl}/lists/update/${list.id}/`,
                list,
                this.getConfig()
            )
            .then((response) => {
                if (response.status === 200) {
                    onComplete(response.data)
                }
            })
            .catch((error) => {
                console.log('ERROR', error.response)
                if (error.response?.status === 401 && !doneOnce) {
                    this.refreshToken(() => {
                        this.updateList(list, onComplete, true)
                    })
                }
            })
    }

    deleteList(listId: number, onComplete: () => void, doneOnce?: boolean) {
        axios
            .delete(`${this.baseUrl}/lists/delete/${listId}`, this.getConfig())
            .then((response) => {
                if (response.status === 200) {
                    onComplete()
                }
            })
            .catch((error) => {
                console.log('ERROR', error.response)
                if (error.response?.status === 401 && !doneOnce) {
                    this.refreshToken(() => {
                        this.deleteList(listId, onComplete, true)
                    })
                }
            })
    }
}

export default new ApiKit()
