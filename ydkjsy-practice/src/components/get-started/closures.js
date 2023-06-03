import React from 'react'

const closures = () => {

    function range(start,end) {
        if(end !== undefined) {
            return getRange(start, end)
        }
        return x => {
            return getRange(start, x)
        }
        
        function getRange(s, e){
            if(e < s){
                return [];
            }
            return [...Array(e-s+1).keys()].map((num) => num+s)
        }
    }

    var start3 = range(3);
    var start4 = range(4);

  return (
    <>
        <h3>Closures</h3>
        <ul>
            <li><pre>range(3,3);  {JSON.stringify(range(3,3))}</pre></li> 
            <li><pre>range(3,8);  {JSON.stringify(range(3,8))}</pre></li> 
            <li><pre>range(3,0);  {JSON.stringify(range(3,0))}</pre></li> 

            <li><pre>start3(3);   {JSON.stringify(start3(3))}</pre></li> 
            <li><pre>start3(8);   {JSON.stringify(start3(8))}</pre></li> 
            <li><pre>start3(0);   {JSON.stringify(start3(0))}</pre></li> 
            
            <li><pre>start4(6);   {JSON.stringify(start4(6))}</pre></li>
        </ul>
    </>
  )
}

export default closures