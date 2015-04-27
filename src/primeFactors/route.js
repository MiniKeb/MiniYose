var express = require("express");
var router = express.Router();
var run = require(__dirname + "/primeFactors.js");
var fs = require("fs");

router.get("/", function(request, response){ 
    var number = request.param("number");
    var result = run.primeFactors(number);
    response.json(result);
});
router.get("/ui", process)
router.post("/ui", process);

function process(request, response){
    var number = request.param("number");
    var results = [];
    if (number !== undefined){
        number = number.split(", ");
        var primeFactors = run.primeFactors(number);
        for(var i in primeFactors){
            results.push(getResult(primeFactors[i]));
        }
    }

    var lastDecomposition = {
        fileName : "memory.txt",
        read : function(){
            if (!fs.existsSync(lastDecomposition.fileName))
                return null;

            return fs.readFileSync(lastDecomposition.fileName);
        },
        write : function(text){
            fs.writeFileSync(lastDecomposition.fileName, text);
        }
    }

    var data = results.length > 1 ? { results: results } : { result: results[0] };

    data.previousDecomposition = lastDecomposition.read();
    lastDecomposition.write(results.join(", "));

    response.render("primeFactors/views/primeFactorsUi", data);
}

function getResult(primeFactor){
    if(primeFactor.error){
        return (primeFactor.number > 1000000) 
            ? primeFactor.error
            : primeFactor.number +" is "+ primeFactor.error;
    }else{
        return primeFactor.number +" = "+ primeFactor.decomposition.join(" x ");
    }
}

module.exports = router;