import $ from 'jquery';
import './textareaTabSupport.js'
import {Colorize} from './tokenize';
$("#in").val(window.localStorage.getItem("code"));
updateScreen($("#in").val());
$("#in").on("keydown", function(e) {
  const moveLine = (direction) =>
  {
    e.preventDefault();
    // get current line of the cursor
    var cursor = $(this).get(0).selectionStart
    var line = $(this).val().substring(0, cursor).split("\n").length;
    var lines = $(this).val().split("\n");
    // swap the current and the next line
    if(direction == "down")
    {
      var temp = lines[line-1];
      lines[line-1] = lines[line];
      lines[line] = temp;
    }
    else if(direction == "up")
    {
      var temp = lines[line-2];
      lines[line-2] = lines[line-1];
      lines[line-1] = temp;
    }

    $(this).val(lines.join("\n"));

    const newCursor = lines
    .filter((item, index) => index <= (direction=="up"?line-2:line))
    .join("\n").length;
    console.log(newCursor);
    $(this).get(0).selectionStart = newCursor
    $(this).get(0).selectionEnd = newCursor
  }
  if (e.altKey && e.keyCode == 40) moveLine("down")
  else if (e.altKey && e.keyCode == 38) moveLine("up")  
  setTimeout(() =>{
    window.localStorage.setItem("code",$(this).val())
    updateScreen($(this).val());
  },0)
})

function updateScreen(text)
{
  $("#out").html(Colorize(text).replace(/\n/g, "<br>").replace(/\t/g,"&#9;"));
}
$("#in").on('scroll', function(){
  $("#out").css({top:-$(this).scrollTop()+"px"});   
});