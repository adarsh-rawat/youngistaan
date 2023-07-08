import React from "react";

export default function VerifySec(props){
    const data={
        
    }
    return (
        <>
        <h6 class="bg-light mt-5 p-2 border-top border-bottom">{props.heading}</h6>

        <ul class="list-group list-group-light mb-4">
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
            <img src="https://mdbootstrap.com/img/new/avatars/8.jpg" alt="" style={{"width": "45px", "height":" 45px"}}
                class="rounded-circle" />
            <div class="ms-3">
                <p class="fw-bold mb-1">John Doe</p>
                <p class="text-muted mb-0">john.doe@gmail.com</p>
            </div>
            </div>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
            <img src="https://mdbootstrap.com/img/new/avatars/6.jpg" class="rounded-circle" alt=""
                style={{"width":"45px"," height": "45px"}} />
            <div class="ms-3">
                <p class="fw-bold mb-1">Alex Ray</p>
                <p class="text-muted mb-0">alex.ray@gmail.com</p>
            </div>
            </div>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
            <img src="https://mdbootstrap.com/img/new/avatars/7.jpg" class="rounded-circle" alt=""
                style={{"width": "45px","height": "45px"}} />
            <div class="ms-3">
                <p class="fw-bold mb-1">Kate Hunington</p>
                <p class="text-muted mb-0">kate.hunington@gmail.com</p>
            </div>
            </div>
        </li>
        </ul>

        </>
    )
} 