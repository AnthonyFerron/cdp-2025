

export default class CrudError extends Error {
    
    constructor(message: string, err: string) {
        super(`Crud error: ${message} ${err}`)
    }
}