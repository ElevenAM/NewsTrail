var NewsTrail = {};

function appViewModel() {

  NewsTrail.activeDateRange = null;

  NewsTrail.templatePost = "";

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
      var template = "<div id='" + i + "' class='timelinetile'><div class='col-left'><img src="+ currentItem.thumbnail + "></img></div><div class='col-right'><h2>" + currentItem.title + "</h2><p>" + currentItem.description + "</p><a href="+ currentItem.url +">Read more</a></div></div>"
      currentItem.template = template;
    }
  };

  NewsTrail.modifyTimeScope = function() {
    //Generate new active timeline based on highest relative importance from full timeline within date range
  };

  NewsTrail.pullNewTimeline = function() {
    //Request a new full timeline for a new concept from server
  };

  NewsTrail.init = function() {
    NewsTrail.populateTemplates();
    NewsTrail.publish();
  }
}

appViewModel();
NewsTrail.init();
