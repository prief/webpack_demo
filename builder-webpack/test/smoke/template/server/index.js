if(typeof window ==="undefined"){
  global.window = {}
}
const fs = require('fs');
const path = require('path');
const express = require('express')
const { renderToString } = require('react-dom/server')
const SSR = require('../dist/search-server');
console.log("ssr",SSR)
const template = fs.readFileSync(path.join(__dirname,'../dist/search.html'),'utf8');
const data = require('./data.json');
const server = (p)=> {
  const app = express();
  app.use(express.static('dist'));
  
  app.get('/search',(req,res)=>{
    const html =renderMarkup(renderToString(SSR))
    res.status(200).send(html)
  })
  app.listen(p,()=>{
    console.log('server is running on port ',p)
  })
}

const renderMarkup = (str)=>{
  const dataStr = JSON.stringify(data);
  return  template.replace('<!--HTML_PLACEHOLDER-->',str)
    .replace('<!--INITIAL_DATA_PLACEHOLDER-->',`<script>window.__initial_data=${dataStr}</script>`);
}

server(process.env.PORT || 3000);