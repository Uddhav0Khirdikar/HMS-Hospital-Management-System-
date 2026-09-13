import DoctorForm from "../components/doctorForm";
import { addDoctor } from "../services/doctorServices";

function Doctors() {


    const handleDoctorSubmit = (doctor) => {

        addDoctor(doctor)
        .then((response)=>{

            console.log(response.data);

            alert("Doctor Registered Successfully");

        })
        .catch((error)=>{

            console.log(error);

            alert("Something went wrong");

        });

    };


    return (

        <div>

            <DoctorForm 
                onSubmit={handleDoctorSubmit}
            />

        </div>

    );

}


export default Doctors;