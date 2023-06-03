import Comparisons from './components/get-started/comparison.js'
import Closures from './components/get-started/closures.js'
import Prototypes from './components/get-started/prototypes.js'

import Scopes from './components/scopes-and-closures/scopes.js'
import Closure1 from './components/scopes-and-closures/closure1.js'

function App() {
  return (
    <div className="App">
    <h1>YDKJSY Practice</h1>
      <h2>Getting Started</h2>  
      <Comparisons />
      <Closures />
      <Prototypes />
      <h2>Scopes and Closures</h2>  
      <Scopes /> 
      <Closure1 />

    </div>
  );
}

export default App;