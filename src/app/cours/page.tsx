"use client";
import { FooterMini } from "../../../composants/footer/page";
import Header from "../../../composants/header/page";
import { useState, useEffect, useRef } from "react";

export default function Cours() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [cssCode, setCssCode] = useState<string>(`/* Exemple CSS : modifiez ce code */\nbody { font-family: Arial, sans-serif; padding: 12px; }\nh1 { color: #1985a7; }\n.card { background: #faf2ea; padding: 12px; border-radius: 8px; }\n.button { background: #1985a7; color: white; padding: 8px 12px; border-radius: 6px; border: none; }`);
  // sample HTML shown in the preview iframe
  const htmlContent = `<h1>Exemple</h1><p>Change le style en modifiant le CSS à gauche.</p><div class="card"><p>Carte exemple</p><button class="button">Bouton</button></div>`;
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;
    doc.open();
    doc.write(`<!doctype html><html><head><meta charset="utf-8"><style>${cssCode}</style></head><body>${htmlContent}</body></html>`);
    doc.close();
  }, [cssCode, htmlContent]);

  // Quiz state: liste de questions et index courant
  const questions = [
    { id: 1, question: "Quel est la couleur du cheval blanc de Sherzod ?", options: ["Blanc", "Noir", "Gris", "Marron"], correctIndex: 0 },
    { id: 2, question: "Quel sélecteur cible une classe ?", options: [".ma-classe", "#mon-id", "div", "*"], correctIndex: 0 },
    { id: 3, question: "Quelle propriété change la couleur du texte ?", options: ["background", "color", "font-size", "border"], correctIndex: 1 },
    { id: 4, question: "Quelle propriété gère l'espace intérieur (padding) ?", options: ["margin", "padding", "gap", "size"], correctIndex: 1 }
  ];
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [currentIndex, setCurrentIndex] = useState<number>(0); // 0 = début du quiz (progress 0%)
  const [showHint, setShowHint] = useState<boolean>(false);
  const totalQuestions = questions.length;
  // currentIndex peut atteindre totalQuestions pour représenter l'état "terminé" (progress 100%)
  const progressPercent = Math.round((currentIndex / totalQuestions) * 100);

  const handleOptionClick = (optIndex: number) => {
    setSelectedAnswers((prev) => {
      const copy = [...prev];
      copy[currentIndex] = optIndex;
      return copy;
    });
    goNext();
  };

  const correctCount = questions.reduce((acc, q, i) => acc + (selectedAnswers[i] === q.correctIndex ? 1 : 0), 0);
  const goNext = () => setCurrentIndex((i) => Math.min(i + 1, totalQuestions));
  const goPrev = () => setCurrentIndex((i) => Math.max(i - 1, 0));

  return (
    <div className="bg-[#1D1D1D] min-h-screen font-[silkscreen]">
      <Header />
      <div className="grid grid-cols-2">
        <div className={showQuiz ? "hidden" : "grid mt-10 p-16"}>
          <h2 className="mx-auto w-fit border-b-2 border-white text-5xl text-[#1985a7]">Cours</h2>
          <p className="mt-4 text-white mb-10">
            Le CSS (Cascading Style Sheets) contrôle l'apparence d'une page HTML. Bases à connaître : les sélecteurs (balises, classes, id) ciblent les éléments ; les propriétés (color, font-size, margin, padding, background, etc.) définissent le style ; la cascade et la spécificité déterminent quelles règles s'appliquent ; le modèle de boîte (box model) gère les dimensions et les espacements.
            Commencez par modifier la couleur des titres, la taille de la police ou les marges. Essayez vos règles CSS dans l'éditeur à droite — l'aperçu se mettra à jour automatiquement.
          </p>

          {/* Indice caché : clique pour révéler */}
          <div className="mx-auto w-full max-w-prose text-center">
            <button
              type="button"
              aria-expanded={showHint}
              onClick={() => setShowHint((s) => !s)}
              className="text-sm text-[#1985a7] underline mb-2 focus:outline-none"
            >
              Indice (cliquez pour révéler)
            </button>
            <div
              className={`mt-2 text-white text-base transition-all duration-300 ease-in-out ${
                showHint ? "opacity-100 max-h-40" : "opacity-0 max-h-0 overflow-hidden"
              }`}
              aria-hidden={!showHint}
            >
              Tu peux utiliser text-align: center pour aligner le texte au centre.
            </div>
          </div>
        </div>
        <div className={showQuiz ? "hidden" : "grid grid-rows-2 p-4 gap-4"}>
          {/* CSS editor */}
          <div className="h-[80%]">
            <label className="text-2xl text-[#1985a7] text-center mb-2 block">Éditeur CSS</label>
            <textarea
              value={cssCode}
              onChange={(e) => setCssCode(e.target.value)}
              className="w-full h-full min-h-[200px] bg-[#0b0b0b] text-green-300 font-mono p-3 rounded resize-none"
              spellCheck={false}
            />
          </div>
          {/* Preview iframe */}
          <div className="bg-white rounded overflow-hidden">
            <label className="text-2xl block text-[#1985a7] text-center pr-2">Aperçu (HTML rendu)</label>
            <iframe ref={iframeRef} className="w-full h-[260px] border-0" title="preview" />
          </div>
        </div>
      </div>


      <div className={`quiz ${showQuiz ? "" : "hidden"} w-[85%] mx-auto text-center mt-20 mb-4 py-10`}>
        <div className="bg-[#faf2ea] rounded-md p-4">
          {currentIndex < totalQuestions ? (
            <>
              <h3 className="text-2xl">Question {currentIndex + 1} / {totalQuestions}</h3>
              <p className="text-xl">{questions[currentIndex].question}</p>
            </>
          ) : (
            <>
              <h3 className="text-2xl">Récapitulatif</h3>
              <p className="text-xl">Score : {correctCount} / {totalQuestions}</p>
            </>
          )}
        </div>

        {currentIndex < totalQuestions && (
          <div className="grid grid-cols-2 gap-4 my-4">
            {questions[currentIndex].options.map((opt, i) => (
              <div key={i} className="flex items-center justify-center h-24">
                <button
                  type="button"
                  onClick={() => handleOptionClick(i)}
                  className="w-[50%] h-16 flex items-center justify-center text-2xl outline-[#989AAF] outline-2 border-2 border-[#FFFFFF] rounded bg-[#DADCE7] shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:mt-0.5 whitespace-nowrap overflow-hidden"
                >
                  {opt}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Récapitulatif détaillé affiché lorsque le quiz est terminé */}
        {currentIndex >= totalQuestions && (
          <div className="mt-6 text-left w-full max-w-3xl mx-auto">
            <div className="grid gap-3">
              {questions.map((q, idx) => {
                const chosen = selectedAnswers[idx];
                const correct = q.correctIndex;
                const isCorrect = chosen === correct;
                return (
                  <div key={q.id} className={`p-3 rounded ${isCorrect ? "bg-green-100" : "bg-red-100"}`}>
                    <p className="font-medium">{idx + 1}. {q.question}</p>
                    <p className="text-sm">Votre réponse: <span className="font-semibold">{chosen === -1 ? "Non répondu" : q.options[chosen]}</span></p>
                    <p className="text-sm">Bonne réponse: <span className="font-semibold">{q.options[correct]}</span></p>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center mt-6 mb-6 gap-4">
              <button
                onClick={() => {
                  setSelectedAnswers(Array(questions.length).fill(-1));
                  setCurrentIndex(0);
                }}
                className="mx-auto text-2xl outline-[#989AAF] outline-2 border-2 border-[#FFFFFF] rounded bg-[#DADCE7] shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:mt-0.5"
              >
                Recommencer
              </button>
              <button
                onClick={() => {
                  // fermer le quiz et revenir au cours
                  setSelectedAnswers(Array(questions.length).fill(-1));
                  setCurrentIndex(0);
                  setShowQuiz(false);
                }}
                className="mx-auto text-2xl outline-[#989AAF] outline-2 border-2 border-[#FFFFFF] rounded bg-[#DADCE7] shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:mt-0.5"
              >
                Retour au cours
              </button>
            </div>
          </div>
        )}

        <div className="w-full bg-gray-700 rounded-xl h-4 overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-lime-400 transition-all"
            style={{ width: `${progressPercent}%` }}
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <p className="text-white text-xl mb-4">{progressPercent}%</p>

          <button
            onClick={() => {
              // si on est au début, on ferme le quiz ; sinon on recule d'une question
              if (currentIndex === 0) {
                setShowQuiz(false);
              } else {
                goPrev();
              }
            }}
            className="mx-auto text-2xl outline-[#989AAF] outline-2 border-2 border-[#FFFFFF] rounded bg-[#DADCE7] shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:mt-0.5"
          >
            Précédent
          </button>
      </div>
      {/* bouton pour démarrer le quiz — caché pendant le quiz */}
      {!showQuiz && (
        <div className="w-full text-center mb-10">
          <button
            onClick={() => setShowQuiz(true)}
            className="w-1/4 text-2xl outline-[#989AAF] outline-2 border-2 border-[#FFFFFF] rounded bg-[#DADCE7] shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:mt-0.5"
          >
            Suivant
          </button>
        </div>
      )}

      <FooterMini />

    </div>

  );
}
