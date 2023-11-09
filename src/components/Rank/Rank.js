import React from 'react';

const Rank = ({ name, entries }) => {
    return (
        <div className='white-90'>
            <div className='tc f3'>
                {`${name}, Your current entry count is:`}
            </div>
            <div className='tc f1'>
                {entries}
            </div>
        </div>
    )
}

export default Rank;