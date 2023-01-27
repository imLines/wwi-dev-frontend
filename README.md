# Welcome to wwiDEV 

---
![Background](https://raw.githubusercontent.com/imLines/imLines/458bc5dcc37b7c99f673863f8c73675ce0f9ecc2/wwiDEV%20Logo%20black%20on%20white.svg)

---

# 👋🏻 Welcome to wwiDEV (frontend) 👋🏻

>This App has been developed to be accessed by web and mobile. 
It is intended to work with [wwiDEV Backend](https://github.com/imLines/wwi-dev-backend).
---

&nbsp;





## 💻 Languages/framework
>![JavaScript](https://img.icons8.com/color/48/null/javascript--v1.png) ![ViteJs](https://api.iconify.design/logos/vitejs.svg?width=48&height=48) ![ReactJs](https://img.icons8.com/color/48/null/react-native.png) ![TailwindCSS](https://api.iconify.design/logos/tailwindcss-icon.svg?width=48&height=48)




JavaScript - Vite.js - React.js - Tailwind CSS

&nbsp;

## Features
- Using a proxy to link to the API
- Using the firebase API for image management
- Using the tinymce API to make it easier to create articles

To know all the current features (as well as those in production) of wwiDEV, please refer to the [readme de wwiDEV Backend.](https://github.com/imLines/wwi-dev-backend)

## Getting started
1.Install all dependencies

    npm install
    
2.Configure Firebase './src/config/firebaseConfig.js'
Please refer to the [official Firebase documentation](https://firebase.google.com/docs?hl=fr) to perform this operation

``` js
export const firebaseConfig = {
    apiKey: yourAPIkey,
    authDomain: yourDomain,
    databaseURL: urlOfYourFirebaseDatabase,
    projectId: yourProjectID,
    storageBucket: yourStorageBucket,
    messagingSenderId: yourMessagindSenderID(default: "no"),
    appId: yourAppID,
  };
```
3.Configure proxy of the NodeJS application './src/config/hostName.js' (wwiDEV API) 
``` js
const hostName = 'hostName-IP-HERE';
export default hostName;
```
4.Configure proxy of the React application './src/config/hostReactApp.config.js' 
(This change is important because it allows articles to be shared from the React url)
``` js
const hostReactApp = 'hostName-react-HERE';
export default hostReactApp
```
5.Start building the application
    
    vite build
