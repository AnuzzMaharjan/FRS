export default function ImageBanner({title}) {
    return (
        <>
            <div className="w-full relative bg-slate-500 h-96">
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                    <h3 className="text-white text-4xl font-bold">{ title }</h3>
                    </div>
            </div>
        </>
    )
}