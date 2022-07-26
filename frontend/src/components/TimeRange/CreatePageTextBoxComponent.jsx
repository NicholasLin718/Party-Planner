import React from 'react';

const CreatePageTextBoxComponent = (props) => {
    const { onChangeHandler, placeholderText, labelText } = props;
    return (
        <div className='block p-5'>
            <label className='font-mono font-semibold text-3xl'>
                {labelText}
            </label>
            <input
                type='text'
                onChange={onChangeHandler}
                placeholder={placeholderText}
                className='w-full px-2 py-2 text-xl font-medium font-mono shadow-sm border-b-2 border-b-slate-600
        focus:outline-none focus:border-b-2 focus:border-b-rose-400 bg-[#faf0ef]'
            />
        </div>
    );
};

export default CreatePageTextBoxComponent;
