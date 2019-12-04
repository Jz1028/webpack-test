import React from 'react';
import ReactDom from 'react-dom';

function Index() {
  return (
<div>index </div>
  );
}

function Ass() {
  return (
<div>asd </div>
  );
}


function App() {
  return (
<div>
<Index></Index><Ass></Ass>
</div>
  );
}

ReactDom.render(<App/>, document.querySelector('#root'));
