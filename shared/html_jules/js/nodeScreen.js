/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


jQuery(document).ready(function () {

    $(window).scroll(function () {
        $("#rightSidebar").stop().animate({"marginTop": ($(window).scrollTop()) + "px", "marginLeft": ($(window).scrollLeft()) + "px"}, "slow");
    });


});