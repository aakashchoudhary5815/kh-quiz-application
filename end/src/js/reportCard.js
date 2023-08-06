    const iscorrect =(obj) => {
        let selected = Number(obj["selected"]);
        if (obj["options"][selected] === obj["answer"]) {
            return true;
        }
        else return false ;
    }

    export const  evaluateAnswers = (data, type) => {
        const array1 = data[type];
        const sumWithInitial = array1.reduce(
        (accumulator, currentValue) => {
            if (iscorrect(currentValue)){
                
                return accumulator+1
            }
            else {
                return accumulator};
        },0);
        return sumWithInitial;
    }


 