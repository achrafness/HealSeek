"use client";
import React, { useState } from 'react';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface Medication {
    medication_name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
}

interface PrescriptionFormData {
    diagnosis: string;
    notes: string;
    medications: Medication[];
    appointment_id: string;
    patient_id: string;
}

interface PrescriptionFormProps {
    appointmentId: string;
    patientId: string;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PrescriptionForm({ appointmentId, patientId , setOpen }: PrescriptionFormProps) {
    const axios = useAxiosPrivate();
    const router = useRouter();
    const t = useTranslations("prescription");
    const [formData, setFormData] = useState<PrescriptionFormData>({
        appointment_id: appointmentId,
        patient_id: patientId,
        diagnosis: '',
        notes: '',
        medications: [],
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const handleMedicationChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const updatedMedications = [...formData.medications];
        updatedMedications[index] = {
            ...updatedMedications[index],
            [name]: value,
        };
        setFormData({
            ...formData,
            medications: updatedMedications,
        });
    };

    const addMedication = () => {
        setFormData({
            ...formData,
            medications: [
                ...formData.medications,
                { medication_name: '', dosage: '', frequency: '', duration: '', instructions: '' },
            ],
        });
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.diagnosis.trim()) newErrors.diagnosis = t('diagnosis') + ' is required';
        if (!formData.notes.trim()) newErrors.notes = t('notes') + ' is required';

        formData.medications.forEach((medication, index) => {
            if (!medication.medication_name.trim()) newErrors[`medication_name_${index}`] = t('medicationName') + ' is required';
            if (!medication.dosage.trim()) newErrors[`dosage_${index}`] = t('dosage') + ' is required';
            if (!medication.frequency.trim()) newErrors[`frequency_${index}`] = t('frequency') + ' is required';
            if (!medication.duration.trim()) newErrors[`duration_${index}`] = t('duration') + ' is required';
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (!validateForm()) return;
            console.log(formData);
            const result = await axios.post('/prescription/', formData);
            if (result.status === 201) {
                setFormData({
                    appointment_id: appointmentId,
                    patient_id: patientId,
                    diagnosis: '',
                    notes: '',
                    medications: [],
                });
                setErrors({});
                setOpen(false)
            }
        } catch (error: any) {
            setErrors({ ...errors, server: error?.response?.data.detail || error.message });
        }
    };

    return (
        <div className='w-full h-fit mx-auto '>
            <form onSubmit={handleSubmit} className='w-full'>
                {/* Diagnosis Field */}
                <div className='flex gap-4'>
                <div className='flex flex-col'>
                    <label htmlFor="diagnosis" className='font-medium text-xs text-[#333333] my-4'>{t('diagnosis')}</label>
                    <textarea
                        name="diagnosis"
                        id="diagnosis"
                        value={formData.diagnosis}
                        onChange={handleInputChange}
                        className='focus:outline-none flex flex-row justify-center items-center p-5 gap-2 w-full h-[100px] bg-[#FFF3F3] rounded-[10px] order-3 flex-grow-0'
                        required
                    />
                    {errors.diagnosis && <span className="text-red-500 text-xs">{errors.diagnosis}</span>}
                </div>

                {/* Notes Field */}
                <div className='flex flex-col'>
                    <label htmlFor="notes" className='font-medium text-xs text-[#333333] my-4'>{t('notes')}</label>
                    <textarea
                        name="notes"
                        id="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        className='focus:outline-none flex flex-row justify-center items-center p-5 gap-2 w-full h-[100px] bg-[#FFF3F3] rounded-[10px] order-3 flex-grow-0'
                        required
                    />
                    {errors.notes && <span className="text-red-500 text-xs">{errors.notes}</span>}
                </div>
                </div>

                {/* Medications Section */}
                <div className='my-6'>
                    <h2 className='text-xl font-semibold mb-4'>{t('medications')}</h2>
                    {formData.medications.map((medication, index) => (
                        <div key={index} className='mb-6 p-4 bg-[#FFF3F3] rounded-[10px]'>
                            <div className='flex flex-col'>
                                <label htmlFor={`medication_name_${index}`} className='font-medium text-xs text-[#333333] my-2'>{t('medicationName')}</label>
                                <input
                                    type="text"
                                    name="medication_name"
                                    id={`medication_name_${index}`}
                                    value={medication.medication_name}
                                    onChange={(e) => handleMedicationChange(index, e)}
                                    className='focus:outline-none flex flex-row justify-center items-center p-3 gap-2 w-full h-[40px] bg-white rounded-[10px] order-3 flex-grow-0'
                                    required
                                />
                                {errors[`medication_name_${index}`] && <span className="text-red-500 text-xs">{errors[`medication_name_${index}`]}</span>}
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor={`dosage_${index}`} className='font-medium text-xs text-[#333333] my-2'>{t('dosage')}</label>
                                <input
                                    type="text"
                                    name="dosage"
                                    id={`dosage_${index}`}
                                    value={medication.dosage}
                                    onChange={(e) => handleMedicationChange(index, e)}
                                    className='focus:outline-none flex flex-row justify-center items-center p-3 gap-2 w-full h-[40px] bg-white rounded-[10px] order-3 flex-grow-0'
                                    required
                                />
                                {errors[`dosage_${index}`] && <span className="text-red-500 text-xs">{errors[`dosage_${index}`]}</span>}
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor={`frequency_${index}`} className='font-medium text-xs text-[#333333] my-2'>{t('frequency')}</label>
                                <input
                                    type="text"
                                    name="frequency"
                                    id={`frequency_${index}`}
                                    value={medication.frequency}
                                    onChange={(e) => handleMedicationChange(index, e)}
                                    className='focus:outline-none flex flex-row justify-center items-center p-3 gap-2 w-full h-[40px] bg-white rounded-[10px] order-3 flex-grow-0'
                                    required
                                />
                                {errors[`frequency_${index}`] && <span className="text-red-500 text-xs">{errors[`frequency_${index}`]}</span>}
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor={`duration_${index}`} className='font-medium text-xs text-[#333333] my-2'>{t('duration')}</label>
                                <input
                                    type="text"
                                    name="duration"
                                    id={`duration_${index}`}
                                    value={medication.duration}
                                    onChange={(e) => handleMedicationChange(index, e)}
                                    className='focus:outline-none flex flex-row justify-center items-center p-3 gap-2 w-full h-[40px] bg-white rounded-[10px] order-3 flex-grow-0'
                                    required
                                />
                                {errors[`duration_${index}`] && <span className="text-red-500 text-xs">{errors[`duration_${index}`]}</span>}
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor={`instructions_${index}`} className='font-medium text-xs text-[#333333] my-2'>{t('instructions')}</label>
                                <textarea
                                    name="instructions"
                                    id={`instructions_${index}`}
                                    value={medication.instructions}
                                    onChange={(e) => handleMedicationChange(index, e)}
                                    className='focus:outline-none flex flex-row justify-center items-center p-3 gap-2 w-full h-[80px] bg-white rounded-[10px] order-3 flex-grow-0'
                                />
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addMedication}
                        className='flex flex-row text-white text-sm justify-center items-center p-2 my-4 gap-2 w-full h-[40px] bg-primary rounded-[10px]'
                    >
                        {t('addMedication')}
                    </button>
                </div>

                {/* Submit Button */}
                <button type='submit' className='flex flex-row text-white text-xl justify-center items-center p-2 my-10 gap-2 w-full h-[48px] bg-primary rounded-[15px]'>
                    {t('submitPrescription')}
                </button>

                {/* Server Error */}
                {errors.server && <span className="text-red-500 text-xs">{errors.server}</span>}
            </form>
        </div>
    );
}