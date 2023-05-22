import React from 'react'

const comparison = () => {

    const dayStart = "07:30";
    const dayEnd = "17:45";
    
    function scheduleMeeting(startTime,durationMinutes) {
      let inRange = false;
      if(Number(startTime.split(':')[0]) > Number(dayStart.split(':')[0]) || 
            (Number(startTime.split(':')[0]) === Number(dayStart.split(':')[0]) && 
              Number(startTime.split(':')[1]) >= Number(dayStart.split(':')[1]))
      ){
        let hourOffset = Number(durationMinutes) >= 60 ? 1 : 0;
        let adjustedMinutes = Number(durationMinutes) >= 60 ? Number(durationMinutes) - 60 : Number(durationMinutes);
        if(Number(startTime.split(':')[0]) + hourOffset < Number(dayEnd.split(':')[0]) || 
              (Number(startTime.split(':')[0]) + hourOffset === Number(dayEnd.split(':')[0]) && 
                Number(startTime.split(':')[1]) + adjustedMinutes <= Number(dayEnd.split(':')[1]))
        ){
          inRange = true;
        }
      }
      return inRange;
    }
  
  return (
    <>
        <h2>Comparisons</h2>
        <h4>{dayStart}~{dayEnd}</h4>
        <ul>
            <li><pre>"7:00" 15   {JSON.stringify(scheduleMeeting("7:00",15))}</pre></li> 
            <li><pre>"07:15" 30  {JSON.stringify(scheduleMeeting("07:15",30))}</pre></li>
            <li><pre>"7:30" 30   {JSON.stringify(scheduleMeeting("7:30",30))}</pre></li>
            <li><pre>"11:30" 60  {JSON.stringify(scheduleMeeting("11:30",60))}</pre></li>
            <li><pre>"17:00" 45  {JSON.stringify(scheduleMeeting("17:00",45))}</pre></li>
            <li><pre>"17:30" 30  {JSON.stringify(scheduleMeeting("17:30",30))}</pre></li>
            <li><pre>"18:00" 15  {JSON.stringify(scheduleMeeting("18:00",15))}</pre></li>
        </ul>
    </>
  )
}

export default comparison