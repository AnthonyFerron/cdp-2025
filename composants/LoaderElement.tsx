

export default function LoaderElement({ loader, h }: { loader: boolean, h: string }) {
    return (
        loader && (
            <div className={`${h} flex items-center justify-center w-full`}>
                <div
                    className={`w-full text-white mx-auto h-16 flex items-center justify-center text-2xl outline-[#989AAF] outline-2 border-2 rounded shadow-[0px_2px_0px_2px_#666880] whitespace-nowrap overflow-hidden transition-all`}
                >
                    Chargment...
                </div>
            </div>
        )
    )
}