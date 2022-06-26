import path from 'path'
import fs from 'fs'

function read (name) {
    let data = fs.readFileSync(path.join(process.cwd(),'src', 'database', name + '.json'), 'utf-8')
    return JSON.parse(data) || null
}

function write(filename, data) {
    fs.writeFileSync(path.join(process.cwd(), 'src', 'database', filename + '.json'), JSON.stringify(data, null , 4))
    return true
}

export {
    read, write
}