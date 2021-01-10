'use strict';

// TODO: Move this into something loaded from the cloud
var whitelist = {
	"channels": [
		//{ "name": "J44xm", "id": "UCX316WrjkKSJPHN5D9INeoQ" }
	],
	"videos": [
		{ "id": "pfAvN6rXdkM" }
	]
};

var SECONDS_TO_WAIT_UNTIL_FILTER = 5;
/*
var SECONDS_TO_WAIT_UNTIL_FILTER_AFTER_LOAD = 3;
var CLASSNAME_OF_CONTAINER = "section__items";

var items_to_hide = [
		1990542257627879, // Drops Rhythm Garden
		1766581036755768, // Mars is a real place
		2108572332534065,
		1257633284291446
	];

function find_ancestor_with_className(elem, className)
{
	var ancestor = elem.parentElement;
	while( ancestor && ancestor.className != className )
	{
		ancestor = ancestor.parentElement;
	}
	
	return ancestor;
}

function hide_purchased()
{
	var purchased_bylines = document.getElementsByClassName("store-section-item-byline__purchased");
	var cells_to_remove = [];
	for( var i in purchased_bylines )
	{
		var sub_element = purchased_bylines[i];
		var cell = find_ancestor_with_className( sub_element, "section__items-cell" );
		if( !cell )
		{
			continue;
		}
		cells_to_remove.push( cell );
	}
	cells_to_remove.forEach(cell => {
		console.log("Purchased. Removing: ");
		console.log(cell);
		cell.parentElement.removeChild( cell );
	});
}

function get_section_oculus_id( section )
{
	if( !section )
	{
		return undefined;
	}
	var a_s = section.getElementsByTagName("a");
	if( !a_s || !a_s[0] )
	{
		return undefined;
	}
	var a_id = a_s[0].getAttribute("data-testid");
	return a_id;
}

function hide_items_from_list( list_of_oculus_store_ids )
{
	var sections = document.getElementsByClassName("store-section-item");
	for( var i=0; i < sections.length; ++i )
	{
		var section = sections[i];
		var oculus_id = parseInt( get_section_oculus_id( section ) );
		if( list_of_oculus_store_ids.indexOf( oculus_id ) != -1 )
		{
			var cell = find_ancestor_with_className( section, "section__items-cell" );
			if( !cell )
			{
				continue;
			}
			cell.parentElement.removeChild( cell );
		}
	}
}

function apply_filters()
{
	hide_purchased();
	
	hide_items_from_list( items_to_hide );
}

var observer = null;
var delayedApplyHandle = null;

function postpone_filtering_of_items()
{
	if( delayedApplyHandle )
	{
		clearTimeout(delayedApplyHandle);
	}
	
	delayedApplyHandle = setTimeout( function() {
		console.log("Applying filters...");
		apply_filters();
		delayedApplyHandle = null;
	}, SECONDS_TO_WAIT_UNTIL_FILTER_AFTER_LOAD * 1000);
}

function init_mutation_observer()
{
	var dom_container = (function(){
		var containers = document.getElementsByClassName(CLASSNAME_OF_CONTAINER);
		return ( containers.length > 0 ) ?  containers[0] : null;
	})();

	if( dom_container == null )
	{
		return false;
	}

	const mutationConfig = { attributes: false, childList: true, subtree: false, characterData: false,
		characterDataOldValue: false};

	var onMutate = function(mutationsList) {
		mutationsList.forEach(mutation => {
			if( mutation.type != "childList" )
			{
				return;
			}
			mutation.addedNodes.forEach(newNode => {
				postpone_filtering_of_items();
			});
		});
	};
	
	var observer = new MutationObserver(onMutate);
	observer.observe(dom_container, mutationConfig);	
}

*/

function getChannelId() {
	var path = $(".ytd-channel-name a")[0].getAttribute("href");
	return path.substr("/channel/".length);
}

function isChannelInWhitelist() {
	var channelId = getChannelId();
	var match = whitelist.channels.filter(channel => channel.id == channelId);
	return (match != undefined) && (match.length > 0);
}

function getVideoId() {
	return document.URL.substr("https://www.youtube.com/watch?v=".length);
}

function isVideoInWhitelist() {
	var videoId = getVideoId();
	var match = whitelist.videos.filter(video => video.id == videoId);
	return (match != undefined) && (match.length > 0);
}

function isAllowedOtherPage() {
	var url = document.URL;
	return (url == "https://www.youtube.com/");
}

function isVideoPage() {
	return document.URL.startsWith("https://www.youtube.com/watch?v=");
}

function onChannelNameAvailable() {
	var matched = false;
	if (isAllowedOtherPage()) {
		console.log("OOOOOOOOOOOOOOOOO other allowed page")
		matched = true;
	}
	else if (isVideoPage()) {
		if (isVideoInWhitelist()) {
			console.log("VVVVVVVVVVVVVVVVV Found Video in whitelist");
			matched = true;
		}
		else if (isChannelInWhitelist()) {
			console.log("CCCCCCCCCCCCCCCCC Found Channel in whitelist");
			matched = true;
		}
	}

	if (!matched) {
		console.log("XXXXXXXXXXXXXXXXX This page will be blocked.")
		document.body.innerHTML = "<p>Sorry, this page is blocked</p>";
	}
}

function waitUntilReadChannelId(callback) {
	setTimeout(function () {
		try {
			if (getChannelId()) { callback(); }
		}
		catch {
			waitUntilReadChannelId(callback);
		}
	}, SECONDS_TO_WAIT_UNTIL_FILTER * 1000);
}

function onload() {
	console.log("Filter Youtube: loaded.");

	setTimeout(function () { waitUntilReadChannelId(onChannelNameAvailable); }, SECONDS_TO_WAIT_UNTIL_FILTER * 1000);
}

jQuery(document).ready(function () {
	onload();
});

