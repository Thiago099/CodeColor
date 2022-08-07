import $ from 'jquery';
import './textareaTabSupport.js'
import {Colorize} from './tokenize';
$("#in").val(window.localStorage.getItem("code"));
updateScreen($("#in").val());
$("#in").on("keydown", function(e) {
  setTimeout(() =>{
    window.localStorage.setItem("code",$(this).val())
    updateScreen($(this).val());
  },0)
})
function updateScreen(text)
{
  $("#out").html(Colorize(text).replace(/\n/g, "<br>").replace(/\t/g,"&#9;"));
}