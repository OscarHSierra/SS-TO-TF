var Fraction = algebra.Fraction;
var Expression = algebra.Expression;
var Equation = algebra.Equation;

var a11= document.getElementById("input_a11");
var a12= document.getElementById("input_a12");
var a21= document.getElementById("input_a21");
var a22= document.getElementById("input_a22");
var b1= document.getElementById("input_b1");
var b2= document.getElementById("input_b2");
var c1= document.getElementById("input_c1");
var c2= document.getElementById("input_c2");
var d= document.getElementById("input_d");
var a= document.getElementById("input_a");
var c= document.getElementById("input_c");

var boton=document.getElementById("boton");
var r3=document.getElementById("resultado3");
var r2=document.getElementById("resultado2");
var r=document.getElementById("resultado");


function calcular(){
    
    if(a11.value==""||NaN ||a12.value==""||NaN ||a21.value==""||NaN ||a22.value==""||NaN ||b1.value==""||NaN ||b2.value==""||NaN ||c1.value==""||NaN ||c2.value==""|| NaN||d.value==""||NaN)
    {
        r.innerHTML="No deje casillas vacias";
    }

    else if (c1.value > 0 || c1.value <= 0)
    {
      function calcularFuncionDeTransferencia(A, B, C, D) {
        // Crear la matriz identidad 2x2 con la variable simbólica 's'
        var s = new algebra.parse('s');
        var I = [
          [new algebra.parse("1"), new algebra.parse("0")],
          [new algebra.parse("0"), new algebra.parse("1")]
      ];
      
      // Calcular la matriz (sI - A)
      var sI_minus_A = [];
      for (let i = 0; i < 2; i++) {
          sI_minus_A[i] = [];
          for (let j = 0; j < 2; j++) {
              sI_minus_A[i][j] = new algebra.parse(`(${s})*(${I[i][j]}) - (${A[i][j]})`).simplify();
          }
      }
      r3.innerHTML="                    "+sI_minus_A[0][0].toString()+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+sI_minus_A[0][1].toString()+"<br/>"+"(s*I-A)="+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>"+sI_minus_A[1][0].toString()+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+sI_minus_A[1][1].toString();
      // Calcular el determinante de (sI - A)
      var det = new algebra.parse(`(${sI_minus_A[0][0]})*(${sI_minus_A[1][1]}) - (${sI_minus_A[0][1]})*(${sI_minus_A[1][0]})`).simplify();
  
      // Calcular el adjunto de (sI - A)
      var adjunto = [
          [sI_minus_A[1][1], new algebra.parse(`0 - (${sI_minus_A[0][1]})`)],
          [new algebra.parse(`0 - (${sI_minus_A[1][0]})`), sI_minus_A[0][0]]
      ];
      r2.innerHTML="                    "+adjunto[0][0].toString()+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+adjunto[0][1].toString()+"<br/>"+"(s*I-A)^-1="+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>"+adjunto[1][0].toString()+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+adjunto[1][1].toString();
      console.log(adjunto.toString());
      // Calcular C * adjunto * B
      var C_adj = multiplicarMatrices(C, adjunto);
      var numerador = multiplicarMatrices(C_adj, B)[0][0].simplify();  // Se obtiene el único elemento
  
      // Añadir la contribución de la matriz D
      var D_contribucion = D[0][0].simplify();
      numerador = new algebra.parse(`(${numerador}) + (${D_contribucion}*(${det}))`).simplify();
        // Calcular la función de transferencia G(s) como fracción (numerador/denominador)
        var Gs = `(${numerador.toString()}) / (${det.toString()})`;
        r.innerHTML="          "+numerador.toString() +"<br/>"+ "G(s)=" + "----------------------------------------------------------------------<br/>"+det.toString(); 
        return Gs;
    }

    function multiplicarMatrices(matriz1, matriz2) {
        var resultado = [];
        for (let i = 0; i < matriz1.length; i++) {
            resultado[i] = [];
            for (let j = 0; j < matriz2[0].length; j++) {
                let suma = new algebra.parse("0");
                for (let k = 0; k < matriz2.length; k++) {
                    suma = new algebra.parse(`(${suma}) + (${matriz1[i][k]})*(${matriz2[k][j]})`).simplify();
                }
                resultado[i][j] = suma;
            }
        }
        return resultado;
    }
    
    var A = [
        [new algebra.parse(a11.value), new algebra.parse(a12.value)],
        [new algebra.parse(a21.value), new algebra.parse(a22.value)]
    ];
    
    var B = [
        [new algebra.parse(b1.value)],
        [new algebra.parse(b2.value)]
    ];
    
    var C = [
        [new algebra.parse(c1.value), new algebra.parse(c2.value)]
    ];
    
    var D = [
        [new algebra.parse(d.value)]
    ];

    var funcionTransferencia = calcularFuncionDeTransferencia(A, B, C, D);
    console.log("Función de transferencia G(s):", funcionTransferencia);

    }
    else
    {   
        r.innerHTML="Error de parametros";
    }
}

boton.addEventListener("click",calcular);