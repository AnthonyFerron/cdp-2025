"use client"
import { FooterMini } from "../../../composants/footer/page"
import Header from "../../../composants/header/page"
import { useState, useEffect, useRef } from "react"
import { CourseSection } from "../models/courseSection.model"
import getCourseSections from "../requests/user/courseSection/getCourseSections"
import { IdCourse, IdLanguage } from "../types/custom.types"
import { Course } from "../models/course.model"
import getCourse from "../requests/user/course/getCourse"
import { ProgrammingLanguage } from "../models/programmingLanguage.model"
import getProgrammingLanguage from "../requests/user/programmingLanguage/getProgrammingLanguage"
import { Quiz } from "../models/quiz.model"
import getQuizWithIdCourse from "../requests/user/quiz/getQuizWithIdCourse"


const questions = [
	{ id: 1, question: "Quel est la couleur du cheval blanc de Sherzod ?", options: ["Blanc", "Noir", "Gris", "Marron"], correctIndex: 0 },
	{ id: 2, question: "Quel sélecteur cible une classe ?", options: [".ma-classe", "#mon-id", "div", "*"], correctIndex: 0 },
	{ id: 3, question: "Quelle propriété change la couleur du texte ?", options: ["background", "color", "font-size", "border"], correctIndex: 1 },
	{ id: 4, question: "Quelle propriété gère l'espace intérieur (padding) ?", options: ["margin", "padding", "gap", "size"], correctIndex: 1 }
]

export default function Cours() {

	const [quiz, setQuiz] = useState<Quiz | null>(null)
	const [language, setLanguage] = useState<ProgrammingLanguage | null>(null)
	const [course, setCourse] = useState<Course | null>(null)
	const [courseSections, setCourseSections] = useState<CourseSection[]>([])
	const [page, setPage] = useState(0)

	const [showQuiz, setShowQuiz] = useState(false)
	const [code, setCode] = useState<string>('')
	const iframeRef = useRef<HTMLIFrameElement | null>(null)

	const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(-1))
	const [currentIndex, setCurrentIndex] = useState<number>(0)
	const totalQuestions = questions.length

	const loadCourseSections = async () => {
		const idCourse = new URL(document.URL).searchParams.get('idCourse')

		if (idCourse) {
			const res = await getCourseSections(parseInt(idCourse) as IdCourse)

			if (res) {
				setCourseSections(res)
				setCode(res[0].code)
			}
		}
	}

	const loadCourse = async () => {
		const idCourse = new URL(document.URL).searchParams.get('idCourse')

		if (idCourse) {
			const res = await getCourse(parseInt(idCourse) as IdCourse)

			if (res) {
				setCourse(res)
			}
		}
	}

	const loadQuiz = async () => {
		const idCourse = new URL(document.URL).searchParams.get('idCourse')

		if (idCourse) {
			const res = await getQuizWithIdCourse(parseInt(idCourse) as IdCourse)
			if (res) {
				setQuiz(res)
			}
		}
	}

	const loadProgrammingLanguages = async (idLanguage: IdLanguage) => {
		const res = await getProgrammingLanguage(idLanguage)

		if (res) {
			setLanguage(res)
		}
	}

	useEffect(() => {
		if (courseSections[page]) {
			setCode(courseSections[page].code)
		}
	}, [page])

	useEffect(() => {
		if (course) {
			loadProgrammingLanguages(course.idLanguage)
		}
	}, [course])

	useEffect(() => {
		loadCourseSections()
		loadCourse()
		loadQuiz()
	}, [])

	useEffect(() => {
		const iframe = iframeRef.current
		if (!iframe) return
		const doc = iframe.contentDocument || iframe.contentWindow?.document
		if (!doc) return
		doc.open()
		doc.write(`<!doctype html><html><head><meta charset="utf-8"></head><body>${code}</body></html>`)
		doc.close()
	}, [code])

	const handleNextPage = () => {
		if (courseSections && quiz) {
			setPage(prev => {
				if (prev >= courseSections.length-1) {
					document.location.href = `/quiz?idQuiz=${quiz.idQuiz}?idCourse=${quiz.idCourse}`
					return prev
				} else {
					return prev + 1
				}
			})
		}
	}

	const handleLessPage = () => {
		if (courseSections) {
			setPage(prev => {
				if (prev === 0) {
					return 0
				}
				return prev - 1
			})
		}
	}

	return (
    	<div className="bg-[#1D1D1D] min-h-screen font-[silkscreen]">
		<Header />

		<div className="grid grid-cols-2">
			<div className={showQuiz ? "hidden" : "grid mt-10 p-16"}>
			<h2 className="mx-auto w-fit border-b-2 border-white text-5xl text-[#1985a7]">Cours</h2>

			{
				courseSections[page] && (
					<p className="mt-4 text-white mb-10">{ courseSections[page].content }</p>
				)
			}
        </div>

        <div className={showQuiz ? "hidden" : "grid grid-rows-2 p-4 gap-4"}>
			<div className="h-[80%]">
				{
					course && (
						<label className="text-2xl text-[#1985a7] text-center mb-2 block">Éditeur { course.idLanguage }</label>
					)
				}
				<textarea
					value={code}
					onChange={(e) => setCode(e.target.value)}
					className="w-full h-full min-h-[200px] bg-[#0b0b0b] text-green-300 font-mono p-3 rounded resize-none"
					spellCheck={false}
				/>
			</div>
			
			{
				language?.idLanguage !== 7 && (
					<div className="bg-white rounded overflow-hidden">
						{
							course && (
								<label className="text-2xl block text-[#1985a7] text-center pr-2">Aperçu ({ course.idLanguage } rendu)</label>
							)
						}
						<iframe ref={iframeRef} className="w-full h-[260px] border-0" title="preview" />
					</div>
				)
			}
        </div>
      </div>


      	

		<div className="w-full text-center mb-10 gap-5 flex flex-row items-center justify-center">
			{
				page !== 0 && (
					<button
						onClick={handleLessPage}
						className="w-1/4 text-2xl outline-[#989AAF] outline-2 border-2 border-[#FFFFFF] rounded bg-[#DADCE7] shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:mt-0.5"
					>
						Précédent
					</button>
				)
			}

			{
				page <= courseSections.length && (
					<button
						onClick={handleNextPage}
						className="w-1/4 text-2xl outline-[#989AAF] outline-2 border-2 border-[#FFFFFF] rounded bg-[#DADCE7] shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:mt-0.5"
					>
						Suivant
					</button>
				)
			}
		</div>

      	<FooterMini />

    </div>

  )
}
