"use client"
import { CourseSection } from "@/app/models/courseSection.model";
import createCourseSection from "@/app/requests/admin/courseSection/createCourseSection";
import deleteCourseSection from "@/app/requests/admin/courseSection/deleteCourseSection";
import updateCourseSection from "@/app/requests/admin/courseSection/updateCourseSection";
import getCourseSections from "@/app/requests/user/courseSection/getCourseSections";
import { IdCourse, IdCourseSection } from "@/app/types/custom.types";
import { useEffect, useState } from "react";


export default function CourseSectionPage() {

    const [error, setError] = useState('')
    const [courseSections, setCourseSections] = useState<CourseSection[]>([])

    const [title, setTitle] = useState('')
    const [code, setCode] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState('')
    const [orderBy, setOrderBy] = useState(0)

    const loadCourseSections = async () => {
        setError('')
        const idCourse = new URL(document.URL).searchParams.get('idCourse')

        if (idCourse) {
            const res = await getCourseSections(parseInt(idCourse) as IdCourse)
    
            if (res) {
                setCourseSections(res)
            } else {
                setError('Erreur lors du chargement des sections')
            }
        } else {
            setError('Erreur chargement course sections')
        }
    }

    useEffect(() => {
        loadCourseSections()
    }, [])

    const deleteSection = async (idCourseSection: IdCourseSection) => {
        setError('')
        const res = await deleteCourseSection({ idCourseSection })
        if (res.ok) {
            const idCourse = new URL(document.URL).searchParams.get('idCourse')
            if (idCourse) {
                loadCourseSections()
            }
        } else {
            setError('Erreur lors de la suppression de la section')
        }
    }

    const updateSection = async (idCourseSection: IdCourseSection) => {
        setError('')
        const section = courseSections.find(section => section.idCourseSection === idCourseSection)
        if (section) {
            const res = await updateCourseSection(section)
            if (res.ok) {
                loadCourseSections()
            } else {
                setError('Erreur update section')
            }
        }
    }

    const handleEditTitle = (value: string, idCourseSection: IdCourseSection) => {
        setCourseSections(prev => {
            return prev.map(p => {
                if (p.idCourseSection === idCourseSection) {
                    return {
                        ...p,
                        title: value
                    }
                }
                return p
            })
        })
    }

    const handleEditImage = (value: string, idCourseSection: IdCourseSection) => {
        setCourseSections(prev => {
            return prev.map(p => {
                if (p.idCourseSection === idCourseSection) {
                    return {
                        ...p,
                        image: value
                    }
                }
                return p
            })
        })
    }

    const handleEditContent = (value: string, idCourseSection: IdCourseSection) => {
        setCourseSections(prev => {
            return prev.map(p => {
                if (p.idCourseSection === idCourseSection) {
                    return {
                        ...p,
                        content: value
                    }
                }
                return p
            })
        })
    }

    const handleEditCode = (value: string, idCourseSection: IdCourseSection) => {
        setCourseSections(prev => {
            return prev.map(p => {
                if (p.idCourseSection === idCourseSection) {
                    return {
                        ...p,
                        code: value
                    }
                }
                return p
            })
        })
    }

    const handleEditOrderBy = (value: number, idCourseSection: IdCourseSection) => {
        setCourseSections(prev => {
            return prev.map(p => {
                if (p.idCourseSection === idCourseSection) {
                    return {
                        ...p,
                        orderBy: value
                    }
                }
                return p
            })
        })
    }

    const createSection = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        const idCourse = new URL(document.URL).searchParams.get('idCourse')

        if (courseSections.some(e => e.orderBy === orderBy)) {
            setError('OrderBy deja utilisé')
            return
        }

        if (title && content && orderBy && idCourse) {
            const data = {
                title,
                image,
                content,
                orderBy,
                idCourse: parseInt(idCourse) as IdCourse,
                code
            }

            const res = await createCourseSection(data)
            if (res.ok) {
                loadCourseSections()
            } else {
                setError('Erreur creation de section')
            }

        } else {
            setError('Compléter tous les champs')
        }
    }

    return (
        <div className="p-6 max-w-3xl mx-auto space-y-8 bg-white shadow rounded-2xl">
        {error && <p className="text-red-500 text-lg font-medium">{error}</p>}

        {courseSections.map((section) => (
            <div
            key={section.idCourseSection}
            className="p-4 border border-gray-200 rounded-xl bg-gray-50 shadow-sm space-y-4"
            >
            <h2 className="text-lg font-semibold text-gray-800">
                Section {section.orderBy}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Title"
                    className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                    value={courseSections.find((s) => s.idCourseSection === section.idCourseSection)?.title}
                    onChange={(e) => handleEditTitle(e.target.value, section.idCourseSection)}
                />

                <input
                    type="text"
                    placeholder="Image"
                    className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                    value={courseSections.find((s) => s.idCourseSection === section.idCourseSection)?.image}
                    onChange={(e) => handleEditImage(e.target.value, section.idCourseSection)}
                />

                <input
                    type="numeric"
                    placeholder="Orbder By"
                    className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                    value={courseSections.find((s) => s.idCourseSection === section.idCourseSection)?.orderBy || 0}
                    onChange={(e) => handleEditOrderBy(parseInt(e.target.value), section.idCourseSection)}
                />
            </div>

            <textarea
                placeholder="Content"
                className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                value={courseSections.find((s) => s.idCourseSection === section.idCourseSection)?.content}
                onChange={(e) => handleEditContent(e.target.value, section.idCourseSection)}
            />

            <textarea
                placeholder="Code"
                className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                value={courseSections.find((s) => s.idCourseSection === section.idCourseSection)?.code}
                onChange={(e) => handleEditCode(e.target.value, section.idCourseSection)}
            />

            <div className="flex gap-3 justify-end">
                <button
                onClick={() => updateSection(section.idCourseSection)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                Update
                </button>
                <button
                onClick={() => deleteSection(section.idCourseSection)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                Delete Section
                </button>
            </div>
            </div>
        ))}

        <form
            onSubmit={createSection}
            className="space-y-4 border-t pt-6 mt-6 border-gray-200"
        >
            <h3 className="text-lg font-semibold text-gray-800">Add New Section</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
                type="text"
                placeholder="Title"
                className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                type="text"
                placeholder="Image"
                className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                value={image}
                onChange={(e) => setImage(e.target.value)}
            />

            <input
                type="number"
                placeholder="OrderBy"
                className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                value={orderBy}
                onChange={(e) => setOrderBy(e.target.value ? parseInt(e.target.value) : 0)}
            />
            </div>

            <textarea
                placeholder="Content"
                className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <textarea
                placeholder="Code"
                className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />

            <div className="flex justify-end">
            <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
                Create
            </button>
            </div>
        </form>
        </div>
    );
}