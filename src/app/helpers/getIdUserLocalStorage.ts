import { IdUser } from "../types/custom.types"


export default function getIdUserLocalStorage() {
    const userStringify = localStorage.getItem('user')

    if (userStringify) {
        const user = JSON.parse(userStringify)
        return user.id as IdUser
    }
    return null
}