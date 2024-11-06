import { useEffect, useState } from "react";
import ImageBanner from "../components/ImageBanner";

export default function TermsConditions() {
    const [termsAccepted, setTermsAccepted] = useState(false);


    const handleAcceptTerms = () => {
        setTermsAccepted((prev)=>!prev);
    }
    useEffect(() => {
        console.log(termsAccepted);
    },[termsAccepted])

    return (
        <>
            <ImageBanner title={'Terms & Conditions'} />
           <div className="container mx-auto my-20">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi commodi nostrum quisquam rem neque! Commodi officia rem, assumenda aperiam placeat, impedit autem mollitia in fugit inventore labore omnis explicabo. Maiores!
            Voluptatem amet incidunt praesentium eos facere laboriosam quo cumque libero nostrum! Temporibus voluptatibus sed incidunt magni dolore odio nostrum quis eius sint, quasi eaque id excepturi exercitationem. Libero, doloribus placeat.
            Nobis adipisci, dolor quas, laboriosam neque sed harum natus vel aperiam ratione aliquid perferendis possimus quam. Et tempora sit ut, quod hic, at cupiditate consequuntur cumque officia dolorem, atque nesciunt.
            Provident sapiente odio voluptatem exercitationem sint, velit commodi. Exercitationem deserunt modi obcaecati quidem aperiam harum reprehenderit, consequuntur quisquam, officiis, corrupti cumque dolor. Officia eaque quam cumque accusamus ipsam sunt a!
            Laboriosam, molestiae! Sapiente iure illum earum praesentium a officia. Itaque, ipsam perspiciatis corporis voluptatem maiores accusamus officia vitae exercitationem. Eveniet possimus praesentium incidunt placeat quidem ut blanditiis eos ullam impedit?
            </div>
            <label onClick={handleAcceptTerms}>
                <input type="radio" {...termsAccepted?'checked':''} />
            I accept all terms & conditions
            </label>
        </>
    )
}