import axios from "axios";
import { useEffect,useState } from "react";

export default function Test() {
    const [person, setPerson] = useState({
        firstName: 'Anuj',
        lastName: 'Maharjan',
        jobDescription: {
            position: 'frontend',
            experience: '3 months'
        }
    });

    const handleChange = (e) => {
        let jobObj = {
            ...person.jobDescription,
            [e.target.name] : e.target.value
        }
        setPerson({
            ...person,
            [e.target.name]: e.target.value,
            jobDescription: jobObj
        })
    }

    return (
        <>
            <input type="text" name="firstName" value={person.firstName} onChange={handleChange} />
            <input type="text" name="lastName" value={person.lastName} onChange={handleChange} />
            <input type="text" name="position" value={person.jobDescription.position} onChange={handleChange} />
            <input type="text" name="experience" value={person.jobDescription.experience} onChange={handleChange} />
            <p>{person.firstName} {person.lastName}</p>
            <p>{person.jobDescription.position} { person.jobDescription.experience}</p>
        </>
    );
}