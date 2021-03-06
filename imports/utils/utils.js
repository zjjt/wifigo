const R= require('ramda');

Array.prototype.sum=(prop)=>{
    let total=0;
    for(let i=0,_len=this.length;i<_len;i++){
        total+=this[i][prop];
    }
    return total;
};
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
//compare deux tableaux pour verifier l'egalite
let arrAreSame=(arr1,arr2)=>{
    let inArray=(array,el)=>{
        for(let i=array.length;i--;){
            if(array[i]===el)return true;
        }
        return false;
    };

    if(arr1.length!==arr2.length){
        return false;
    }
    for(let i=arr1.length;i--;){
        if(!inArray(arr2,arr1[i])){
            return false;
        }
    }
    return true;
}

let transformInFrenchDate=(e)=>{
    let day=e.substring(6);
    let mois=e.substring(4,6);
    let year=e.substring(0,4);
    let date=`${day}/${mois}/${year}`;
    return date;
};
let englishToFrenchDate=(e)=>{
    let day=e.substring(6);
    let mois=e.substring(4,6);
    let year=e.substring(0,4);
    let date=`${day}/${mois}/${year}`;
    return date;
};
let convertInDateObjFromFrenchDate=(e)=>{
    let day=e.substring(0,2);
    let mois=e.substring(3,5);
    let year=e.substring(6);
    console.log(new Date(year,--mois,day));
    return new Date(year,--mois,day);
};
export const DAYS_IN_MONTH = [null, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

function daysInMonth(year, month) {
    // isValidDate checked that year and month are integers already.

    // February of leap years. Assumes that the Gregorian calendar extends
    // infinitely in the future and in the past.
    if (month === 2 && (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0))) {
        return 29
    }

    // Everything else.
    return DAYS_IN_MONTH[month]
}

export function isValidDate(year, month, day) {
    day=parseInt(day,10);
    month=parseInt(month,10);
    year=parseInt(year,10);
    console.log(day+"-"+month+"-"+year);
    return (
        // Check that year, month and day are integers. Deals with NaN.
        year === Math.round(year) && month === Math.round(month) && day === Math.round(day) &&
        // Any year is valid. Check that month and day are valid.
        month >= 1 && month <= 12 && day >= 1 && day <= daysInMonth(year, month)
    )
}

let convertInTextFromFrenchDate=(e)=>{
    let day=e.substring(0,2);
    let mois=e.substring(3,5);
    let year=e.substring(6);
//alert(isValidDate(year,mois,day))    
    if(isValidDate(year,mois,day))
    return year+mois+day;
    else{
        alert("Veuillez fournir une date valide");
        location.reload()
    }
}

let formatNumberInMoney=(x)=>{
    let parts=x.toString().split(".");
    parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,",");
    return parts.join(".");
}
//require Ramda to work
const groupByLibel=R.compose(
					R.forEach((v)=>{
						//alert(R);j
							return v;		
					}),
					R.values,
					R.groupBy(R.compose(
							R.join(''),
							R.reject(R.isNil),
							R.props(['ref','libelle'])
						))
				);
//Groupe et somme un element par des propriete ...entierement en es6
/**
 * appelle la fonction en faisant correspondre toutes les proprietes
 * groupSymBySymbole(arr,["prop1","prop2","...propN"],[propOuEffectuerLaSomme])
 */
const groupSumBySymbole=(arr,propAgrouper,propAsum)=>{
    var newArray,key,processRecord;
    processRecord=(item)=>{
        var key,getkey,sumFields,record;
        getkey=(field)=>{
            key+=item[field];
        };
        sumFields=(field)=>{
            //alert(typeof item[field])
            let convitem=item[field]!==""?parseInt(item[field],10):0;
            record[field]+=convitem;
            //alert("rec:"+record[field])
        };

        key="";
        propAgrouper.forEach(getkey);
        if(newArray.has(key)){ 
            record=newArray.get(key);
            if(record.hasOwnProperty(propAsum)){
                record[propAsum]=parseInt(record[propAsum],10);
            }
            //record=parseInt(record,10);
            propAsum.forEach(sumFields);
        }else{
            newArray.set(key,item);
        }
    };
    newArray=new Map();
    arr.forEach(processRecord);
    return ([...newArray.values()]);
}

export {validateEmail,arrAreSame,transformInFrenchDate,formatNumberInMoney,groupByLibel,groupSumBySymbole,convertInDateObjFromFrenchDate,convertInTextFromFrenchDate,englishToFrenchDate};