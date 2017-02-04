/**
 * Created by 扬 on 2017/1/25.
 */

module.exports = {
    setObjVal: setObjVal
}
function setObjVal(obj,props,value,idx){
    if(!idx) idx = 0
    if(!angular.isArray(props)){
        props = props.split('.')
    }
    var prop = props[idx]
    var arrMatch = /^(.*)\[([0-9]+)\]$/
    var el = prop.match(arrMatch)
    if(el){
        if(!angular.isArray(obj[el[1]])){
            obj[el[1]] = []
        }
        if(idx < props.length - 1){
            if(!obj[el[1]][el[2]]) obj[el[1]][el[2]] = {}
            return setObjVal(obj[el[1]][el[2]],props,value,idx+1)
        }
        else obj[el[1]][el[2]] = value
    }else{
        if(idx < props.length - 1){
            if(!obj[prop]) obj[prop] = {}
            return setObjVal(obj[prop],props,value,idx+1)
        }
        else obj[prop] = value
    }
    return value
}