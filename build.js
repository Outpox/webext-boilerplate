const fs = require('fs-extra')
const path = require('path')
const zipDir = require('zip-dir')

const buildFolder = './builds'
const distFolder = './dist'

const defaultManifest = require('./src/build/default_manifest.json')

fs.removeSync(buildFolder)

// Create the build destination folder if it doesn't exist
try {
  fs.accessSync(buildFolder)
} catch (e) {
  fs.mkdirSync(buildFolder)
}

buildTarget('firefox')
buildTarget('chrome')

function buildTarget (target) {
  const targetFolder = path.join(buildFolder, target)
  const targetProperties = require(`./src/build/${target}.js`)
  const targetManifest = Object.assign({}, defaultManifest, targetProperties)

  fs.mkdirSync(targetFolder)
  fs.copy(distFolder, targetFolder)
    .then(() => {
      fs.writeJsonSync(path.join(targetFolder, 'manifest.json'), targetManifest, { spaces: 2 })
      zipDir(targetFolder, { saveTo: `${targetFolder}/../${target}.zip` }, err => { if (err) console.error(err) })
    })
}
