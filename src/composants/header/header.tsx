export default function Header() {
  return (
    <div className="grid grid-cols-4 bg-[#0E0419] text-white items-center">
        <div>
            <img src="logo2.png" alt="" className="mx-auto w-[50px] md:w-[100px]"/>
        </div>
        <div className="text-center">
            <img src="cours2.png" alt="" className="mx-auto w-[50px] md:w-[100px]"/>
            <p>Mes cours</p>
        </div>
        <div className="text-center">
            <img src="shop2.png" alt="" className="mx-auto w-[50px] md:w-[100px]"/>
            <p>Boutique</p>
        </div>
        <div className="md:grid grid-cols-2">
            <div>
                <a href="">Bouton1</a>
            </div>
            <div>
                <a href="">Bouton2</a>
            </div>
        </div>
        <div></div>
    </div>
  )
}
