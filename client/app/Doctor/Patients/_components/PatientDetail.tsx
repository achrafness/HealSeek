import Image from 'next/image'
import React from 'react'

type PatientDetailProps = {
    patient?: any
}

export default function PatientDetail({ patient }: PatientDetailProps) {
    return (
        <div>
            <div>
                <div>
                    <div>
                        <Image src={patient?.profilePicture || '/user.svg'} alt="doctor" width={100} height={100} />
                    </div>
                    <div>
                        <h1>Marvin McKinney</h1>
                        <div>
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                        </div>
                    </div>
                </div>
                <div>
                    <button>Edit</button>
                    <button>Remove Patient</button>
                </div>
            </div>
            <div>
                <div>
                    <h1></h1>
                    <div>

                    </div>
                </div>
                <div>
                    <h1></h1>
                    <div>

                    </div>
                </div>
                <div>
                    <h1></h1>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
}
