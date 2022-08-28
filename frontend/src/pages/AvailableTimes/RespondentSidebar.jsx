import React, { useRef, useState } from 'react';
import RespondentSidebarSlot from './RespondentSidebarSlot';
const RespondentSidebar = (props) => {
    const {
        users,
        availableRespondentList,
        allRespondentsList,
        showSelector,
        showUsers,
        setSelectedIndividual,
        setShowIndividual
    } = props;
    return (
        <div className='w-[250px]'>
            {!showSelector && showUsers && (
                <div className='font-mono text-2xl font-bold'>
                    Respondents{' ('}
                    {availableRespondentList.length +
                        '/' +
                        allRespondentsList.length}
                    {')'}
                </div>
            )}
            {!showSelector && !showUsers && (
                <div className='font-mono text-2xl font-bold'>
                    Respondents{' ('}
                    {allRespondentsList.length}
                    {')'}
                </div>
            )}
            {showSelector && (
                <div className='font-mono text-2xl font-bold'>
                    Respondents{' ('}
                    {allRespondentsList.length}
                    {')'}
                </div>
            )}
            {users.map((user, i) => {
                if (
                    !allRespondentsList.some(
                        (e) => e.username === user.username
                    )
                )
                    return;
                return (
                    <div>
                        {showUsers && (
                            <RespondentSidebarSlot
                                key={i}
                                // setRepondentCount={setRepondentCount}
                                // respondentCount={respondentCount}
                                user={user}
                                availableRespondentList={
                                    availableRespondentList
                                }
                                setSelectedIndividual={setSelectedIndividual}
                                setShowIndividual={setShowIndividual}
                            />
                        )}
                        {!showUsers && (
                            <RespondentSidebarSlot
                                key={i}
                                // setRepondentCount={setRepondentCount}
                                // respondentCount={respondentCount}
                                user={user}
                                availableRespondentList={users}
                                setSelectedIndividual={setSelectedIndividual}
                                setShowIndividual={setShowIndividual}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default RespondentSidebar;
