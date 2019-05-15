(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{132:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(13),s=a.n(o),l=a(21),i=a.n(l),c=(a(81),a(22)),u=a(23),h=a(25),m=a(24),p=a(26),g=a(56),k=a(33),f=a.n(k),d=a(27),E=a.n(d),b=a(17),y=a.n(b),C=a(52),P=a.n(C),v=a(32),w=a.n(v),I=a(55),O=a.n(I),B=a(8),_=a.n(B),j=a(51),L=a.n(j),N=function(e){var t=e.books.map(function(e){return r.a.createElement("tr",{key:e.id},r.a.createElement("td",null,e.id),r.a.createElement("td",null,e.book_title),r.a.createElement("td",null,e.book_author),r.a.createElement("td",null,e.book_pages),r.a.createElement("td",null,e.book_publication_city),r.a.createElement("td",null,e.book_publication_country),r.a.createElement("td",null,e.book_publication_year))});return r.a.createElement(L.a,{striped:!0,bordered:!0,hover:!0,responsive:"md"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"ID"),r.a.createElement("th",null,"Title"),r.a.createElement("th",null,"Author"),r.a.createElement("th",null,"Pages"),r.a.createElement("th",null,"Publication City"),r.a.createElement("th",null,"Publication Country"),r.a.createElement("th",null,"Publication Year"))),r.a.createElement("tbody",null,t))},S=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(h.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={history:Object(g.a)({basename:window.location.pathname}),books:[],numberOfBooks:0,itemsPerPage:0,pages:0,page:1,search:""},a.getListOfBooks=function(e,t,n){var r=[];n.length&&(r=[{type:"all",values:[n]}]),t>50||isNaN(t)?t=50:t<1&&(t=1),(e<1||isNaN(e))&&(e=1),i.a.post("/api/books",{page:e,itemsPerPage:t,filters:r}).then(function(r){var o=r.data.count,s=Math.ceil(o/t);a.setState({books:r.data.books,numberOfBooks:o,pages:s,page:e,itemsPerPage:t,search:n}),n.length?a.state.history.push("/?search="+n+"&p="+e+"&items="+t):a.state.history.push("/?p="+e+"&items="+t)})},a.handleChangePage=function(e){a.getListOfBooks(e,a.state.itemsPerPage,a.state.search)},a.handleChangeItemsPerPage=function(e){a.getListOfBooks(1,e,a.state.search)},a.handleSearch=function(){var e=document.querySelector("#search").value,t=a.state.history.location,n=f.a.parse(t.search),r=parseInt(n.items);a.getListOfBooks(1,r,e)},a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this.state.history.location;if(e.search){var t=f.a.parse(e.search),a=parseInt(t.p),n=parseInt(t.items),r=t.search?t.search:"";this.getListOfBooks(a,n,r)}else this.getListOfBooks(1,20,[])}},{key:"render",value:function(){var e=this,t=[],a=this.state.pages,n=a>10,o=this.state.page;if(n&&o<10){for(var s=function(a){t.push(r.a.createElement(_.a.Item,{key:a,active:a===o,onClick:function(){return e.handleChangePage(a)}},a))},l=1;l<=10;l++)s(l);t.push(r.a.createElement(_.a.Ellipsis,{key:"..."})),t.push(r.a.createElement(_.a.Last,{key:"last-page",onClick:function(){return e.handleChangePage(a)}}))}else if(n&&o>=10&&o<a-5){t.push(r.a.createElement(_.a.First,{key:"first-page",onClick:function(){return e.handleChangePage(1)}})),t.push(r.a.createElement(_.a.Ellipsis,{key:"...-01"}));var i=function(a){t.push(r.a.createElement(_.a.Item,{key:a,active:a===o,onClick:function(){return e.handleChangePage(a)}},a))};for(l=o-5;l<=o+5;l++)i(l);t.push(r.a.createElement(_.a.Ellipsis,{key:"...-02"})),t.push(r.a.createElement(_.a.Last,{key:"last-page",onClick:function(){return e.handleChangePage(a)}}))}else if(n&&o>=10&&o>=a-5){t.push(r.a.createElement(_.a.First,{key:"first-page",onClick:function(){return e.handleChangePage(1)}})),t.push(r.a.createElement(_.a.Ellipsis,{key:"..."}));var c=function(a){t.push(r.a.createElement(_.a.Item,{key:a,active:a===o,onClick:function(){return e.handleChangePage(a)}},a))};for(l=a-6;l<=a;l++)c(l)}else{var u=function(a){t.push(r.a.createElement(_.a.Item,{key:a,active:a===o,onClick:function(){return e.handleChangePage(a)}},a))};for(l=1;l<=a;l++)u(l)}var h=null;return this.state.search.length&&(h=r.a.createElement("p",{className:E.a.ResultsInfo},"Search results for ",r.a.createElement("b",null,this.state.search,", ",this.state.numberOfBooks," results found."))),r.a.createElement("section",{className:E.a.ViewBooks},r.a.createElement("section",{className:E.a.Controls},r.a.createElement(P.a,{id:"dropdown-basic-button",title:"Items per page: "+this.state.itemsPerPage},r.a.createElement(y.a.Item,{onClick:function(){return e.handleChangeItemsPerPage(5)}},"5"),r.a.createElement(y.a.Item,{onClick:function(){return e.handleChangeItemsPerPage(10)}},"10"),r.a.createElement(y.a.Item,{onClick:function(){return e.handleChangeItemsPerPage(20)}},"20"),r.a.createElement(y.a.Item,{onClick:function(){return e.handleChangeItemsPerPage(50)}},"50")),r.a.createElement(O.a.Control,{type:"text",id:"search",maxLength:"200"}),r.a.createElement(w.a,{onClick:this.handleSearch,variant:"primary"},"Search")),h,r.a.createElement(N,{books:this.state.books,pages:this.state.pages,page:this.state.page}),r.a.createElement(_.a,null,t))}}]),t}(n.Component),V=function(e){function t(){return Object(c.a)(this,t),Object(h.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement(S,null)}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.defaults.baseURL="https://cors-anywhere.herokuapp.com/http://nyx.vima.ekt.gr:3000/",s.a.render(r.a.createElement(V,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},27:function(e,t,a){e.exports={ViewBooks:"ViewBooks_ViewBooks__2QHbk",Controls:"ViewBooks_Controls__3-rSC",ResultsInfo:"ViewBooks_ResultsInfo__3qkKB"}},57:function(e,t,a){e.exports=a(132)},81:function(e,t,a){}},[[57,1,2]]]);
//# sourceMappingURL=main.4764350f.chunk.js.map