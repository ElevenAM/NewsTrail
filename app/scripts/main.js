var NewsTrail = {};

function appViewModel() {

  NewsTrail.activeDateRange = null;

  NewsTrail.templatePost = "";

  NewsTrail.eventCount = 30;

//Active timeline to be dynamically generated off highest important events between a certain date range
  NewsTrail.activeTimeline = [
    {
      "concept": "Terrorism",
      "eventGroup": "Army Destroys Command Center",
      "title": "Army Destroys Terrorist Command Center in Dara'a Province",
      "date": "2016-10-01T23:50:00",
      "thumbnail": "http://i.imgur.com/1Sej457.png",
      "url": "http://en.farsnews.com/newstext.aspx?nn=13950613000518",
      "description": "TEHRAN (FNA)- The Syrian Government forces drove Jeish al-Fatah terrorists out of more positions in the military academy buildings and housing project 1070 after hours of tough battle with the militants, battlefield sources said."
    },
    {
      "concept": "Middle East",
      "eventGroup": "dunno",
      "title": "Something Terrible",
      "date": "2016-10-01T23:50:00",
      "thumbnail": "http://i.imgur.com/BeYRI.jpg",
      "url": "http://i.imgur.com/BeYRI.jpg",
      "description": "Bacon ipsum lorem"
    },
    {
      "concept": "Middle East",
      "eventGroup": "dunno",
      "title": "Something Terrible",
      "date": "2016-10-01T23:50:00",
      "thumbnail": "http://i.imgur.com/BeYRI.jpg",
      "url": "http://i.imgur.com/BeYRI.jpg",
      "description": "Bacon ipsum lorem"
    }
  ];

  NewsTrail.fullTimeline = [
    {
      "concept": "Middle East",
      "eventGroup": "dunno",
      "title": "Something Terrible",
      "date": "2016-10-01T23:50:00",
      "description": "Bacon ipsum lorem",
      "thumbnail": "http://i.imgur.com/BeYRI.jpg",
      "url": "http://i.imgur.com/BeYRI.jpg",
      "relativeImportance": 23
    },
    {
      "concept": "Middle East",
      "eventGroup": "dunno",
      "title": "Something Terrible",
      "date": "2016-10-01T23:50:00",
      "description": "Bacon ipsum lorem",
      "thumbnail": "http://i.imgur.com/BeYRI.jpg",
      "url": "http://i.imgur.com/BeYRI.jpg",
      "relativeImportance": 21
    },
    {
      "concept": "Middle East",
      "eventGroup": "dunno",
      "title": "Something Terrible",
      "date": "2016-10-01T23:50:00",
      "description": "Bacon ipsum lorem",
      "thumbnail": "http://i.imgur.com/BeYRI.jpg",
      "url": "http://i.imgur.com/BeYRI.jpg",
      "relativeImportance": 19
    }
  ];

  NewsTrail.publish = function() {
    //Append active timeline to the page
    for (var i = 0; i < NewsTrail.activeTimeline.length; i++) {
      var currentItem = NewsTrail.activeTimeline[i];
      $(".hero-unit").append(currentItem.template);
    }
  };

  NewsTrail.populateTemplates = function() {
    for (var i = 0; i < NewsTrail.activeTimeline.length; i++) {
      var currentItem = NewsTrail.activeTimeline[i];
      currentItem.template = "<div id='" + i + "' class='timelinetile'><div class='col-left'>< src="+ currentItem.thumbnail + "></div><div class='col-right'><h2>" + currentItem.title + "</h2><p>" + currentItem.description + "</p><a href="+ currentItem.url +">Read more</a></div></div>";
    }
  };

  NewsTrail.lowerTimeBound = 2000;
  NewsTrail.upperTimeBound = 2016;

  NewsTrail.modifyTimeBounds = function(lower,upper) {
    //Generate new active timeline based on highest relative importance from full timeline within date range
    NewsTrail.lowerTimeBound = lower;
    NewsTrail.upperTimeBound = upper;
    NewsTrail.filterEvents();
  };

  NewsTrail.filterEvents = function(){
    //Create temp array of the X most important events. Order array by date
    var tempArray = [];
    for (var i=0;i<NewsTrail.fullTimeline;i++){
      if(NewsTrail.fullTimeline[i]<=NewsTrail.upperTimeBound && NewsTrail.fullTimeline[i] >= NewsTrail.lowerTimeBound){
        tempArray.push(NewsTrail.fullTimeline[i]);
      }
    }
    tempArray.sort(function(a, b){
      return b.relativeImportance-a.relativeImportance
    });
    //Change active timeline to the new array
    NewsTrail.activeTimeline = tempArray.slice(0,NewsTrail.eventCount);
    NewsTrail.clearTimeline();
    NewsTrail.publish();
  };

  NewsTrail.clearTimeline = function(){
    //Clear the html to make space for a new TimeLine
    $('div').remove('.timelinetile');
  };

  NewsTrail.pullNewTimeline = function() {
    //Request a new full timeline for a new concept from server
  };

  NewsTrail.init = function() {
    NewsTrail.populateTemplates();
    NewsTrail.publish();
    bingDataPull();
  }
}

function bingDataPull() {
  //Key is 11792cf9aef14f2eb0499fbbe06ce6c4
  var params = {
    // Request parameters
    "Category": "World"
  };

  $.ajax({
    url: "https://api.cognitive.microsoft.com/bing/v5.0/news/?" + $.param(params),
    beforeSend: function(xhrObj){
      // Request headers
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","11792cf9aef14f2eb0499fbbe06ce6c4");
    },
    type: "GET",
    // Request body
    data: "mkt=en-US&q=Trump&count=50",
    crossDomain: true,
    contentType:'application/json; charset=utf-8',
    dataType: 'json'
  })
    .done(function(data) {
      NewsTrail.bingResponse = data;
    })
    .fail(function() {
      console.log("Bing Response Failure")
    });
}

appViewModel();
NewsTrail.init();
