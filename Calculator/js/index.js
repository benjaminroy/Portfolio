$(".btn").click(function(){
  var input = $(this).text();
  if(isOperand(input) || isOperator(input) || input == "."){
    $(".displayResults").text($(".displayResults").text() + input);
  }
  else if(input=== "="){
    calculateAnswer($(".displayResults").text());
  }
  else if(input === "AC"){
    eraseAll();
  }
  else if(input === "CE"){
    eraseLastChar();
  } 
});

function calculateAnswer(exp){
  /*const m_analLex = new AnalLex(exp);
  while(m_analLex.nextTerminal() != ""){*/
  
  var term1 = new Terminal("28");
	var feuille1 = new LeafAST(term1);
	
	/*const term2 = new Terminal("2");
	const feuille2 = new LeafAST(term2);
	
	const op = new Terminal("+");
	const n1= new NodeAST(op,feuille1,feuille2*/
    
  alert(feuille1.LectAST());
  
}

function eraseAll(){
  $(".displayResults").text("");
}

function eraseLastChar(){
  var val = $(".displayResults").text();
  val = val.substring(0, val.length-1)
  $(".displayResults").text(val);
}

function isOperand(val){
  return !isNaN(val);
}

function isOperator(op){
  if(op === '/' || op === '+' || op === '*' || op === '-')
    return true;
  else
    return false;
}

class AnalLex {
  constructor(exp) {
    this.pointer = 0;
    this.exp = exp;
  }
  
  isAllRead(){
    if(this.pointer < this.exp.length)
      return false;
    return true;
  }
  
  nextTerminal(){
    var terminal = "";
    while(this.pointer < this.exp.length){
      var nextChar = this.exp[this.pointer];
      if(isOperator(nextChar)){
        terminal += nextChar;
        this.pointer++;
        return terminal;
      }
      else if(isOperand(nextChar)){
        while(isOperand(nextChar)){
          terminal += nextChar;
          this.pointer++;
          nextChar = this.exp[this.pointer];
        }
        return terminal;
      }
      else{
        // Error: no terminal found;
        return "";
      }
    }
    return "";
  }  
}








class Terminal{
  constructor(value){
    this.value = value;
  }
  getValue(){
    return this.value;
  }
}

class ElemAST{
  constructor(){}
  LectAST(){}
}

class LeafAST{
  constructor(terminal){
    this.terminal = new Terminal;
    this.terminal = terminal;
  }
  LectAST(){
    return this.terminal.getValue();
  }
}

class NodeAST{
  constructor(terminal, leftExp, rightExp){
    this.operator = new Terminal;
    this.operator = terminal;
    this.leftExp = leftExp;
    this.rightExp = rightExp;
  }
  EvalAST(){
    var result = 0;
    if(this.operator == "+"){
      result = this.leftExp.EvalAST + this.rightExp.EvalAST;
    }
    else if(this.operator == "-"){
      result = this.leftExp.EvalAST - this.rightExp.EvalAST;
    }
    else if(this.operator == "*"){
      result = this.leftExp.EvalAST * this.rightExp.EvalAST;
    }
    else if(this.operator == "/"){
      result = this.leftExp.EvalAST / this.rightExp.EvalAST;
    }
    return result;
  }
  LectAST(){
    var result = "(" + this.leftExp.LectAST() + this.operator.terminal + this.rightExp + ")";
		return result;
  }
}