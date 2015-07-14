/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



jQuery(document).ready(function ($) {

	var Node;
	var parentsAmount = 0;
	var parentsNames = new Array();
	var testJSON = getTestJSON();

	init();

	$(window).scroll(function () {
		$("#rightSidebar").stop().animate({"marginTop": ($(window).scrollTop()) + "px", "marginLeft": ($(window).scrollLeft()) + "px"}, "slow");
	});
	$('#js--searchNode').bind('keypress', function (e) {
//TODO search by Name via API and show dropdown of answers
//loadAndAlignNodebyID
	});





	function init() {

		loadNodeByID(1); //pantidaNode


	}

	function loadNodeByID(ID) {
		var loadedNode;
		var uri = 'http://pantida.net:3000/nodes/' + ID;

		$('#js--nodeload').load(uri, function () {

			if ($('#js--nodeload').length > 1) {

				loadedNode = $.parseJSON($('#js--nodeload').html());
			} else {
				loadedNode = testJSON;
			}
			Node = loadedNode;

			$('#js--nodeMainBlockHeader').html(loadedNode.Name);
			$('#js--nodeMainBlockContent').html(loadedNode.shortDescription);


			appendEachSubNode(loadedNode);
//			alignParentNodes(300);

			alignNodeProperties_Circular();

			fillProperties();
			setDragObjects();
			bindClickHandlers();
			startPlumbing();
		});
	}

	function startPlumbing() {
		jsPlumb.bind("ready", function () {
			var connectInstance = jsPlumb.getInstance();
			var dragInstance = jsPlumb.getInstance();
//			firstInstance.setContainer($('.conten^tpanel'));
//			firstInstance.draggable('js--nodePropertyParent_Reactions');
			jsPlumb.draggable('js--node', {
				containment: $('.contentpanel')
			});
			jsPlumb.draggable($('.nodePropertyParent'), {
				containment: $('.contentpanel')
			})

			jsPlumb.connect({
				target: $('#js--nodePropertyParent_Linked'),
				source: 'js--node',
				scope: $('.contentpanel')
			});
			jsPlumb.connect({
				target: $('#js--nodePropertyParent_Description'),
				source: 'js--node',
				scope: $('.contentpanel')
			});
			jsPlumb.connect({
				target: $('#js--nodePropertyParent_Forum'),
				source: 'js--node',
				scope: $('.contentpanel')
			});
			jsPlumb.connect({
				target: $('#js--nodePropertyParent_Importance'),
				source: 'js--node',
				scope: $('.contentpanel')
			});
			jsPlumb.connect({
				target: $('#js--nodePropertyParent_Reactions'),
				source: 'js--node',
				scope: $('.contentpanel')
			});

//			firstInstance.connect({
//				source: "js--node",
//				target: "js--nodeload",
//				scope: $('.contentpanel')
//			});
			connectInstance.repaintEverything();
		});
	}

	function fillProperties() {
		createLoremIpsumContent();
		createReactionsContentHTML();

	}

	function bindClickHandlers() {


		$('.nodePropertyParent img').click(function () {
			$(this).siblings('.nodePropertyParentContent').toggle(600, function () {
				if ($(this).siblings('img').attr('src') == 'images/plus@2x.png') {
					$(this).siblings('img').prop('src', 'images/minus@2x.png');
				} else {
					$(this).siblings('img').prop('src', 'images/plus@2x.png');
				}
			});

		})


	}


	function setDragObjects() {
//		var test = new dragObject("js--nodePropertyParent_Reactions", 'contentpanel');
	}

	function createReactionsContentHTML() {


		var steps = '<div id=""nodePropertyParent_Reactions_Content_Steps> <h3>Steps</h3> </div>';
		var progress = '<div id=""nodePropertyParent_Reactions_Content_Progress> <h3>Progress</h3> </div>';
		var missing = '<div id=""nodePropertyParent_Reactions_Content_Missing> <h3>Missing</h3> </div>';
		var done = '<div id=""nodePropertyParent_Reactions_Content_Done> <h3>Done</h3> </div>';

		var html = steps + progress + missing + done;

		$('#nodePropertyParent_Reactions_Content').html(html);

	}

	function createLoremIpsumContent() {
		for (var i = 0; i < parentsAmount; i++) {

			$('#nodePropertyParent_' + parentsNames[i] + '_Content').html('<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.  </p><p></p><p>yo frieedl was ged ab</p>');
		}
	}

	function alignParentNodes(radius) {
		var center = $('#js--node').position();
		var p = $('#js--nodePropertyParents').children().length;
		if (!radius) {
			var radius = 200;
		}
		for (cnt = 0; cnt < $('.nodePropertyParent').length; cnt++) {
			$($('.nodePropertyParent')[cnt]).css("transform", "rotate(" + 360 / p * cnt + "deg) translate(" + radius + "px) rotate(-" + 360 / p * cnt + "deg)");
		}

	}

	function alignNodeProperties_Circular() {
		var contentHeight = document.getElementById('contentpanel').offsetHeight;
		var contentWidth = document.getElementById('contentpanel').offsetWidth;

		var radius = contentHeight / 2.3;
		var centerX = parseInt($('#js--node').css('left'));
		var centerY = parseInt($('#js--node').css('top'));


		var coo = getCircleCoordinates(parentsAmount, radius, centerX, centerY); //TODO

		for (var i = 0; i < parentsAmount; i++) {
			$('#js--nodePropertyParent_' + parentsNames[i]).css('top', coo[1][i] + 'px');
			$('#js--nodePropertyParent_' + parentsNames[i]).css('left', coo[0][i] + 'px');
		}

	}

	function parsePercentage(a, b) {



	}

	function getCircleCoordinates(steps, radius, centerX, centerY) {
//		var Coo = new Array(xValues = new Array(), yValues = new Array());
		var xValues = new Array();
		var yValues = new Array();


		for (var i = 0; i < steps; i++) {
			xValues[i] = (centerX + radius * Math.cos(2 * Math.PI * i / steps));

			yValues[i] = (centerY + radius * Math.sin(2 * Math.PI * i / steps));
//			$('js--nodePropertyParent_' + parentsNames[i]).offset({top: xValues[i], left: yValues[i]});
		}


		return new Array(xValues, yValues);
	}



	function appendEachSubNode(obj)
	{
		for (var k in obj)
		{
			var cnt;
			if (typeof obj[k] == "object" && obj[k] !== null) {
				cnt++;
				$('#js--nodePropertyParents').append('<div id="js--nodePropertyParent_' + k + '" class="nodePropertyParent"> <div class="nodePropertyParentHeader" id="nodePropertyParent_' + k + '_Header">' + k + '</div> <div class="nodePropertyParentContent" id="nodePropertyParent_' + k + '_Content"></div> <img src="images/plus@2x.png" /></div>');
				parentsAmount = parentsAmount + 1;
				parentsNames.push(k);
//				eachRecursive(obj[k], parent);

			}
		}
	}

	function loadForumPreviewByNodeID(ID) {

	}

	function getTestJSON() {
		return {
			'Name': 'Pantida',
			'shortDescription': 'Most very awesom soon',
			'type': 'theThing',
			'Description': {
				'text': 'Our Goal aösldkfasöldfhasökldnf ösdnfl',
				'audio': 'lalala',
				'video': 'asdf'
			},
			'Forum': {
				'show': true,
				'NodeForumID': 1234
			},
			'Reactions': {
				'started': true,
				'Steps': {
					"1": {
						'Name': 'Have Idea',
						'Status': 'Done',
						'Finished': 'Timestamp'
					},
					"2": {
						'Name': 'Unite the brothers',
						'Status': 'Done',
						'Finished': 'Timestamp'
					}},
				'Progress': {
					"1": {
						'Name': 'Have Idea',
						'Status': 'Done',
						'Finished': 'Timestamp'
					},
					"2": {
						'Name': 'Unite the brothers',
						'Status': 'Done',
						'Finished': 'Timestamp'
					}},
				'Missing': {
					"1": {
						'Name': 'Have Idea',
						'Status': 'Done',
						'Finished': 'Timestamp'
					},
					"2": {
						'Name': 'Unite the brothers',
						'Status': 'Done',
						'Finished': 'Timestamp'
					}},
				'Done': {
					"1": {
						'Name': 'Have Idea',
						'Status': 'Done',
						'Finished': 'Timestamp'
					},
					"2": {
						'Name': 'Unite the brothers',
						'Status': 'Done',
						'Finished': 'Timestamp'
					}
				}
			},
			'Importance': {
				'Manual': 'Most very uber much',
				'Rated': 'highest'},
			'Linked': {
				"1": 'all'
			}
		};
	}

});