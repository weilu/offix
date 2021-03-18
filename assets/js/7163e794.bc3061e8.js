(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{106:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return r})),t.d(n,"metadata",(function(){return l})),t.d(n,"toc",(function(){return c})),t.d(n,"default",(function(){return s}));var i=t(3),o=t(7),a=(t(0),t(148)),r={id:"getting-started",title:"Getting Started",sidebar_label:"Getting Started"},l={unversionedId:"getting-started",id:"version-0.15.0/getting-started",isDocsHomePage:!1,title:"Getting Started",description:"Offix can be used with existing Apollo GraphQL applications as an extension to the Apollo Client.",source:"@site/versioned_docs/version-0.15.0/getting-started.md",slug:"/getting-started",permalink:"/docs/0.15.0/getting-started",editUrl:"https://github.com/aerogear/offix/edit/master/website/versioned_docs/version-0.15.0/getting-started.md",version:"0.15.0",sidebar_label:"Getting Started",sidebar:"version-0.15.0/docs",next:{title:"Client Configuration",permalink:"/docs/0.15.0/client-configuration"}},c=[{value:"Installing Offix Client",id:"installing-offix-client",children:[]},{value:"Using the Client inside your application",id:"using-the-client-inside-your-application",children:[]},{value:"Offix Client Boost",id:"offix-client-boost",children:[]},{value:"Working with client",id:"working-with-client",children:[]},{value:"Non Offline related API",id:"non-offline-related-api",children:[]}],p={toc:c};function s(e){var n=e.components,t=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(i.a)({},p,t,{components:n,mdxType:"MDXLayout"}),Object(a.b)("p",null,"Offix can be used with existing Apollo GraphQL applications as an extension to the Apollo Client.\nThe Offix Client provides additional methods that support various offline use cases. "),Object(a.b)("p",null,"Offix supports multiple platforms by extendable javascript library and individual wrappers for\nspecific web and cross platform frameworks. "),Object(a.b)("h2",{id:"installing-offix-client"},"Installing Offix Client"),Object(a.b)("p",null,"Using ",Object(a.b)("a",{parentName:"p",href:"https://www.npmjs.com/package/offix-client"},"npm"),":"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-shell"},"npm install offix-client\n")),Object(a.b)("p",null,"Or ",Object(a.b)("a",{parentName:"p",href:"https://yarnpkg.com/en/package/offix-client"},"yarn"),":"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-shell"},"yarn add offix-client\n")),Object(a.b)("h2",{id:"using-the-client-inside-your-application"},"Using the Client inside your application"),Object(a.b)("p",null,"To work with Offix you should create Offix client. "),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},"NOTE: Offix client extends Apollo Client - if you already using Apollo Client you would need to\nswap it with the Offix client implementation")),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-javascript"},"import { ApolloOfflineClient } from 'offix-client';\nimport { InMemoryCache } from 'apollo-cache-inmemory';\nimport { HttpLink } from \"apollo-link-http\";\n\nconst config = {\n  link: new HttpLink({ uri: 'http://example.com/graphql' })\n  cache: new InMemoryCache()\n};\n\n// create the client\nconst client = new ApolloOfflineClient(config);\n\n// initialise the client\n// Client needs to be installised before any other queries and mutations will happen.\n// Please see platform guide to see how this can be done in React, Angular etc.\nawait client.init();\n")),Object(a.b)("p",null,"The ",Object(a.b)("inlineCode",{parentName:"p"},"ApolloOfflineClient")," is a full ",Object(a.b)("inlineCode",{parentName:"p"},"ApolloClient")," but with some additional features for building offline workflows."),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Note")," ",Object(a.b)("inlineCode",{parentName:"p"},"client.init")," must be resolved before the application makes any queries/mutations, otherwise the cache and storage mechanisms may not work properly."),Object(a.b)("h2",{id:"offix-client-boost"},"Offix Client Boost"),Object(a.b)("p",null,"The ",Object(a.b)("inlineCode",{parentName:"p"},"offix-client-boost")," is a convenient way to create a client already bundled with all you need to work with GraphQL.\nMainly a cache and ",Object(a.b)("a",{parentName:"p",href:"https://www.apollographql.com/docs/link/"},"Apollo Links")," subscriptions and file uploads.\nOffix Boost is recomended if you trying to build your first GraphQL application and want to have seamless experience."),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-js"},"import { createClient } from 'offix-client-boost'\n\nconst config = {\n  httpUrl: 'http://example.com/graphql',\n  wsUrl: 'ws://example.com/graphql'\n}\n\nconst client = await createClient(config)\n")),Object(a.b)("h2",{id:"working-with-client"},"Working with client"),Object(a.b)("p",null,"Client will offer the same API as Apollo GraphQL client.\nOffix will supply additional methods that help with offline experience."),Object(a.b)("p",null,"The following example shows the ",Object(a.b)("inlineCode",{parentName:"p"},"client.offlineMutate()")," method which support sending new mutation while the application is considered offline. "),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-js"},"const options = {\n  mutation: gql`\n    mutation greeting($name: String!){\n    greeting(name: $name) {\n      body\n    }\n  }`,\n  variables: {\n    name: 'hello world!'\n  }\n};\n\nclient.offlineMutate(options).catch((error) => {\n  // we are offline - lets wait for changes\n  if(error.offline) {\n    error.watchOfflineChange().then((result) => {\n      console.log('mutation was completed after we came back online!', result)\n    })\n  }\n});\n")),Object(a.b)("p",null,"When offline, an error is returned with a reference to a promise which can be used to wait for the mutation to complete. This will happen when the application comes back online."),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"async/await")," can be used too."),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-js"},"try {\n  await client.offlineMutate(options)\n} catch(error) {\n  if(error.offline) {\n    const result = await error.watchOfflineChange()\n    console.log('mutation was completed after we came back online!', result)\n  }\n}\n")),Object(a.b)("h2",{id:"non-offline-related-api"},"Non Offline related API"),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"ApolloOfflineClient")," is an extension of the Apollo GraphQL client and can be used with various web and mobile frameworks.\nFor basic concepts about Apollo GraphQL please refer to the documentation for your own platform."),Object(a.b)("p",null,"For React:\n",Object(a.b)("a",{parentName:"p",href:"https://www.apollographql.com/docs/react/"},"https://www.apollographql.com/docs/react/")),Object(a.b)("p",null,"For Angular:\n",Object(a.b)("a",{parentName:"p",href:"https://www.apollographql.com/docs/angular/"},"https://www.apollographql.com/docs/angular/")))}s.isMDXComponent=!0},148:function(e,n,t){"use strict";t.d(n,"a",(function(){return f})),t.d(n,"b",(function(){return d}));var i=t(0),o=t.n(i);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,i,o=function(e,n){if(null==e)return{};var t,i,o={},a=Object.keys(e);for(i=0;i<a.length;i++)t=a[i],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)t=a[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var p=o.a.createContext({}),s=function(e){var n=o.a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},f=function(e){var n=s(e.components);return o.a.createElement(p.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return o.a.createElement(o.a.Fragment,{},n)}},b=o.a.forwardRef((function(e,n){var t=e.components,i=e.mdxType,a=e.originalType,r=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),f=s(t),b=i,d=f["".concat(r,".").concat(b)]||f[b]||u[b]||a;return t?o.a.createElement(d,l(l({ref:n},p),{},{components:t})):o.a.createElement(d,l({ref:n},p))}));function d(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var a=t.length,r=new Array(a);r[0]=b;var l={};for(var c in n)hasOwnProperty.call(n,c)&&(l[c]=n[c]);l.originalType=e,l.mdxType="string"==typeof e?e:i,r[1]=l;for(var p=2;p<a;p++)r[p]=t[p];return o.a.createElement.apply(null,r)}return o.a.createElement.apply(null,t)}b.displayName="MDXCreateElement"}}]);