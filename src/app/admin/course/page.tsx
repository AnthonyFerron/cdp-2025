"use client"
import { Course } from '@/app/models/course.model'
import createCourse from '@/app/requests/admin/course/createCourse'
import deleteCourse from '@/app/requests/admin/course/deleteCourse'
import updateCourse from '@/app/requests/admin/course/updateCourse'
import getCourse from '@/app/requests/user/course/getCourse'
import getCourses from '@/app/requests/user/course/getCourses'
import { IdCourse, IdLanguage } from '@/app/types/custom.types'
import React, { useEffect, useState } from 'react'


export default function CoursePage() {

	const [error, setError] = useState('')

	const [title, setTitle] = useState('')
	const [slug, setSlug] = useState('')
	const [difficulty, setDifficulty] = useState(1)
	const [isPublished, setIsPublished] = useState(false)
	const [estimatedTime, setEstimatedTime] = useState(0)
	const [idLanguage, setIdLanguage] = useState<number | undefined>(undefined)

	const [courses, setCourses] = useState<Course[]>([])
	const [courseSelected, setCourseSelected] = useState<Course | null>(null)

	const loadCourses = async () => {
		setError('')
		const response = await getCourses()

		if (response) {
			setCourses(response)
		} else {
			setError('Erreur lors de la récupération des courses')
		}
	}

	const loadCourse = async () => {
		setError('')
		const idCourse = new URL(document.URL).searchParams.get('idCourse')

		if (idCourse) {
			const response = await getCourse(parseInt(idCourse) as IdCourse)
			if (response) {
				setCourseSelected(response)
			} else {
				setError('Erreur lors de la récupération du cours séléctionner')
			}
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')

		if (title && slug && difficulty && estimatedTime && idLanguage) {

			const data = {
				title,
				slug,
				difficulty,
				estimatedTime,
				idLanguage: idLanguage as IdLanguage,
				isPublished
			}

			if (courseSelected) {
				const res = await updateCourse({ ...data, idCourse: courseSelected.idCourse })
				if (res.ok) {
					loadCourses()
					document.location.href = `/admin/course`
				} else {
					setError('Erreur lors de la mise a jour du cours')
				}
			} else {
				const res = await createCourse(data)
				if (res.ok) {
					loadCourses()
				} else {
					setError('Erreur lors de la création du cours')
				}
			}
		} else {
			setError('Veuillez vérifier les informations')
		}
	}

	const handleDelete = async () => {
		setError('')
		if (courseSelected) {
			const res = await deleteCourse({
				idCourse: courseSelected.idCourse
			})

			if (res.ok) {
				loadCourses()
			} else {
				setError('Erreur lors de la suppression du cours')
			}
		}
	}

	useEffect(() => {
		loadCourses()
		loadCourse()
	}, [])

	useEffect(() => {
		if (courseSelected) {
			setTitle(courseSelected.title)
			setSlug(courseSelected.slug)
			setDifficulty(courseSelected.difficulty)
			setEstimatedTime(courseSelected.estimatedTime)
			setIsPublished(courseSelected.isPublished)
			setIdLanguage(courseSelected.idLanguage)
		}
	}, [courseSelected])

	const editCourse = (idCourse: IdCourse) => {
		document.location.href = `/admin/course?idCourse=${idCourse}`
	}

	const editCourseSections = (idCourse: IdCourse) => {
		document.location.href = `/admin/courseSection?idCourse=${idCourse}`
	}

	return (
		<div className="p-6 max-w-3xl mx-auto bg-white shadow rounded-2xl space-y-8">
			{error && (
				<p className="text-red-500 text-lg font-medium">{error}</p>
			)}

			{courseSelected && (
			<div className="flex justify-end">
				<button
					onClick={handleDelete}
					className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
					>
					Delete
				</button>
			</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

				<div>
					<p>Title</p>
					<input
						type="text"
						placeholder="Title"
						className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>

				<div>
					<p>Slug</p>
					<input
						type="text"
						placeholder="Slug"
						className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
						value={slug}
						onChange={(e) => setSlug(e.target.value)}
					/>
				</div>

				<div>
					<p>Difficulty</p>
					<input
						type="number"
						placeholder="Difficulty"
						className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
						value={difficulty || 0}
						onChange={(e) =>
							setDifficulty(e.target.value ? parseInt(e.target.value) : 0)
						}
					/>
				</div>

				<div className="flex items-center gap-2 border rounded-lg p-2">
					<input
						type="checkbox"
						checked={isPublished}
						onChange={(e) => setIsPublished(e.target.checked)}
						className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
					/>
					<label className="text-sm text-gray-700">Published</label>
				</div>
				
				<div>
					<p>Estimated Time</p>
					<input
						type="number"
						placeholder="Estimated Time"
						className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
						value={estimatedTime || 0}
						onChange={(e) =>
							setEstimatedTime(e.target.value ? parseInt(e.target.value) : 0)
						}
					/>
				</div>
				
				<div>
					<p>Id Language</p>
					<input
						type="number"
						placeholder="Id Language"
						className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
						value={idLanguage || 0}
						onChange={(e) =>
							setIdLanguage(e.target.value ? parseInt(e.target.value) : 0)
						}
					/>
				</div>
			</div>

			<div className="flex justify-end">
				<button
				type="submit"
				className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
				>
				{courseSelected ? "Update" : "Create"}
				</button>
			</div>
			</form>

			<div className="border-t border-gray-200 pt-6 space-y-4">
			{courses.map((course) => (
				<div
				key={course.idCourse}
				className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition"
				>
				<p className="text-gray-800 font-medium">{course.title}</p>
				<div className="flex gap-3">
					<button
					onClick={() => editCourse(course.idCourse)}
					className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
					>
					Edit Course
					</button>
					<button
					onClick={() => editCourseSections(course.idCourse)}
					className="px-4 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
					>
					Edit Sections
					</button>
				</div>
				</div>
			))}
			</div>
		</div>
		);
}
