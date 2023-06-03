import React from 'react'

const scopes = () => {

  // global
  var fruit = ['apple', 'banana', 'orange'];
  var vegetables = ['spinach', 'celery', 'broccoli', 'lettuce'];

  var minLength = getMaxLength([fruit, vegetables]);

  function padEntries(arr){
    // function
    for(let arrIndex = 0; arrIndex < arr.length; arrIndex++){
        // block
        if(arr[arrIndex].length < minLength){
            let padding= '';
            for(let padCount = 0; padCount < minLength - arr[arrIndex].length; padCount++){
                // block
                padding += '_';
            }
            arr[arrIndex] = padding + arr[arrIndex];
        }
    }
    return arr;
  }

  function getMaxLength(arr){
    // function
    var count = 0;
    for(let arrs = 0; arrs < arr.length; arrs++){
        // block
        for(let arrIndex = 0; arrIndex < arr[arrs].length; arrIndex++){
            // block
            if(arr[arrs][arrIndex].length > count) count = arr[arrs][arrIndex].length;
        }
    }
    return count;
  }

  return (
    <>
        <h3>Scope</h3>

        <p>Fruit</p>
        <ul>
            {padEntries(fruit).map(function listFruit(fruit){ // shadowing fruit
                // function
                return (<pre><li>{fruit}</li></pre>)
            })}
        </ul>

        <p>Vegetable</p>
        <ul>
            {padEntries(vegetables).map(function listVegetables(vegetable){
                // function
                return (<pre><li>{vegetable}</li></pre>)
            })}
        </ul>
    </>
  )
}

export default scopes