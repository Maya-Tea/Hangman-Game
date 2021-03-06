    var words;
    var word;
    var txt;
    var wins=0;
    var losses=0;
    var guessesLeft;
    var rightGuess=[];
    var wrongGuess=[];
    var haveGuessed=[];
    var numWrongGuesses=0;
   
    
    var qwerty=["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M"];
    words=["PARABOLA", "SINE|WAVE", "DERIVATIVE","ACUTE|ANGLE","PYTHAGOREAN|THEOREM", "DOUBLE|INTEGRAL","LOWEST|COMMON|DENOMINATOR","FUNCTION","INVERSE","PENTAGON","PRIME|NUMBER", "CENTRAL|LIMIT|THEOREM","REIMAN|SUM", "RATE OF CHANGE", "ARCCOSINE", "SLOPE","TANGENT|LINE", "SUBTRACTION", "FRACTION", "CUBED", "POWER","DIVISOR","MULTIPLIER","TRIANGLE","RHOMBUS","TRAPAZOID", "COORDINATE","VECTOR", "CONCENTRIC|CIRCLES", "FRACTION","DECIMAL", "LAPLACE|TRANSFORM","PARALLELOGRAM","PERPENDICULAR","PROOF","INTEGER","NEGATIVE|NUMBER","RIGHT|ANGLE","DIVIDE","INFINITE|SERIES","PERMUTATION","COMBINATION","ADD","CALCULUS","PROBABILITY","LINEAR|ALGEBRA","TRIGONOMETRY","GEOMETRY","LIMIT","VARIABLE"];
    //call start function so game is ready on page load
    
    var my_canvas=document.getElementById("canvas")
    document.getElementById("giveUp").disabled=true;
    var context=my_canvas.getContext("2d");
        context.beginPath();


    document.getElementById("wins").innerHTML="Men Saved: "+wins;
    document.getElementById("losses").innerHTML="; Men Killed: "+losses;


    function makeKeys(){
      for(var i=0;i<qwerty.length;++i){
        var button = document.createElement("button");
        var letter=qwerty[i];
        button.setAttribute("id", letter);
        button.setAttribute("class", "key");
        button.innerHTML=letter;
        button.onclick = function(){search(this.id)};
        if(i<10){ 
          document.getElementById("keyRow1").appendChild(button);
        }
        else if(i<19){
          document.getElementById("keyRow2").appendChild(button);
        }
        else
          document.getElementById("keyRow3").appendChild(button);

      }
    }

    //document.getElementById("W").onclick = function(){alert(qwerty1[1])}  
    // var button = document.createElement("button");
    // button.setAttribute("id", "&#6"+7);
    // button.innerHTML=button.getAttribute("id");
    // document.body.appendChild(button);
    

    
    
    start();
    makeKeys();
    
    
  
    //create function that starts a new game
    function start(){
        guessesLeft=9;
        my_canvas.style.left ="-300px";
        startPos(); 
        //numWrongGuesses=0;

        document.getElementById("guesses").innerHTML="Guesses So Far: ";
        document.getElementById("win-lose").style.color="black";
        document.getElementById("win-lose").innerHTML="Guess a Letter to Start";

        var leftText="; Wrong Guesses Left: "+guessesLeft;
        document.getElementById("left").innerHTML=leftText;



        //check if all the words have been used
        
        if(words.length!=0){
          //pick a random word from words
          word = words[Math.floor(Math.random() * words.length)];
          
          //remove word from words
          var index=words.indexOf(word);
          words.splice(index, 1);

          //reset the arrays that store guesses and the text that displays the word
          rightGuess=[];
          wrongGuess=[];
          haveGuessed=[];
          txt="";
          numWrongGuesses=0;
          context.clearRect(0, 0, 300, 300);
          drawStand(numWrongGuesses);
          //context.stroke(eyes);

          //enable all previously disabled buttons
          var buttons = document.getElementsByClassName("key");
          for (var i = 0; i < buttons.length; i++) {
              buttons[i].disabled =false;
          }
          
          //create underscores in the variable txt to represent letters; "|" represents a space
          for(i=0; i<word.length; ++i){
            if(word.charAt(i)!="|"){txt = txt+"__ ";
            
          }

            else{txt = txt +" &nbsp; &nbsp";}
          }
         
          //display txt (which is the underscores depicting word length)
          document.getElementById("guessArea").innerHTML=txt;
          
          }
        //if words is empty, show end game stuff
        
        else{
          alert("You have guessed at all the words");
          word="";
        }
        
        
    }

    document.onkeyup = function(event) {

        // Determines which key was pressed
          var ug = event.key;
          ug=ug.toUpperCase();
          document.getElementById(ug).click();
      }



    function giveUp(){
        document.getElementById("win-lose").style.color="red";
        document.getElementById("win-lose").innerHTML="YOU LOSE";
        losses=losses+1;
        document.getElementById("losses").innerHTML="; Men Killed: "+losses;
        document.getElementById("guessArea").innerHTML="The Word Is: "+ word;
        var i=numWrongGuesses+1;
        for(i;i<10;i++){
          drawStand(i);
        }
    }
    
    //document.getElementById("C").onclick=search("C");
    function search(x){
      //reset txt so we can rewrite it with filled in letters
      txt=" ";
      document.getElementById("giveUp").disabled=false;
        
      //disable pressed keyboard button
      document.getElementById(x).disabled = true;
      //put the pressed key into haveGuessed display guesses so far
      haveGuessed.push(x);i
      var gT= document.createTextNode(x+" ");
      document.getElementById("guesses").appendChild(gT);

      for(var i=0; i<word.length; i++){
        
        

        if(word.charAt(i)==x){
          //check to see if x was already pushed into rightGuess, if not do it now
         
          if(rightGuess.indexOf(x)==-1){
            rightGuess.push(x);
          }
          
          
        }

       
        if(rightGuess.indexOf(word.charAt(i))!=-1){
          txt=txt+word.charAt(i)+" ";
        }
        else if(word.charAt(i)=="|"){
          txt = txt +" &nbsp; &nbsp";
        }
        
        else{txt=txt+"__ "}


      }

      //display txt
      document.getElementById("guessArea").innerHTML=txt;
      
      if(word.indexOf(x)==-1){
          wrongGuess.push(x);
          guessesLeft=guessesLeft-1;
          numWrongGuesses=numWrongGuesses+1;
          
          document.getElementById("left").innerHTML="; Wrong Guesses Left: "+guessesLeft;
          

          //lose Actions
          drawStand(numWrongGuesses);
          if(guessesLeft==0){
            document.getElementById("win-lose").style.color="red";
            document.getElementById("giveUp").disabled=true;
            document.getElementById("win-lose").innerHTML="YOU LOSE";
            losses=losses+1;
            document.getElementById("losses").innerHTML="; Men Killed: "+losses;
            
            document.getElementById("guessArea").innerHTML="The Word Is: "+ word;
           
          }
      }
      //Win actions
      if(txt.indexOf("_")==-1){
        document.getElementById("giveUp").disabled=true;
        document.getElementById("win-lose").style.color="blue";
        document.getElementById("win-lose").innerHTML="YOU WON!!"
        wins=wins+1;
        document.getElementById("wins").innerHTML="Men Saved: "+wins;
        live();
      }
      
    }
  

    function drawStand(x){
      if(x==0){
              
        context.moveTo(50,280);
        context.lineTo(250,280);
        context.stroke();
      
        context.moveTo(200,280);
        context.lineTo(200,20);
        context.stroke();
        
        context.lineTo(130,20);
        context.stroke();
        
        context.lineTo(130,70);
        context.stroke();
      }
     
      if(x==1){
        //context.moveTo(150,90);
        head=context.arc(130,90,20,Math.PI*-.5,Math.PI*1.5);
        context.stroke();
      }
      if(x==2){
        
        context.moveTo(130,110);
        context.lineTo(130,190)
        context.stroke();
      }
      if(x==3){
        
        context.moveTo(130,125);
        context.lineTo(155,175)
        context.stroke();
      }
      if(x==4){
        
        context.moveTo(130,125);
        context.lineTo(105,175)
        context.stroke();
      }
      if(x==5){
        
        context.moveTo(130,190);
        context.lineTo(155,240)
        context.stroke();
      }
      if(x==6){
        
        context.moveTo(130,190);
        context.lineTo(105,240)
        context.stroke();
      }
      if(x==7){
        
        context.beginPath();
        context.arc(130,110,10,Math.PI*-.75,-.25*Math.PI)
        context.stroke();
      }

      if(x==8){
              
        context.beginPath();
        context.arc(140,93,2,0,2*Math.PI); 
        context.stroke();
        context.beginPath();
        
        context.arc(120,93,2,0,2*Math.PI); 
        context.stroke();
        
        
      }

      if(x==9){
        context.clearRect(115,90,30,10);
        context.beginPath();
        context.fillStyle = "red";
        context.font = "10px Garamond";
        context.fillText("X",137,95);
        context.font = "10px Garamond";
        context.fillText("X",123,95);
        die();

        

        
      }

    }
   
   
     function die() {
            
          var pos = 0;
          var width = document.body.clientWidth;
          var id = setInterval(frame, 10);
          function frame() {
            if (pos == 500) {
              clearInterval(id);
              start();
            } else {
              pos++; 
              
              my_canvas.style.left = pos + 'px'; 
            }
          }

        }

      function startPos() {
            
          var pos = -200;
          var id = setInterval(frame, 10);
          function frame() {
            if (pos == 0) {
              clearInterval(id);
              
            } else {
              pos++; 
              
              my_canvas.style.left = pos + 'px'; 
            }
          }

        }


      function live() {
        context.clearRect(0, 0, 300, 300);
        context.beginPath();
        context.arc(130,130,20,Math.PI*-.5,Math.PI*1.5);
        context.stroke();
      
        
        context.moveTo(130,150);
        context.lineTo(130,230)
        context.stroke();
     
        
        context.moveTo(130,165);
        context.lineTo(155,115)
        context.stroke();
      
        
        context.moveTo(130,165);
        context.lineTo(105,115)
        context.stroke();
     
        
        context.moveTo(130,230);
        context.lineTo(155,280)
        context.stroke();
    
        
        context.moveTo(130,230);
        context.lineTo(105,280)
        context.stroke();
     
        
        context.beginPath();
        context.arc(130,130,10,Math.PI*.25,.75*Math.PI)
        context.stroke();
      
              
        context.beginPath();
        context.arc(140,130,2,0,2*Math.PI); 
        context.stroke();
        context.beginPath();
        
        context.arc(120,130,2,0,2*Math.PI); 
        context.stroke();


        var pos = 0;
          var width = document.body.clientWidth;
          var id = setInterval(frame, 10);
          function frame() {
            if (pos == 500) {
              clearInterval(id);
              start();
            } else {
              pos++; 
              
              my_canvas.style.left = pos + 'px';

              context.beginPath();
              var first= Math.floor(Math.random()*255);
              var second= Math.floor(Math.random()*255);
              var third= Math.floor(Math.random()*255);
                        
              context.fillStyle = "rgb("+first+","+second+","+third+")";

              var x=Math.floor(Math.random() * 300);

              var y=Math.floor(Math.random() * 200);
              var height=Math.floor(Math.random() * 8);
              var width=Math.floor(Math.random() * 8);
              context.fillRect(x,y,height,width); 
            }
          }
        
        
      

      }

 