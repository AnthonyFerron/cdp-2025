export default function Footer() {
    return (
        <div className="grid grid-cols-2 bg-[#0E0419] text-white items-center">
            <div>
                <img src="logo2.png" alt="" className="mx-auto w-[50px] md:w-[100px]" />
            </div>
            <div>
                <p className="border-b-1 border-[#13ADDC] w-fit md:text-3xl mb-4">Navigation</p>
                <div className="grid grid-cols-2 md:grid-cols-4">
                        <a className="md:text-3xl" href="">Accueil</a>
                        <a className="md:text-3xl" href="">Mes cours</a>
                        <a className="md:text-3xl" href="">Boutique</a>
                        <a className="md:text-3xl" href="">Profil</a>
                </div>
            </div>

        </div>
    )
}
