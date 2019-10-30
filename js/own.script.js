$(window).scroll(function() {
	if ($(document).scrollTop() > 150) {
		$('.navbar').addClass('navbar-shrink');
	} else {
		$('.navbar').removeClass('navbar-shrink');
	}
});

$(function() {
	$('a[href*=#]:not([href=#])').click(
			function() {
				if (location.pathname.replace(/^\//, '') == this.pathname
						.replace(/^\//, '')
						&& location.hostname == this.hostname) {
					var target = $(this.hash);
					target = target.length ? target : $('[name='
							+ this.hash.slice(1) + ']');
					if (target.length) {
						$('html,body').animate({
							scrollTop : target.offset().top
						}, 1500);
						return false;
					}
				}
			});
});
//GET REPOS
var repoNames = [];
var downloads=0;
$(function() {
	getRepositories().done(  getDownloads().done(getAdditionalDownloads().done(saveDownloads())) );
});


function getRepositories(){
	var r = $.Deferred();
$.ajax({
  url: "https://api.github.com/users/xlpmg/repos",
	async: false,
  jsonp: true,
  method: "GET",
  dataType: "json",
  success: function(res) {
		$("#project-number").attr("data-n", res.length);
		$.each(res, function(idx, obj) {
		repoNames.push(obj.full_name);
		});
  }
});
 return r;
}

//GET DOWNLOADS
function getDownloads(){
		var r = $.Deferred();
$.each(repoNames, function( index, value) {
getRelease("https://api.github.com/repos/"+value+"/releases");
});
 return r;
}

function getRelease(url){
	$.ajax({
	url: url,
	async: false,
  jsonp: true,
  method: "GET",
  dataType: "json",
  success: function(res) {
		for(i=0; i<=res.length; i++){
		if(res[i] != null){
		downloads +=parseInt(res[i].assets[0].download_count, 10);
	}
  }
}
});
}

function getAdditionalDownloads(){
	var r = $.Deferred();
	$.ajax({
	url: "https://staticstats.nexusmods.com/mod_monthly_stats/1303/3672.json",
	jsonp: true,
	async: false,
	method: "GET",
	dataType: "json",
	success: function(res) {
		downloads +=parseInt(res.total_downloads, 10);
}
});
$.ajax({
url: "https://staticstats.nexusmods.com/mod_monthly_stats/1303/4203.json",
jsonp: true,
async: false,
method: "GET",
dataType: "json",
success: function(res) {
	downloads +=parseInt(res.total_downloads, 10);
}
});
return r;
}
function saveDownloads(){
$("#downloads-total").attr("data-n", downloads);
}
//HEADER
// Get the video
var videoSource = new Array();
videoSource[0]='videos/IntroStreet.mp4';
videoSource[1]='videos/IntroGirlWaterfall.mp4';
videoSource[2]='videos/IntroGirlUmbrella.mp4';
var videoCount = videoSource.length;
var videoNumber = 0;
var i = 0;

// Get the button
var btn = document.getElementById("videoBtnID");

// Pause and play the video
function changeVideoState() {
  if (document.getElementById("header_video").paused) {
		document.getElementById("header_video").setAttribute("src",videoSource[videoNumber]);
    document.getElementById("header_video").play();
document.getElementById('intro-heading').style.visibility = 'hidden';
document.getElementById('button_about').style.visibility = 'hidden';
    //btn.innerHTML = "Pause";
  } else {
    document.getElementById("header_video").pause();
		document.getElementById("header_video").load()
document.getElementById('intro-heading').style.visibility = 'visible';
document.getElementById('button_about').style.visibility = 'visible';
    //btn.innerHTML = "Play";
  }
}

document.getElementById('header_video').addEventListener('ended',myHandler,false);
function myHandler() {
i++;
if(i == (videoCount)){
i = 0;
videoNumber = i;
}
else{
videoNumber = i;
}
document.getElementById("header_video").pause();
changeVideoState();
       }
//Change icon
jQuery(function($) {
  $('#videoBtnID').on('click', function() {
    var $el = $(this),
      textNode = this.lastChild;
    $el.find('i').toggleClass('fas fa-play fas fa-stop');
    $el.toggleClass('videoBtn');
  });
});

// Owl carousel
$('.owl-partners').owlCarousel({
	loop : true,
	margin : 10,
	nav : false,
	autoplay : true,
	autoplayTimeout : 3000,
	autoplayHoverPause : true,
	responsive : {
		0 : {
			items : 1
		},
		600 : {
			items : 3
		},
		1000 : {
			items : 5
		}
	}
})

// Owl carousel
$('.owl-portfolio').owlCarousel(
		{
			loop : true,
			margin : 10,
			nav : true,
			navText : [ "<i class='fa fa-angle-left'></i>",
					"<i class='fa fa-angle-right'></i>" ],
			dots : false,
			autoplay : true,
			autoplayTimeout : 5000,
			autoplayHoverPause : true,
			responsive : {
				0 : {
					items : 1
				},
				600 : {
					items : 1
				},
				1000 : {
					items : 1
				}
			}
		})

// hide #back-top first
$("#back-top").hide();

// fade in #back-top

$(window).scroll(function() {
	if ($(this).scrollTop() > 100) {
		$('#back-top').fadeIn();
	} else {
		$('#back-top').fadeOut();
	}
});

// scroll body to 0px on click
$('#back-top a').on("click", function() {
	$('body,html').animate({
		scrollTop : 0
	}, 800);
	return false;
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
	$('.navbar-toggle:visible').click();
});

$(function() {

	// get year function by LPMG
	// i know i shouldve made a separate function :p
	var today = new Date();
	var year = today.getFullYear()
	var yearStarted = 2013;
	var yearsPassed = year - yearStarted;

	$('.stats-bar').appear();
	$('.stats-bar')
			.on(
					'appear',
					function() {
						var fx = function fx() {
							$(".stat-number")
									.each(
											function(i, el) {
												var data = parseInt(
														this.dataset.n, 10);
												// commands
												if (data == 999) {
													data = yearsPassed;
												}
												var props = {
													"from" : {
														"count" : 0
													},
													"to" : {
														"count" : data
													}
												};
												$(props.from)
														.animate(
																props.to,
																{
																	duration : 1000 * 1,
																	step : function(
																			now,
																			fx) {
																		$(el)
																				.text(
																						Math
																								.ceil(now));
																	},
																	complete : function() {
																		if (el.dataset.sym !== undefined) {
																			el.textContent = el.textContent
																					.concat(el.dataset.sym)
																		}
																	}
																});
											});
						};

						var reset = function reset() {
							console.log($(this).scrollTop())
							if ($(this).scrollTop() > 90) {
								$(this).off("scroll");
								fx()
							}
						};

						$(window).on("scroll", reset);
					});
});
