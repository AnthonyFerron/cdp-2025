"use client";
import { FooterMini } from "../../../composants/footer/page";
import Header from "../../../composants/header/page";
import { useState } from "react";

export default function SignInPage() {
  const [showQuiz, setShowQuiz] = useState(false);
  return (
    <div className="bg-[#1D1D1D] min-h-screen font-[silkscreen]">
      <Header />

      <div className={showQuiz ? "hidden" : "grid mt-10 p-16"}>
        <h2 className="mx-auto w-fit border-b-2 border-white text-5xl text-[#1985a7]">Cours</h2>
        <p className="mt-4 text-white mb-10">Le CSS, ou Cascading Style Sheets, est un langage de style utilisé pour décrire la présentation d’un document HTML. Il permet de contrôler l’apparence des éléments d’une page web, en séparant le contenu de sa mise en forme. Lorsqu’on débute en CSS, il est essentiel de comprendre comment ce langage s’intègre dans une page web. Il peut être inclus directement dans le fichier HTML, soit à l’intérieur d’une balise dédiée dans l’en-tête du document, soit en étant appliqué à chaque élément via un attribut spécifique. Toutefois, la méthode la plus propre et la plus utilisée consiste à créer un fichier CSS séparé, que l’on relie ensuite au fichier HTML. Cela permet de centraliser les styles et de les réutiliser sur plusieurs pages.

          Le cœur du CSS repose sur les sélecteurs, qui permettent de cibler les éléments HTML à styliser. Ces sélecteurs peuvent être très simples, comme le nom d’une balise, ou plus complexes, en utilisant des classes, des identifiants ou des combinaisons de ces éléments. Une fois l’élément ciblé, on lui applique des déclarations de style, qui sont des paires de propriétés et de valeurs. Ces propriétés couvrent un large éventail de possibilités, allant de la couleur du texte à la taille des polices, en passant par les marges, les bordures, les espacements internes, les arrière-plans, et bien plus encore.

          L’apprentissage du CSS commence par l’expérimentation de ces propriétés de base. On apprend à modifier l’apparence du texte, à ajuster les espacements autour des éléments, à changer les couleurs et à structurer visuellement une page. On découvre également que le CSS suit une logique de cascade, ce qui signifie que plusieurs règles peuvent s’appliquer à un même élément, et que certaines règles peuvent en écraser d’autres selon leur spécificité ou leur ordre d’apparition. Comprendre cette hiérarchie est fondamental pour éviter les conflits et maîtriser le comportement du style.

          Ce premier niveau vise donc à donner une base solide sur la syntaxe, la structure et les principes fondamentaux du CSS. Il prépare l’apprenant à manipuler les styles avec confiance, à lire et comprendre des feuilles de style simples, et à commencer à construire des pages web visuellement cohérentes.</p>

        <button
          onClick={() => setShowQuiz(true)}
          className="w-1/4 mx-auto text-2xl outline-[#989AAF] outline-2 border-2 border-[#FFFFFF] rounded bg-[#DADCE7] shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:mt-0.5"
        >
          Suivant
        </button>
      </div>

      <div className={`quiz ${showQuiz ? "" : "hidden"} w-3/4 mx-auto text-center mb-4 py-10`}>
        <div className="bg-[#faf2ea] rounded-md">
          <h3 className="text-2xl">Question ici même</h3>
          <p className="text-xl">Quel est la couleur du cheval blanc de Sherzod ?</p>
        </div>
        <div className="grid grid-cols-2">
          <div className="grid grid-rows-2">
            <div className="flex items-center justify-center h-24">
              <button className="text-2xl outline-[#989AAF] outline-2 border-2 border-[#FFFFFF] rounded bg-[#DADCE7] shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:mt-0.5">Option 1</button>
            </div>
            <div className="flex items-center justify-center h-24">
              <button className="text-2xl outline-[#989AAF] outline-2 border-2 border-[#FFFFFF] rounded bg-[#DADCE7] shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:mt-0.5">Option 2</button>
            </div>
          </div>
          <div className="grid grid-rows-2">
            <div className="flex items-center justify-center h-24">
              <button className="text-2xl outline-[#989AAF] outline-2 border-2 border-[#FFFFFF] rounded bg-[#DADCE7] shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:mt-0.5">Option 3</button>
            </div>
            <div className="flex items-center justify-center h-24">
              <button className="text-2xl outline-[#989AAF] outline-2 border-2 border-[#FFFFFF] rounded bg-[#DADCE7] shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:mt-0.5">Option 4</button>
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-700 rounded-xl h-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-lime-400 transition-all"
            style={{ width: `70%` }}
            role="progressbar"
            aria-valuenow={70}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <p className="text-white text-xl mb-4">75%</p>
        <div className="grid grid-cols-2 w-2/4 mx-auto">
          <button
            onClick={() => setShowQuiz(false)}
            className="mx-auto text-2xl outline-[#989AAF] outline-2 border-2 border-[#FFFFFF] rounded bg-[#DADCE7] shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:mt-0.5"
          >
            Précédent
          </button>
          <button className="mx-auto text-2xl outline-[#989AAF] outline-2 border-2 border-[#FFFFFF] rounded bg-[#DADCE7] shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:mt-0.5">Suivant</button>
        </div>
      </div>

      <FooterMini />

    </div>

  );
}
