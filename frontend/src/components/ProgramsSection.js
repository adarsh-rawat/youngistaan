import React from "react"

export default function ProgramsEnrolled(){
    const data=[
        {
            subject:"DSA",
            guideName:"Mr. Jhantu"
        },
        {
            subject:"Computer Networks",
            guideName:"Mr. Lili"
        }
    ]

    return (
        <>
        <div className="container w-75">
        <h5>Programs Enrolled</h5>

        <div>
        <ul class="list-group list-group-light " style={{"outline": "none"}}>
            {data.map((record) => {
                return (
                        <li class="list-group-item ">
                            <div>
                                <div class="fw-bold">DSA</div>
                                <div class="text-muted">Guided By - {record.guideName}</div>
                            </div>
                        </li>
                        )
            })}
        </ul>
        </div>
        
        </div>
        </>
    )
}