/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


jQuery(document).ready(function ($) {


	$('#js--createNode').on('click', function (e) {
		e.preventDefault();


		var data = {'type': $('#createnode_type').val(), 'name': $('#createnode_name').val(), 'shortdescrp': $('#createnode_shortdescrp').val()};
		console.log(data);
		console.log(JSON.stringify(data));
		$.ajax({
			type: "POST",
			url: "http://pantida.net:3000/nodes",
			data: JSON.stringify(data), // now data come in this function
			contentType: "application/json; charset=utf-8",
//			crossDomain: true,
			dataType: "json",
			success: function (data, status, jqXHR) {

				alert("success");// write success in " "
			},
			error: function (jqXHR, status) {
				// error handler
				console.log(jqXHR);
				alert('fail' + status.code);
			}
		});

	});


//
//	var form = document.createElement("form");
//	form.setAttribute('method', "post");
//	form.setAttribute('action', "http://www.pantida.net:3000/nodes");
//
//
//
////create a checkbox
////	var typeIssue = createRadioElement("type", false);
////	typeIssue.value = 'issue';
////	typeIssue.label = "Issue";
////	var typeIssueLabel = document.createElement("span");
////	typeIssueLabel.innerHTML = 'Issue';
////
////
////	var typeInfo = createRadioElement("type", true);
////	typeInfo.value = 'info';
////	typeInfo.lable = "Information";
////	var typeInfoLabel = document.createElement("span");
////	typeInfoLabel.innerHTML = 'Information';
//
//
//	var typeSelect = document.createElement('select');
//	typeSelect.name = 'typeSelect';
//	typeSelect.innerHTML = '<option value="Issue">Issue</option><option value="Info">Information</option><option value"User">User</option>';
//	typeSelect.className = 'chosen-container chosen-container-single';
//
//
////create input element
//	var name = document.createElement("input");
//	name.type = "text";
//	name.name = "name";
//	name.id = "createnode_name";
//	name.placeholder = "Name";
//
//	//create input element
//	var shortDescr = document.createElement("input");
//	shortDescr.type = "text";
//	shortDescr.name = "shortDescrp";
//	shortDescr.id = "createnode_shortdescrp";
//	shortDescr.placeholder = "Description";
//
////create a button
//	var submit = document.createElement("input");
//	submit.type = "submit";
//	submit.value = "Submit";
//
//// add all elements to the form
////	form.appendChild(typeIssue);
////	form.appendChild(typeIssueLabel);
////	form.appendChild(typeInfo);
////	form.appendChild(typeInfoLabel);
//
//	form.appendChild(typeSelect);
//
//	form.appendChild(name);
//	form.appendChild(shortDescr);
////	form.appendChild(type);
//	form.appendChild(submit);
//
//
//// add the form inside the body
//	$("#js--createNode").append(form);   //using jQuery or


	function createRadioElement(name, checked) {
		var radioHtml = '<input type="radio" name="' + name + '"';
		if (checked) {
			radioHtml += ' checked="checked"';
		}
		radioHtml += '/>';

		var radioFragment = document.createElement('div');
		radioFragment.innerHTML = radioHtml;

		return radioFragment.firstChild;
	}

});