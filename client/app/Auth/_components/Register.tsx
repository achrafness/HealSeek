import React from 'react'

export default function Register() {
    const specialities = [
        { name: 'Cardiology', color: '#5577FF' },
        { name: 'Neurology', color: '#FD71AF' },
        { name: 'Pediatrics', color: '#49CCF9' },
        { name: 'Orthopedics', color: '#00B884' },
    ];
    return (
        <div className='w-1/2 h-fit mx-auto'>
            <div className='w-full h-20 relative my-12'>
                <div className='absolute -top-10 right-0 -translate-y-full w-0 h-0  border-t-[50px] border-t-transparent border-r-[50px] border-r-primary  border-b-[50px] border-b-transparent'></div>
                <h1 className='font-medium text-5xl flex items-center'>Log in</h1>
                <div className='absolute -bottom-12 left-0  w-0 h-0 border-t-[20px] border-t-transparent  border-l-[20px] border-l-primary border-b-transparent border-b-[20px] border-b-primary'></div>
            </div>
            <form method='Post' className='w-full'>
                <div className='flex flex-col'>
                    <label htmlFor="name" className=' font-medium text-xs text-[#333333] my-4'>Name</label>
                    <input type="name" name="name" id="name" className='focus:outline-none flex flex-row justify-center items-center p-5 gap-2 w-full h-[51px] bg-[#FFF3F3] rounded-[10px] order-3 flex-grow-0' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="email" className=' font-medium text-xs text-[#333333] my-4'>Email</label>
                    <input type="email" name="email" id="email" className='focus:outline-none flex flex-row justify-center items-center p-5 gap-2 w-full h-[51px] bg-[#FFF3F3] rounded-[10px] order-3 flex-grow-0' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="password" className=' font-medium text-xs text-[#333333] my-4'>Password</label>
                    <input type="password" name="password" id="password" className='focus:outline-none flex flex-row justify-center items-center p-5  gap-2 w-full h-[51px] bg-[#FFF3F3] rounded-[10px] order-3 flex-grow-0' />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="speciality" className=' font-medium text-xs text-[#333333] my-4'>Speciality</label>
                    <div id="speciality" className='focus:outline-none flex flex-row justify-center items-center p-5  gap-2 w-full h-[51px] bg-[#FFF3F3] rounded-[10px] order-3 flex-grow-0'>
                        {specialities.map((speciality, index) => (
                            <div key={index} className={`flex flex-row text-[8px] font-semibold justify-center items-center py-2 px-2 gap-6 w-fit h-[20px] justify rounded-[21.8513px] order-3 flex-grow-0 bg-opacity-100`} style={{ backgroundColor: `${speciality.color}4D`, color: speciality.color }}>
                                {speciality.name}
                            </div>
                        ))}
                    </div>
                </div>
                <button type='submit' className='flex flex-row text-white text-xl justify-center items-center p-2 my-10 gap-2 w-full h-[48px] bg-primary rounded-[15px]'
                >Log in</button>
            </form>
        </div>
    )
}
