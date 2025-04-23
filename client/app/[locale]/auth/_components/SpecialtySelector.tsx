"use client";
import React, { useState } from 'react';

interface speciality{
    name : string
}

interface SpecialitySelectorProps {
    specialities: Speciality[];
    selectedSpeciality: string;
    onSelect: (speciality: string) => void;
}

const SpecialitySelector: React.FC<SpecialitySelectorProps> = ({ specialities, selectedSpeciality, onSelect }) => {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter specialities based on search query
    const filteredSpecialities = specialities.filter((speciality) =>
        speciality.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='flex flex-col'>
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search for a speciality..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='focus:outline-none flex flex-row justify-center items-center p-2 gap-2 w-full h-[40px] bg-[#FFF3F3] rounded-[10px] mb-4'
            />

            {/* Speciality List */}
            <div className='flex flex-col max-h-[200px] overflow-y-auto'>
                {filteredSpecialities.map((speciality, index) => (
                    <div
                        key={index}
                        onClick={() => onSelect(speciality.name)}
                        className={`p-2 cursor-pointer hover:bg-[#FFF3F3] rounded-[10px] ${
                            selectedSpeciality === speciality.name ? 'bg-primary text-white' : 'bg-white'
                        }`}
                    >
                        {speciality.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpecialitySelector;