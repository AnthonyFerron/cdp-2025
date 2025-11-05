

export type ProgrammingLanguageDb = {
    id_language: number
    name: string
    is_public: boolean
}

export type ProgrammingLanguage = {
    idLanguage: number
    name: string
    isPublic: boolean
}

export type ProgrammingLanguageCreateDto = {
    name?: unknown
    isPublic?: unknown
}

export type ProgrammingLanguageDeleteDto = {
    idLanguage?: unknown
}