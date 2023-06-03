import React from 'react'

const closure2 = () => {

    function toggle(...args) {
        var index = 0;
        return function toggleAndReturn() {
            if(args.length === 0) return undefined; 
            let ret = args[index];
            index++;
            if(index >= args.length) index = 0;
            return ret;
        }
    }
    
    var hello = toggle("hello");
    var onOff = toggle("on","off");
    var speed = toggle("slow","medium","fast");
    
  return (
    <>
      <h3>Closure2</h3>
      <ul>
        <li>{hello()}</li>
        <li>{hello()}</li>
        <li>{onOff()}</li>
        <li>{onOff()}</li>
        <li>{onOff()}</li>
        <li>{speed()}</li>
        <li>{speed()}</li>
        <li>{speed()}</li>
        <li>{speed()}</li>
      </ul>
    </>
  )
}

export default closure2