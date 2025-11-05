"use client"
import { ProgrammingLanguage } from "@/app/models/programmingLanguage.model"
import createProgrammingLanguage from "@/app/requests/admin/programmingLanguage/createProgrammingLanguage"
import deleteProgrammingLanguage from "@/app/requests/admin/programmingLanguage/deleteProgrammingLanguage"
import getProgrammingLanguages from "@/app/requests/user/programmingLanguage/getProgrammingLanguages"
import { IdLanguage } from "@/app/types/custom.types"
import { useEffect, useState } from "react"


export default function ProgrammingLanguagePage() {

    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const [isPublic, setIsPublic] = useState(false)
    const [idLanguage, setIdLanguage] = useState('')
    const [programmingLanguages, setProgrammingLanguages] = useState<ProgrammingLanguage[]>([])

    const loadProgrammingLanguages = async () => {
        const res = await getProgrammingLanguages()
        if (res) {
            setProgrammingLanguages(res)
        } else {
            setError('Erreur lors du chargement des programmingLanguages')
        }
    }

    useEffect(() => {
        loadProgrammingLanguages()
    }, [])

    const createProgrammingLanguageSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        if (name) {

            const data = {
                name,
                isPublic
            }

            const res = await createProgrammingLanguage(data)
            if (res.ok) {
                setName('')
                setIsPublic(false)
                await loadProgrammingLanguages()
            } else {
                setError('Erreur lors de la création')
            }
        } else {
            setError('Entrer un nom de language')
        }
    }

    const deleteProgrammingLanguageSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        if (idLanguage) {
            const res = await deleteProgrammingLanguage({ idLanguage: parseInt(idLanguage) as IdLanguage })
            if (res.ok) {
                setIdLanguage('')
                await loadProgrammingLanguages()
            } else {
                setError('Erreur lors de la suppression')
            }
        } else {
            setError('Entrer un idLanguage')
        }
    }

    return (
        <div>
            {
                error && (
                    <p className='text-red-500 text-xl'>{error}</p>
                )
            }
            <form onSubmit={createProgrammingLanguageSubmit}>
                <input
                    type='text'
                    value={name}
                    placeholder='Enter name'
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type='checkbox'
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                />
                <button type="submit">Create</button>
            </form>

            <form onSubmit={deleteProgrammingLanguageSubmit}>
                <input
                    type='text'
                    value={idLanguage}
                    placeholder='Enter idLanguage'
                    onChange={(e) => setIdLanguage(e.target.value)}
                />
                <button type="submit">Delete</button>
            </form>

            {
                programmingLanguages.map(lang => (
                    <div key={lang.idLanguage} className="flex flex-row items-center">
                        <p>IdLanguage: { lang.idLanguage }</p>
                        <p>Name: { lang.name }</p>
                        <p>Is public: { String(lang.isPublic) }</p>
                    </div>
                ))
            }
        </div>
    )
}