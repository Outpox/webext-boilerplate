### webext-boilerplate

This project scaffolds a typescript webextension project for you.  
It allows you to develop once and target all the current major browsers such as Chrome, Firefox (52+), Edge, Opera, Vivaldi, etc. (Basically any browser that supports [WebExtensions](https://developer.mozilla.org/en-US/Add-ons/WebExtensions))  

This project uses [fuse-box](https://fuse-box.org) as its module bundler.


#### Data structure
```
├── builds/             # Builds are stored here
├── dist                # Dev folder
│   ├── css
│   ├── fonts
│   ├── html
│   ├── img
│   ├── js
│   └── manifest.json   
├── src                 # You'll mainly work within this folder
│   ├── build
│   │   ├── default_manifest.json   # Main manifest file
│   │   ├── chrome.json             # Chrome specific options
│   │   └── firefox.json            # Firefox specific options
│   ├── background.ts
│   ├── content.ts
│   ├── panel.ts
│   ├── popup.ts
│   └── types/          # Typescript typedef folder
├── fuse.js             # Build and compile your sources
├── build.js            # Build and packages files
└── tsconfig.json       # Typescript config file
```
 

#### `builds/`  
When you run `npm run build` the resulting files will be stored there. You will find a folder for each browser you support and a zip file containing the folder content, ready to be uploaded on the web stores.  
  
#### `dist/`
Every static files should be put there. You should not edit the `manifest.json` as it will be overwritten when building or developping.
When you reference files (in HTML for exemple), the `dist` folder is the root folder. Let's say you want to refer to a CSS file in your HTML, the correct way to do so is:  

`dist/css/my_css_file.css`
```css
html, body {
    margin: 0;
    padding: 0;
}
```

`dist/html/popup.html`
```html
<link rel="stylesheet" href="../css/my_css_file.css">
```  
  
#### `src/`
##### `src/build/`
The `default_manifest.json` file is the manifest you are supposed to change. When running in development mode (with `npm run dev`) any change to this file will update `dist/manifest.json`.  
If you use Visual Studio Code, you should have intellisense available in the manifest.
  
`chrome.json` and `firefox.json` allow you to set custom settings based on the browser.  
A good example to demonstrate this is the `options_ui` property. In chome, if set, this property expects a `chrome_style` property whereas it's `browser_style` in Firefox. To solve this issue you can do so:  
  
`chrome.json`  
```json
{
    "options_ui": {
        "chrome_style": false,
        "page": "html/options.html"
    }
}
```
  
`firefox.json`
```json
{
    "options_ui": {
        "browser_style": false,
        "page": "html/options.html"
    }
}
```

When building, each target will have its `manifest.json` merged with this files.  
  
##### `src/types/`
Save your custom typing files in this folder.  
If you use Visual Studio Code (or if your editor handles it) you will have the webextension typings available anywhere in your project.  
It is available within the `browser` api.  
    
The typings comes from [kelseasy/web-ext-types](https://github.com/kelseasy/web-ext-types) (thanks!).