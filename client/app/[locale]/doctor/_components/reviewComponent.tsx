'use client'
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

type ReviewFormProps = {
    patientId: string;
    doctorId: string;
    
};

export default function ReviewForm({ patientId, doctorId }: ReviewFormProps) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [hover, setHover] = useState(0);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const axiosPrivate = useAxiosPrivate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            review_text: comment,
            rating_score: rating,
            patient_id: patientId,
            doctor_id: doctorId,
        };

        try {
            const result = await axiosPrivate.post(`/ratings/`, payload);
            console.log(result)
            if (result.status === 200) {
                setSuccess('Review added successfully!');
                setError(''); // Clear any previous error
            } else {
                setError('Error adding review: ' + result.data);
                setSuccess(''); // Clear any previous success message
            }
        } catch (err: any) {
            setError('Error adding review: ' + err.message);
            setSuccess(''); // Clear any previous success message
        } finally {
            setRating(0);
            setComment('');
        }
    };

    return (
        <div className='w-full max-w-[600px] p-8 bg-[#F2F6FF] border-4 border-white shadow-lg rounded-[30px]'>
            <h2 className='font-semibold text-[28px] mb-6 text-[#050505]'>Add a Review</h2>
            <form onSubmit={handleSubmit}>
                {/* Star Rating */}
                <div className='flex gap-2 mb-6'>
                    {[...Array(5)].map((_, index) => {
                        const ratingValue = index + 1;
                        return (
                            <label key={index}>
                                <input
                                    type='radio'
                                    name='rating'
                                    value={ratingValue}
                                    onClick={() => setRating(ratingValue)}
                                    className='hidden'
                                />
                                <FaStar
                                    className='cursor-pointer'
                                    size={32}
                                    color={ratingValue <= (hover || rating) ? '#FFC909' : '#A7A6A5'}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(0)}
                                />
                            </label>
                        );
                    })}
                </div>

                {/* Comment Input */}
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder='Write your review...'
                    className='w-full p-4 mb-6 bg-white border-2 border-[#E0E0E0] rounded-[14px] text-[#050505] placeholder-[#A7A6A5] focus:outline-none focus:border-[#FFC909]'
                    rows={4}
                    required
                />

                {/* Submit Button */}
                <button
                    type='submit'
                    className='w-full h-[60px] bg-[#FFC909] text-white font-semibold text-[20px] rounded-[14px] hover:bg-[#E0B308] transition-colors'
                >
                    Submit Review
                </button>

                {/* Success and Error Messages */}
                {error !== '' && (
                    <p className='text-red-600 mt-4'>{error}</p>
                )}
                {success !== '' && (
                    <p className='text-green-500 mt-4'>{success}</p>
                )}
            </form>
        </div>
    );
}